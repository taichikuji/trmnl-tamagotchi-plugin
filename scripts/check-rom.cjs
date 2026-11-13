const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { fixture, render, devices, layouts, moods } = require('./preview.cjs');
const context = vm.createContext({ Date, Intl });
vm.runInContext(fs.readFileSync(path.join(__dirname, '../TRMNL/src/transform.js'), 'utf8'), context);
const art = vm.runInContext('ROM_SPRITES', context);
const clean = value => JSON.parse(JSON.stringify(value));

test('every ROM sequence preserves its prefix, holds and loop across repeated cycles', () => {
  for (const family of ['p1', 'p2']) {
    assert.equal(art[family].characters.length, 12);
    for (const [character, data] of art[family].characters.entries()) {
      assert.equal(data.animations.length, 11);
      for (const [action, sequence] of data.animations.entries()) {
        const [prefix, loop] = sequence.map(runs => runs.flatMap(([pose, hold]) => {
          assert.ok(Number.isInteger(hold) && hold > 0);
          assert.equal(typeof data.poses[pose], 'string');
          return Array(hold).fill(pose);
        }));
        assert.ok(loop.length);
        const expected = [...prefix, ...loop, ...loop];
        for (const [tick, frame] of expected.entries()) {
          assert.deepEqual(clean(context.romFrame(family, character, action, tick)),
            { frame, path: data.poses[frame] });
        }
      }
    }
  }
});

test('ROM preview keeps death artwork and supports saves without a family', () => {
  for (const character of ['dead', 'p2-dead']) {
    const expected = render({ character }).pet.sprite;
    for (const mood of ['rom-pose', 'rom-1', 'rom-10']) {
      assert.deepEqual(render({ character, mood }).pet.sprite, expected);
    }
  }
  const legacy = fixture('mametchi');
  delete legacy.family;
  for (const mood of ['rom-pose', 'rom-1']) {
    assert.deepEqual(render({ mood }, legacy).pet,
      render({ mood }, { ...legacy, family: 'p1' }).pet);
  }
});

test('P2 evolution uses the original slots and never produces TRMY', () => {
  for (const family of ['p1', 'p2']) for (let seed = 0; seed < 32; seed++) {
    for (let chart = 0; chart < 7; chart++) for (let care = 0; care < 16; care++) {
      for (let discipline = 0; discipline < 16; discipline++) {
        const state = fixture('mametchi', 'awake', seed);
        Object.assign(state, { family, chart, care, missed_discipline: discipline });
        const expected = context.chooseEvolution(chart, care, discipline, seed);
        context.evolve(state);
        assert.equal(state.chart, expected.chart);
        assert.equal(state.character, family === 'p2' && expected.character === 12 ? 5 : expected.character);
        context.validateState(state);
      }
    }
  }
});

test('family selection is deterministic, balanced and independent of the care stream', () => {
  let p2 = 0;
  for (let seed = 0; seed < 4096; seed++) {
    const state = context.newLife(seed, 0, 'UTC');
    assert.equal(state.family, context.newLife(seed, 0, 'UTC').family);
    const rng = { rng: seed };
    assert.equal(state.profile, Math.floor(context.random(rng) * 3));
    assert.equal(state.rng, rng.rng);
    p2 += state.family === 'p2';
  }
  assert.ok(p2 > 1945 && p2 < 2151, String(p2));
});

test('legacy saves retain P1 until rebirth; invalid families are rejected', () => {
  const legacy = fixture('mametchi');
  delete legacy.family;
  const resumed = context.advance(legacy, legacy.cursor + 15);
  assert.equal(resumed.family, undefined);
  assert.equal(context.displayPet(resumed, resumed.cursor).character, 'mametchi');
  context.die(resumed, 'Reached the end of this life');
  const reborn = context.advance(resumed, resumed.cursor + 60);
  assert.equal(reborn.generation, legacy.generation + 1);
  assert.ok(['p1', 'p2'].includes(reborn.family));
  assert.equal(reborn.character, 0);
  for (const family of [null, '', 'p3', {}, []]) {
    assert.throws(() => context.advance({ ...legacy, family }, legacy.cursor), /Invalid pet family/);
  }
  assert.throws(() => context.advance({ ...legacy, family: 'p2', character: 12 }, legacy.cursor), /Invalid pet family/);
});

test('P1 and P2 save/resume produce the same life history as uninterrupted catch-up', () => {
  for (const family of ['p1', 'p2']) for (const seed of [0, 42]) {
    const initial = clean(context.newLife(seed, 30000000, 'Europe/Madrid'));
    initial.family = family;
    const end = initial.cursor + 30 * 1440;
    let resumed = initial;
    while (resumed.cursor < end) {
      const before = resumed;
      resumed = clean(context.advance(before, Math.min(end, before.cursor + 1440)));
      if (resumed.generation === before.generation) assert.equal(resumed.family, before.family);
      assert.ok(Buffer.byteLength(JSON.stringify(resumed)) < 8192);
    }
    assert.deepEqual(resumed, clean(context.advance(initial, end)));
  }
});

test('all characters and care states render in every device and layout without changing saved state', () => {
  const characters = [...vm.runInContext('P1_NAMES', context), ...vm.runInContext('P2_NAMES.slice(1)', context), 'p2-egg', 'dead', 'p2-dead'];
  for (const character of characters) for (const mood of Object.keys(moods)) {
    const state = fixture(character, mood);
    const before = JSON.stringify(state);
    for (const device of Object.keys(devices)) for (const layout of layouts) {
      const result = render({ character, mood, device, layout, frame: 511 }, state);
      assert.equal(typeof result.pet.sprite.path, 'string');
      assert.ok(!result.html.includes('undefined'));
      assert.ok(!result.html.includes('NaN'));
      assert.equal(JSON.stringify(state), before);
    }
  }
});
