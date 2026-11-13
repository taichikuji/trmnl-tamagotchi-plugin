"""Extract complete P1/P2 body poses and animation sequences from supplied ROMs.
Usage: python3 scripts/extract-reference.py P1_ROM P2_ROM P1_TRACE P2_TRACE
Generate traces with trace-rom-sprites.c and tamarecomp (see TRMNL/README.md).
Only Python's standard library is required. No ROM is copied into the project.
"""
import hashlib
import json
import pathlib
import struct
import sys

root = pathlib.Path(__file__).resolve().parents[1]
assert len(sys.argv) == 5, __doc__
expected = ['4b4979cf92dc9d2fb6d7295a38f209f3da144f72',
            '09e5101b37636a314fc599d5d69b4846721b3c88']
assets = {}
for family, rom_path, trace_path, sha1 in zip(
        ('p1', 'p2'), sys.argv[1:3], sys.argv[3:5], expected):
    data = pathlib.Path(rom_path).read_bytes()
    assert hashlib.sha1(data).hexdigest() == sha1, 'Unexpected ' + family + ' ROM'
    words = struct.unpack('>6144H', data)

    def tile(descriptor):
        if descriptor & 127 == 127:
            return [[0] * 16 for _ in range(8)]
        address = 0x1030 + (descriptor & 127) * 16
        columns = [words[address + x] & 255 for x in range(16)]
        rows = [[(v >> y) & 1 for v in columns] for y in range(8)]
        return [row[::-1] for row in rows] if descriptor & 128 else rows

    def path(rows):
        # Horizontal runs preserve exact pixels with much less SVG than one path per pixel.
        result = []
        for y, row in enumerate(rows):
            x = 0
            while x < len(row):
                if not row[x]:
                    x += 1
                    continue
                start = x
                while x < len(row) and row[x]:
                    x += 1
                length = x - start
                result.append(f'M{start} {y}h{length}v1h-{length}z')
        return ''.join(result)

    ticks, loops = {}, {}
    trace = pathlib.Path(trace_path).read_text().splitlines()
    fingerprint = 2166136261
    for byte in data:
        fingerprint = ((fingerprint ^ byte) * 16777619) & 0xffffffff
    assert trace[0] == f'ROM {fingerprint}', 'Trace belongs to another ROM'
    for line in trace[1:]:
        kind, *values = line.split()
        values = list(map(int, values))
        c, action = values[:2]
        if kind == 'FRAME':
            tick, upper, lower = values[2:]
            frames = ticks.setdefault((c, action), [])
            assert tick == len(frames)
            frames.append((upper, lower))
        else:
            assert kind == 'LOOP'
            end, beginning = values[2:]
            assert end == len(ticks[c, action]) and 0 <= beginning < end
            loops[c, action] = beginning
    assert len(ticks) == len(loops) == 132, 'Incomplete animation trace'
    characters = []
    pose_count = 0
    for c in range(12):
        poses, indices = [], {}
        def pose(pair):
            pixels = tile(pair[0]) + tile(pair[1])
            svg = path(pixels)
            if svg not in indices:
                indices[svg] = len(poses)
                poses.append(svg)
            return indices[svg]
        # Keep every canonical table pose, including poses selected outside the controller.
        upper = 0xc00 + (words[0xc00 + c] & 255)
        lower = 0xd00 + (words[0xd00 + c] & 255)
        upper_end = 0xc00 + (words[0xc00 + c + 1] & 255) if c < 11 else (0xc79 if family == 'p1' else 0xc76)
        lower_end = 0xd00 + (words[0xd00 + c + 1] & 255) if c < 11 else (0xd7d if family == 'p1' else 0xd7a)
        assert upper_end - upper == lower_end - lower, "Mismatched body tables"
        for f in range(upper_end - upper):
            pose((words[upper + f] & 255, words[lower + f] & 255))
        animations = []
        for action in range(11):
            frames = ticks[c, action]
            # Preserve the one-time prefix, loop point and original tick holds.
            groups = []
            for section in (frames[:loops[c, action]], frames[loops[c, action]:]):
                runs = []
                for pair in section:
                    index = pose(pair)
                    if runs and runs[-1][0] == index:
                        runs[-1][1] += 1
                    else:
                        runs.append([index, 1])
                groups.append(runs)
            animations.append(groups)
        characters.append({'poses': poses, 'animations': animations})
        pose_count += len(poses)
    # The egg's fifth table frame is the original regional death sprite.
    icons = {}
    for name, address in (('sleep', 0x17d0), ('poop', 0x16f0)):
        icons[name] = [path([[(words[address + f * 8 + x] >> y) & 1 for x in range(8)]
                             for y in range(8)]) for f in range(2)]
    assets[family] = {'characters': characters, 'dead': path(tile(0x4b) + tile(0x4c)), **icons}
    print(f'{family}: {pose_count} distinct body poses, 132 complete controller sequences')
assert len(assets) == 2, __doc__
transform = root / 'TRMNL/src/transform.js'
text = transform.read_text()
start = text.index('// BEGIN ROM_SPRITES')
end = text.index('// END ROM_SPRITES', start) + len('// END ROM_SPRITES')
# Keep one pose/sequence per line: readable generated data without deep JSON padding.
compact = lambda value: json.dumps(value, separators=(',', ':'))
families = []
for family, art in assets.items():
    characters = []
    for character in art['characters']:
        characters.append('{"poses":[\n' + ',\n'.join(map(compact, character['poses'])) +
                          '],\n"animations":[\n' + ',\n'.join(map(compact, character['animations'])) + ']}')
    extras = ','.join(compact(key) + ':' + compact(value) for key, value in art.items() if key != 'characters')
    families.append(compact(family) + ':{"characters":[\n' + ',\n'.join(characters) + '],\n' + extras + '}')
embedded = '// BEGIN ROM_SPRITES\n// Generated by scripts/extract-reference.py; poses and [prefix, loop] holds come from the ROMs.\nconst ROM_SPRITES = {\n' + ',\n'.join(families) + '};\n// END ROM_SPRITES'
transform.write_text(text[:start] + embedded + text[end:])
