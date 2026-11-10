"""Rebuild sprite paths from a local agg23 tama.asm.
Usage: python3 scripts/extract-reference.py /path/to/tama.asm
No ROM or assembly is copied into this project. Python standard library only.
"""
import json
import pathlib
import re
import sys

root = pathlib.Path(__file__).resolve().parents[1]
source = pathlib.Path(sys.argv[1]).read_bytes()
ops = {int(a, 16): (op.split()[0], int(value, 16))
       for op, value, a in re.findall(
           rb'\b(lbpx\s+mx,|retd)\s+(0x[0-9A-F]+)\s+// (0x[0-9A-F]+)', source)}

names = ['egg', 'babytchi', 'marutchi', 'tamatchi', 'kuchitamatchi',
         'mametchi', 'ginjirotchi', 'maskutchi', 'kuchipatchi', 'nyorotchi',
         'tarakotchi', 'bill']
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
print('Updated embedded sprite paths in transform.js.')
