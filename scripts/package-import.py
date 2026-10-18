"""Create TRMNL's flat import ZIP, not a source/repository archive. Stdlib only."""
import pathlib
import sys
import zipfile

root = pathlib.Path(__file__).resolve().parents[1]
src = root / 'TRMNL/src'
names = ('settings.yml', 'shared.liquid', 'full.liquid', 'half_horizontal.liquid',
         'half_vertical.liquid', 'quadrant.liquid', 'transform.js')
if sorted(p.name for p in src.glob('*.js')) != ['transform.js']:
    raise SystemExit('TRMNL/src must contain only transform.js as JavaScript.')
for name in names:
    if not (src / name).is_file():
        raise SystemExit(f'Missing import file: {name}')
output = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else root / 'dist/trmnl-tamagotchi-plugin.zip'
output.parent.mkdir(parents=True, exist_ok=True)
with zipfile.ZipFile(output, 'w', zipfile.ZIP_DEFLATED) as archive:
    for name in names:
        archive.write(src / name, name)
with zipfile.ZipFile(output) as archive:
    assert archive.testzip() is None
    assert set(archive.namelist()) == set(names)
    assert all('/' not in name for name in archive.namelist())
print(f'Created {output} with {len(names)} root-level plugin files.')
