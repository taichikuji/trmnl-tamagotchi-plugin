const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { performance } = require('node:perf_hooks');
const root = path.join(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'TRMNL/src/transform.js'), 'utf8');
let requests = 0;
const ctx = vm.createContext({ Intl, Date, fetch() { requests++; throw Error('No network allowed'); } });
vm.runInContext(source, ctx);
const get = code => vm.runInContext(code, ctx);
const clean = v => JSON.parse(JSON.stringify(v));
const stats = clean(get('P1_STATS'));
const start = Math.floor(Date.parse('2026-10-18T10:00:00Z') / 60000);
const fresh = (seed = 42, time = start, zone = 'Europe/Madrid') => clean(ctx.newLife(seed, time, zone));
function hatched(character = 2) {
  const s = fresh(); s.character = 1; ctx.evolve(s);
  if (character >= 3) { s.chart = character === 3 ? 2 : 4; s.character = character; }
  if (character >= 5) { s.character = character; s.chart = character === 7 ? 6 : 15; }
  s.character = character; if (character === 1) s.chart = 0;
  const d = stats[character];
  s.timers.growth = d[5]; s.timers.illness = d[4]; s.timers.discipline = d[6];
  s.hunger_rate = d[2]; s.happy_rate = d[3]; s.hunger = 15; s.happiness = 15;
  s.timers.hunger = d[2]; s.timers.happy = d[3]; s.discipline = d[7];
  s.recent = []; return s;
}

