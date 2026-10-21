"""Rebuild factual reference and pixel paths from a local agg23 tama.asm.
Usage: python3 scripts/extract-reference.py /path/to/tama.asm
No ROM or assembly is copied into this project. Python standard library only.
"""
import hashlib
import json
import pathlib
import re
import sys

root = pathlib.Path(__file__).resolve().parents[1]
source = pathlib.Path(sys.argv[1]).read_bytes()
ops = {int(a, 16): (op.split()[0], int(value, 16))
       for op, value, a in re.findall(
           rb'\b(lbpx\s+mx,|retd)\s+(0x[0-9A-F]+)\s+// (0x[0-9A-F]+)', source)}

def chain(address):
    result = []
    while True:
        op, value = ops[address]
        result.append(value)
        address += 1
        if op == b'retd':
            return result

def nibbles(values):
    return [v for byte in values for v in (byte & 15, byte >> 4)]

names = ['egg', 'babytchi', 'marutchi', 'tamatchi', 'kuchitamatchi',
         'mametchi', 'ginjirotchi', 'maskutchi', 'kuchipatchi', 'nyorotchi',
         'tarakotchi', 'bill']
starts = [0x1564, 0x1571, 0x157e, 0x158b, 0x1598, 0x15a5, 0x15b2,
          0x15bf, 0x15cc, 0x15d9]
fields = [('wake', 2), ('sleep', 2), ('hungry', 2), ('happy', 2),
          ('sickness', 3), ('medicine', 1), ('min_weight', 2), ('max_weight', 2),
          ('evolution', 3), ('discipline_calls', 1), ('discipline', 1),
          ('game', 1), ('win_delay', 1), ('loss_delay', 1), ('bites', 1), ('unused', 1)]
stats = {}
for name, address in zip(names[1:11], starts):
    data = nibbles(chain(address)); offset = 0; row = {}
    for field, size in fields:
        row[field] = sum(data[offset + i] << (4 * i) for i in range(size))
        offset += size
    row['address'] = hex(address)
    stats[name] = row
stats['bill'] = dict(stats['mametchi'])
charts = []
for address in [0xd9c, 0xd9e, 0xda6, 0xdb2, 0xdba, 0xdc0, 0xdc4]:
    data = nibbles(chain(address))
    charts.append([data[i:i + 4] for i in range(0, len(data), 4)])
reference = {'source': 'https://github.com/agg23/tamagotchi-disassembled/blob/master/tama.asm',
             'sha256': hashlib.sha256(source).hexdigest(), 'stats': stats, 'charts': charts}
(root / 'TRMNL/fixtures/p1-reference.json').write_text(json.dumps(reference, indent=2) + '\n')

def pixels(descriptor):
    if descriptor & 127 == 127:
        return [[0] * 16 for _ in range(8)]
    address = 0x1030 + (descriptor & 127) * 16
    columns = [ops[address + c][1] for c in range(16)]
    grid = [[(v >> y) & 1 for v in columns] for y in range(8)]
    return [row[::-1] for row in grid] if descriptor & 128 else grid

def path(grid):
    return ''.join(f'M{x} {y}h1v1h-1z' for y, row in enumerate(grid)
                   for x, bit in enumerate(row) if bit)

assets = {}
for index, name in enumerate(names):
    frames = []
    for frame in range(2):
        upper = ops[0xc00 + ops[0xc00 + index][1] + frame][1]
        lower = ops[0xd00 + ops[0xd00 + index][1] + frame][1]
        frames.append(path(pixels(upper) + pixels(lower)))
    assets[name] = frames
# The baby is an eight-pixel sprite drawn in the lower half of the LCD.
assets['babytchi'] = [path([[0] * 16 for _ in range(8)] + pixels(d)) for d in (0, 4)]
# Original death angel and sleep Z; whole sprites, no firmware logic.
assets['dead'] = [path(pixels(0x4b) + pixels(0x4c))] * 2
assets['sleep'] = path([[ops[0x17d0 + x][1] >> y & 1 for x in range(8)] for y in range(8)])
assets['poop'] = path([[ops[0x16f0 + x][1] >> y & 1 for x in range(8)] for y in range(8)])
# Update the embedded data in the one deployable file; do not create extra JS files.
transform = root / 'TRMNL/src/transform.js'
text = transform.read_text()
start = text.index('// BEGIN P1_SPRITES')
end = text.index('// END P1_SPRITES', start) + len('// END P1_SPRITES')
# Retain project-added characters in the same table while rebuilding the original P1 artwork.
existing = json.loads(re.search(r'const P1_SPRITES = (\{.*?\});', text[start:end], re.S).group(1))
assets.update({name: frames for name, frames in existing.items() if name not in assets})
embedded = '// BEGIN P1_SPRITES\nconst P1_SPRITES = ' + json.dumps(assets, indent=2) + ';\n// END P1_SPRITES'
transform.write_text(text[:start] + embedded + text[end:])
print('Updated factual reference and embedded sprite paths in transform.js.')
