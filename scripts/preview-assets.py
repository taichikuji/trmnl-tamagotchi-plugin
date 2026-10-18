"""Cache the official framework and fonts for the local preview, never the plugin ZIP."""
import io
from pathlib import Path
import re
import sys
import urllib.request
import zipfile

root = Path(sys.argv[1])
version = sys.argv[2]
if not (root / "ready").exists():
    print(f"Caching official TRMNL Framework {version} for local previews...")
    url = f"https://github.com/usetrmnl/trmnl-framework/releases/download/v{version}/trmnl-framework--{version}.zip"
    with zipfile.ZipFile(io.BytesIO(urllib.request.urlopen(url, timeout=30).read())) as archive:
        css = archive.read("css/plugins.css")
    (root / "css").mkdir(parents=True, exist_ok=True)
    (root / "fonts").mkdir(exist_ok=True)
    (root / "css/plugins.css").write_bytes(css)
    # Fetch only referenced font files from the matching official release tag.
    for name in sorted(set(re.findall(rb'/fonts/([^"\)]+)', css))):
        name = name.decode()
        url = f"https://raw.githubusercontent.com/usetrmnl/trmnl-framework/v{version}/public/fonts/{name}"
        (root / "fonts" / name).write_bytes(urllib.request.urlopen(url, timeout=30).read())
    (root / "ready").touch()