test('character timers and all seven growth tables match independently extracted assembly facts', () => {
  const reference = require('./fixtures/p1-reference.json');
  for (const [name, data] of Object.entries(reference.stats)) {
    const index = clean(get('P1_NAMES')).indexOf(name);
    assert.deepEqual(stats[index], ['wake','sleep','hungry','happy','sickness','evolution','discipline_calls','discipline','medicine'].map(k => data[k]), name);
  }
  assert.deepEqual(clean(get('P1_CHARTS')), reference.charts);
});
test('every growth branch and boundary, including teen subtypes and Bill', () => {
  const cases = [
    [0,0,0,1,2], [1,2,2,2,3], [1,2,3,3,3], [1,3,2,4,4], [1,3,3,5,4],
    [2,2,0,15,5], [2,2,1,15,6], [2,2,2,15,7], [2,3,0,15,8], [2,3,2,15,9], [2,3,4,15,10],
    [3,3,1,15,6], [3,3,2,6,7], [3,4,7,15,9], [3,4,8,15,10],
    [4,0,1,15,8], [4,15,2,15,9], [4,0,3,15,10],
    [5,0,5,15,9], [5,15,6,15,10], [6,15,15,15,11]
  ];
  for (const [chart,c,d,next,character] of cases) assert.deepEqual(clean(ctx.chooseEvolution(chart,c,d)),{chart:next,character});
  const s = hatched(); s.care = 2; s.missed_discipline = 1;
  ctx.evolve(s); assert.equal(s.character,3); assert.equal(s.discipline,8);
  assert.equal(s.care,2); assert.equal(s.missed_discipline,1);
  ctx.evolve(s); assert.equal(s.character,6); // cumulative mistakes, not reset at adolescence
  const mask = hatched(7); ctx.evolve(mask); assert.equal(mask.character,11); assert.equal(mask.chart,15);
});
test('egg hatches at five minutes and baby growth pauses during five-minute nap', () => {
  const s = fresh();
  assert.equal(ctx.advance(s,start+4).character,0);
  assert.equal(ctx.advance(s,start+5).character,1);
  assert.equal(ctx.advance(s,start+44).sleeping,false);
  assert.equal(ctx.advance(s,start+45).sleeping,true);
  assert.equal(ctx.advance(s,start+49).sleeping,true);
  assert.equal(ctx.advance(s,start+50).sleeping,false);
  assert.equal(ctx.advance(s,start+69).character,1);
  const grown = ctx.advance(s,start+70); assert.equal(grown.character,2);
  assert.equal(grown.sick_count,0); assert.equal(grown.care,0);
});
test('sleep pauses countdowns; midnight remains asleep; wake does not decrement timers', () => {
  const s = hatched(); s.timezone = 'UTC'; s.cursor = Math.floor(Date.parse('2026-10-18T19:59Z')/60000); s.born = s.cursor-100;
  const bed = ctx.advance(s,s.cursor+1); assert.equal(bed.sleeping,true);
  const midnight = ctx.advance(bed,bed.cursor+241);
  assert.equal(midnight.sleeping,true); assert.equal(midnight.timers.growth,bed.timers.growth);
  const wake = ctx.advance(bed,bed.cursor+13*60);
  assert.equal(wake.sleeping,false); assert.equal(wake.timers.growth,bed.timers.growth);
  assert.equal(wake.age,bed.age+1);
});
test('sleep uses IANA timezone across European DST and non-hour offsets', () => {
  const clock = ctx.localClock('Europe/Madrid');
  const minute = iso => Date.parse(iso)/60000;
  assert.equal(clock(minute('2026-10-25T00:59Z')),179);
  assert.equal(clock(minute('2026-10-25T01:00Z')),120);
  assert.equal(clock(minute('2026-03-29T00:59Z')),119);
  assert.equal(clock(minute('2026-03-29T01:00Z')),180);
  assert.equal(ctx.localClock('Asia/Kathmandu')(minute('2026-10-18T00:00Z')),345);
  const halfHourDST = ctx.localClock('Australia/Lord_Howe');
  assert.equal(halfHourDST(minute('2026-04-04T14:59Z')),119);
  assert.equal(halfHourDST(minute('2026-04-04T15:00Z')),90);
  assert.equal(halfHourDST(minute('2026-10-03T15:29Z')),119);
  assert.equal(halfHourDST(minute('2026-10-03T15:30Z')),150);
});
test('late lights count once, discipline expires after 14 awake minutes, baby care is protected', () => {
  const s = hatched(); s.sleeping=true; s.lights=true; s.due={}; s.timers.lights=63;
  ctx.minuteTick(s,60); assert.equal(s.care,1);
  ctx.minuteTick(s,61); assert.equal(s.care,1);
  const d=hatched(); d.timers.scold=1; d.due={};
  for(let i=0;i<13;i++) ctx.minuteTick(d,720);
  assert.equal(d.missed_discipline,0); ctx.minuteTick(d,720); assert.equal(d.missed_discipline,1);
  for(let seed=0;seed<30;seed++) {
    const baby=ctx.advance(fresh(seed),start+70);
    assert.equal(baby.character,2); assert.equal(baby.dead_at,null); assert.equal(baby.care,0);
  }
});
test('illness advances growth, cures use character doses, third episode ends life', () => {
  for(let character=1;character<=11;character++) {
    const s=hatched(character); s.sick=true; s.sick_count=1; s.timers.illness=0; s.timers.growth=100;
    s.due.medicine=s.cursor+1;
    const next=ctx.advance(s,s.cursor+1);
    assert.equal(next.sick,false); assert.equal(next.timers.illness,stats[character][4]); assert.equal(next.timers.growth,99);
  }
  const s=hatched(5); s.sick_count=2; s.timers.illness=1;
  const next=ctx.advance(s,s.cursor+1); assert.equal(next.dead_at,s.cursor+1);
});
test('original death thresholds, adult grace period and old-age need acceleration', () => {
  for(const [key,value] of [['neglect',719],['illness',351]]) {
    const s=hatched(5); s.timers[key]=value;
    if(key==='neglect') s.hunger=0; else s.sick=true;
    assert.notEqual(ctx.advance(s,s.cursor+1).dead_at,null);
  }
  const young=hatched(5); young.timers.attention=14;
  ctx.minuteTick(young,720); assert.equal(young.care,1); assert.equal(young.adult_care,0);
  const old=hatched(5); old.timers.growth=0; old.adult_care=4; old.timers.attention=14;
  const next=ctx.advance(old,old.cursor+2); assert.notEqual(next.dead_at,null);
  const wake=hatched(5); wake.sleeping=true; wake.timers.growth=0;
  ctx.minuteTick(wake,540); assert.equal(wake.hunger_rate,61); assert.equal(wake.happy_rate,69);
});
test('automatic rebirth occurs exactly one hour later and changes seed/caretaker stream', () => {
  const s=hatched(5); ctx.die(s,'End of life');
  const before=ctx.advance(s,s.cursor+59); assert.equal(before.generation,1); assert.equal(before.dead_at,s.cursor);
  const after=ctx.advance(s,s.cursor+60); assert.equal(after.generation,2); assert.equal(after.character,0);
  assert.equal(after.dead_at,null); assert.notEqual(after.seed,s.seed); assert.equal(after.born,s.cursor+60);
  assert.equal(ctx.advance(after,after.cursor+5).character,1);
});
test('lifecycle is identical for minute, 15-minute, irregular and multi-day refreshes', () => {
  for(const seed of [0,42,99]) {
    const initial=fresh(seed); const until=start+14*1440;
    const expected=clean(ctx.advance(initial,until));
    for(const step of [1,15,73,1440]) {
      let s=initial;
      for(let cursor=start+step;cursor<until;cursor+=step) s=ctx.advance(s,cursor);
      assert.deepEqual(clean(ctx.advance(s,until)),expected,`seed ${seed}, step ${step}`);
    }
    assert.deepEqual(clean(ctx.advance(initial,start)),initial);
    assert.deepEqual(clean(ctx.advance(expected,until-1)),expected);
  }
});
test('different profiles produce different adult outcomes without directly choosing characters', () => {
  const adults=new Set(), profiles=new Set();
  for(let seed=0;seed<45;seed++) {
    let s=fresh(seed); profiles.add(s.profile);
    for(let day=1;day<=12;day++) {
      s=ctx.advance(s,start+day*1440);
      if(s.character>=5) adults.add(s.character);
    }
  }
  assert.equal(profiles.size,3); assert.ok(adults.size>=4,`adult outcomes: ${[...adults]}`);
  console.log('Observed adult outcomes:',[...adults].sort().map(i=>clean(get('P1_NAMES'))[i]).join(', '));
});
test('Serverless initializes empty state, survives cleared merge variables and consumes no display RNG', () => {
  const input={trmnl:{system:{timestamp_utc:start*60},plugin_settings:{id:123},user:{time_zone_iana:'Europe/Madrid'},state:{}}};
  const result=ctx.run(input);
  assert.equal(result.pet.character,'egg'); assert.equal(result.trmnl_state.cursor,start);
  const nextInput=clean(input); nextInput.trmnl.state=clean(result.trmnl_state); nextInput.trmnl.previous_merge_variables={};
  nextInput.trmnl.system.timestamp_utc+=900;
  const next=ctx.run(nextInput);
  assert.equal(next.trmnl_state.born,result.trmnl_state.born);
  assert.equal(next.pet.character,'babytchi'); assert.equal(requests,0);
  const withoutMetadata=ctx.run({trmnl:{state:clean(next.trmnl_state),system:{timestamp_utc:(start+30)*60}}});
  assert.equal(withoutMetadata.trmnl_state.timezone,'Europe/Madrid');
  const snapshot=JSON.stringify(next.trmnl_state);
  const p1=ctx.displayPet(next.trmnl_state,start+15),p2=ctx.displayPet(next.trmnl_state,start+15);
  assert.deepEqual(clean(p1),clean(p2)); assert.equal(JSON.stringify(next.trmnl_state),snapshot);
  const awake=hatched(5); assert.notEqual(ctx.displayPet(awake,start).sprite_transform,ctx.displayPet({...awake,cursor:start+15},start+15).sprite_transform);
  awake.sleeping=true; assert.equal(ctx.displayPet(awake,start).sprite_transform,ctx.displayPet({...awake,cursor:start+15},start+15).sprite_transform);
  assert.ok(ctx.displayPet(awake,start).sleep_path);
});
test('bad state, version, timestamps and timezone fail without mutating saved data', () => {
  for(const previous of [null,[],{version:99},{...fresh(),hunger:-1},{...fresh(),timers:{}},{...fresh(),timezone:'Mars/Olympus'},{...fresh(),timezone_fallback:'yes'}]) {
    const before=JSON.stringify(previous);
    assert.throws(()=>ctx.run({trmnl:{state:previous,system:{timestamp_utc:start*60}}}));
    assert.equal(JSON.stringify(previous),before);
  }
  assert.throws(()=>ctx.run({trmnl:{system:{timestamp_utc:'bad'}}}));
  assert.equal(ctx.timestampMinute({trmnl:{system:{timestamp_utc:'2026-10-18T10:00:00Z'}}}),start);
  assert.equal(ctx.timestampMinute({trmnl:{system:{timestamp_utc:String(start*60)}}}),start);
  assert.match(ctx.run({trmnl:{system:{timestamp_utc:start*60}}}).pet.warning,/Time zone unavailable/);
});
test('account timezone is automatic, ignores the removed override and survives missing or invalid metadata', () => {
  const result=ctx.run({trmnl:{state:{},system:{timestamp_utc:start*60},plugin_settings:{id:123,custom_fields_values:{timezone:'America/New_York'}},user:{time_zone_iana:' Europe/Madrid '}}});
  assert.equal(result.trmnl_state.timezone,'Europe/Madrid');
  assert.equal(result.trmnl_state.timezone_fallback,false);
  assert.equal(result.pet.warning,'');
  for(const zone of [undefined,null,'','  ','Mars/Olympus',123,{}]) {
    const before=clean(result.trmnl_state);
    const next=ctx.run({trmnl:{state:before,user:{time_zone_iana:zone},system:{timestamp_utc:(start+15)*60}}});
    assert.deepEqual(clean(next.trmnl_state),clean(ctx.advance(before,start+15)));
    assert.deepEqual(before,clean(result.trmnl_state));
    assert.equal(next.pet.warning,'');
  }
  const initial=clean(result.trmnl_state);
  let frequent=initial;
  for(let t=start+15;t<=start+3*1440;t+=15) {
    frequent=clean(ctx.run({trmnl:{state:frequent,system:{timestamp_utc:t*60},user:{time_zone_iana:t%30 ? 'Europe/Madrid' : undefined}}}).trmnl_state);
  }
  const delayed=ctx.run({trmnl:{state:initial,system:{timestamp_utc:(start+3*1440)*60}}});
  assert.deepEqual(frequent,clean(delayed.trmnl_state));
  const legacy=fresh(); // Version 1 state before timezone_fallback existed.
  const resumed=ctx.run({trmnl:{state:legacy,system:{timestamp_utc:start*60}}});
  assert.deepEqual(clean(resumed.trmnl_state),{...legacy,timezone_fallback:false});
});
test('UTC fallback stays visible across refreshes and rebirth, and clears only with valid metadata', () => {
  for(const zone of [undefined,null,'','  ','Mars/Olympus',123,{}]) {
    const first=ctx.run({trmnl:{state:{},user:{time_zone_iana:zone},system:{timestamp_utc:start*60},plugin_settings:{id:123}}});
    assert.equal(first.trmnl_state.timezone,'UTC');
    assert.equal(first.trmnl_state.timezone_fallback,true);
    const dead=clean(first.trmnl_state); ctx.die(dead,'Test rebirth');
    const next=ctx.run({trmnl:{state:dead,system:{timestamp_utc:(start+60)*60}}});
    assert.equal(next.trmnl_state.generation,2);
    assert.equal(next.trmnl_state.timezone_fallback,true);
    assert.match(next.pet.notice,/Time zone unavailable · sleep uses UTC/);
    assert.equal(next.pet.notice_visibility,'visible');
    const recovered=ctx.run({trmnl:{state:next.trmnl_state,user:{time_zone_iana:'UTC'},system:{timestamp_utc:(start+60)*60}}});
    assert.equal(recovered.trmnl_state.timezone_fallback,false);
    assert.equal(recovered.pet.warning,'');
    assert.equal(ctx.run({trmnl:{state:recovered.trmnl_state,system:{timestamp_utc:(start+75)*60}}}).pet.warning,'');
  }
  const legacy=fresh(42,start,'UTC');
  assert.match(ctx.run({trmnl:{state:legacy,system:{timestamp_utc:start*60}}}).pet.warning,/sleep uses UTC/);
});
test('timezone changes catch up the old life before adopting account time, including sleep, DST and stale timestamps', () => {
  for(const iso of ['2026-10-18T17:59Z','2026-10-24T17:59Z','2026-03-28T18:59Z']) {
    const previous=hatched(); previous.cursor=Date.parse(iso)/60000; previous.born=previous.cursor-100;
    const target=previous.cursor+15*60;
    const expected=clean(ctx.advance(previous,target));
    const result=ctx.run({trmnl:{state:previous,system:{timestamp_utc:target*60},user:{time_zone_iana:'America/New_York'},plugin_settings:{custom_fields_values:{timezone:'Europe/Madrid'}}}});
    assert.deepEqual(clean(result.trmnl_state),{...expected,timezone:'America/New_York',timezone_fallback:false});
    const duplicate=ctx.run({trmnl:{state:result.trmnl_state,system:{timestamp_utc:target*60},user:{time_zone_iana:'America/New_York'}}});
    assert.deepEqual(clean(duplicate.trmnl_state),clean(result.trmnl_state));
    const stale=ctx.run({trmnl:{state:result.trmnl_state,system:{timestamp_utc:(target-1)*60},user:{time_zone_iana:'Asia/Tokyo'}}});
    assert.deepEqual(clean(stale.trmnl_state),clean(result.trmnl_state));
    const next=ctx.run({trmnl:{state:result.trmnl_state,system:{timestamp_utc:(target+15)*60}}});
    assert.deepEqual(clean(next.trmnl_state),clean(ctx.advance(result.trmnl_state,target+15)));
  }
});
test('capped catch-up retains the saved zone until all elapsed minutes have been processed', () => {
  const previous=fresh(); const target=start+120015;
  const input={system:{timestamp_utc:target*60},user:{time_zone_iana:'Asia/Tokyo'}};
  const partial=ctx.run({trmnl:{...input,state:previous}});
  assert.equal(partial.trmnl_state.cursor,start+120000);
  assert.equal(partial.trmnl_state.timezone,'Europe/Madrid');
  const complete=ctx.run({trmnl:{...input,state:partial.trmnl_state}});
  const expected=clean(ctx.advance(previous,target,120015));
  assert.deepEqual(clean(complete.trmnl_state),{...expected,timezone:'Asia/Tokyo',timezone_fallback:false});
});
test('long catch-up retains cursor and stays inside state/runtime limits', () => {
  const initial=fresh(); const before=performance.now();
  const caught=ctx.advance(initial,start+120000);
  const elapsed=performance.now()-before;
  assert.ok(elapsed<5000,`catch-up took ${elapsed}ms`);
  assert.ok(Buffer.byteLength(JSON.stringify(caught))<8192);
  assert.deepEqual(clean(ctx.advance(initial,start+200000)),clean(caught)); // no time discarded at cap
  const complete=ctx.advance(caught,start+200000);
  assert.equal(complete.cursor,start+200000);
  assert.deepEqual(clean(complete),clean(ctx.advance(initial,start+200000,200000)));
  console.log(`120,000-minute catch-up: ${Math.round(elapsed)}ms; state ${Buffer.byteLength(JSON.stringify(caught))} bytes`);
});
test('TRMNL source contains one standalone transform with all original sprite frames', () => {
  assert.deepEqual(fs.readdirSync(path.join(root,'TRMNL/src')).filter(name=>name.endsWith('.js')),['transform.js']);
  assert.ok(!/\b(?:require|import)\s*\(/.test(source));
  const sprites=clean(get('P1_SPRITES'));
  for(const id of [...clean(get('P1_NAMES')),'dead']) assert.ok(sprites[id].every(p=>/^M\d+ \d+h1v1h-1z/.test(p)));
});

test('every display payload fits the conservative 5 KB merge-variable limit', () => {
  for(let character=0;character<=11;character++) {
    const s=character===0 ? fresh() : hatched(character);
    const pet=ctx.displayPet(s,s.cursor);
    assert.ok(Buffer.byteLength(JSON.stringify({pet}))<5120);
  }
});

const {render,fixture,devices,layouts}=require('../scripts/preview.cjs');
test('all device/layout/character states render the actual templates without missing variables',()=>{
  for(const device of Object.keys(devices)) for(const layout of layouts) {
    for(const character of ['egg','babytchi','marutchi','tamatchi','kuchitamatchi','mametchi','ginjirotchi','maskutchi','kuchipatchi','nyorotchi','tarakotchi','bill','dead']) {
      for(const mood of ['awake','sleeping','sick']) {
        const {html,width,height}=render({device,layout,character,mood});
        assert.ok(width>0 && height>0); assert.ok(!html.includes('{{')); assert.ok(!html.includes('undefined'));
        assert.match(html,/<path d="M/); assert.ok(!/<script/.test(html));
      }
    }
  }
});
test('plugin layouts use native framework components without custom CSS or browser scripts',()=>{
  const shared=fs.readFileSync(path.join(root,'TRMNL/src/shared.liquid'),'utf8');
  for(const layout of layouts) {
    const markup=fs.readFileSync(path.join(root,'TRMNL/src',layout+'.liquid'),'utf8');
    assert.doesNotMatch(shared+markup,/<style|\bstyle\s*=|<script|!important/i);
    assert.equal((markup.match(/class="layout /g)||[]).length,1);
    assert.match(markup,/<\/div>\s*<div class="title_bar">/);
    assert.match(markup,/<span class="title">[^<]+<\/span>\s*<span class="instance">[^<]+<\/span>/);
    assert.match(markup,/shape-rendering="crispEdges"/);
    assert.match(markup,/Food: {{ pet.food \| escape }}/);
    assert.match(markup,/Joy: {{ pet.joy \| escape }}/);
  }
  assert.match(render().html,/class="trmnl"/);
  assert.match(render().html,/\/framework\/css\/plugins.css/);
});

test('title bars share the black egg and the listing icon uses TRMNL orange',()=>{
  const shared=fs.readFileSync(path.join(root,'TRMNL/src/shared.liquid'),'utf8');
  const icon=fs.readFileSync(path.join(root,'TRMNL/media/icon.svg'),'utf8');
  assert.match(shared,/{%- capture svg_logo -%}/);
  assert.match(icon,/width="512" height="512"/);
  assert.match(icon,/fill="#E76F55"/);
  assert.equal((icon.match(/<path /g)||[]).length,1);
  const egg=icon.match(/<path d="([^"]+)"/)[1];
  for(const layout of layouts) {
    const html=render({layout}).html;
    const svg=Buffer.from(html.match(/src="data:image\/svg\+xml;base64,([^"]+)"/)[1],'base64').toString();
    assert.match(svg,/fill="#000000"/);
    assert.equal(svg.match(/<path d="([^"]+)"/)[1],egg);
  }
});

test('renderer escapes data and sleep/death indicators remain distinct',()=>{
  const sick=render({character:'mametchi',mood:'sick'}); assert.match(sick.html,/Under the weather/);
  const unavailable=render({mood:'timezone-unavailable'}); assert.match(unavailable.html,/Time zone unavailable · sleep uses UTC/);
  const sleeping=render({character:'mametchi',mood:'sleeping'}); assert.match(sleeping.html,/Sound asleep/);
  assert.ok(sleeping.pet.sleep_path.length>0);
  const dead=render({character:'dead'}); assert.match(dead.html,/Until next time/); assert.match(dead.html,/New egg in 60m/);
  const s=fixture(); s.activity='<script>alert(1)</script>'; s.activity_until=s.cursor+15;
  assert.ok(render({},s).html.includes('&lt;script&gt;alert(1)&lt;/script&gt;'));
});

test('plugin settings keep the native static strategy and a valid short description', () => {
  const settings=fs.readFileSync(path.join(root,'TRMNL/src/settings.yml'),'utf8');
  const description=settings.match(/^description: (.+)$/m)?.[1];
  assert.ok(description && description.length<=35);
  assert.match(settings,/^strategy: static$/m);
  assert.match(settings,/^static_data: '\{\}'$/m);
  assert.match(settings,/^serverless_language: node$/m);
  assert.match(settings,/^refresh_interval: 15$/m);
  assert.ok(!/^id:/m.test(settings));
  assert.doesNotMatch(settings,/keyname: timezone|Time zone override/);
});
test('the flat import ZIP includes and executes its standalone Serverless script', () => {
  const os=require('node:os');
  const {execFileSync}=require('node:child_process');
  const temp=fs.mkdtempSync(path.join(os.tmpdir(),'trmnl-tamagotchi-'));
  try {
    const zipPath=path.join(temp,'plugin.zip');
    execFileSync('python3',[path.join(root,'scripts/package-import.py'),zipPath]);
    const inspect='import json,sys,zipfile\nwith zipfile.ZipFile(sys.argv[1]) as z:\n assert z.testzip() is None\n print(json.dumps({"names": z.namelist(), "source": z.read("transform.js").decode(), "settings": z.read("settings.yml").decode()}))';
    const archive=JSON.parse(execFileSync('python3',['-c',inspect,zipPath],{encoding:'utf8'}));
    assert.deepEqual(archive.names.sort(),['full.liquid','half_horizontal.liquid','half_vertical.liquid','quadrant.liquid','settings.yml','shared.liquid','transform.js'].sort());
    assert.equal(archive.source,source);
    assert.doesNotMatch(archive.settings,/^icon:|keyname: timezone/m);
    const hosted=vm.createContext({Intl,Date});
    vm.runInContext(archive.source,hosted);
    const initial=hosted.run({trmnl:{state:{},system:{timestamp_utc:start*60},user:{time_zone_iana:'Europe/Madrid'}}});
    assert.equal(initial.pet.character,'egg');
    const resumed=hosted.run({trmnl:{state:clean(initial.trmnl_state),system:{timestamp_utc:(start+15)*60},user:{time_zone_iana:'Europe/Madrid'}}});
    assert.equal(resumed.pet.character,'babytchi');
    assert.equal(resumed.trmnl_state.born,initial.trmnl_state.born);
  } finally {fs.rmSync(temp,{recursive:true,force:true});}
});
