# trmnl-tamagotchi-plugin

A TRMNL Tamagotchi plugin to display your new nostalgic friend!

An unattended P1-style pet that hatches, eats, plays, sleeps, grows through care-based evolution paths, and starts another generation after death. Uses TRMNL Serverless and Saved State; no external service or runtime dependencies.

## Features

- Seeded autonomous care with attentive, inconsistent, and neglectful caretakers
- Researched P1 timers and evolution branches, including Bill
- Original pixel artwork embedded in the single `TRMNL/src/transform.js`
- Full, half-horizontal, half-vertical, and quadrant layouts for OG and X, including portrait
- Progress based on elapsed time, independent of refresh frequency

## Setup

See [plugin setup and previews](TRMNL/README.md). Hosted import, Serverless execution and saved-state persistence still need validation against a TRMNL account.

## Local development

Open `TRMNL/` with [TRMNLP](https://github.com/usetrmnl/trmnlp) for a fixed artwork preview, or use the dependency-free lifecycle preview:

```sh
node scripts/preview.cjs
```

Open **http://127.0.0.1:8766**, choose a character or **Seeded lifecycle**, and advance time. Node 20 or newer is required. All deployed JavaScript lives directly in `TRMNL/src/transform.js`; there is no build step.

Run the checks and create a flat TRMNL import archive:

```sh
node TRMNL/check.cjs
python3 scripts/package-import.py
```

The archive is `dist/trmnl-tamagotchi-plugin.zip`. GitHub's **Download ZIP** contains repository folders and is not a TRMNL import package.

## References

- [Rule table and model limitations](docs/RULES.md)
- [Sources and sprite mapping](docs/SOURCES.md)
- [P1 disassembly](https://github.com/agg23/tamagotchi-disassembled)
- [P1 reverse-engineering findings](https://rhubarbtart.neocities.org/p1hackinglog)
- [TRMNL Saved State](https://help.trmnl.com/en/articles/16777795-saved-state)
- [TRMNL Serverless](https://help.trmnl.com/en/articles/14130649-serverless)
- [TRMNL import format](https://help.trmnl.com/en/articles/10542599-importing-and-exporting-private-plugins)

Original implementation code is MIT licensed. Bandai's original artwork and its rendered screenshots retain their own terms; see [LICENSE](LICENSE). No ROM or firmware source is included. Public TRMNL recipe publication is deferred.
