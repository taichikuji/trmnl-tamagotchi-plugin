# Sources and attribution

Checked on 18 October 2026.

## Primary P1 sources

- [agg23/tamagotchi-disassembled](https://github.com/agg23/tamagotchi-disassembled), specifically [tama.asm at commit 421eacbe57092afe8eaa85cbeee41bcf55162056](https://github.com/agg23/tamagotchi-disassembled/blob/421eacbe57092afe8eaa85cbeee41bcf55162056/tama.asm). The assembly was used to verify factual timers and growth vectors and to extract the original pixel artwork. The repository explicitly excludes Bandai's ROM/source from its own software license. No assembly or ROM is included here.
- [Rhubarbtart's P1 hacking log](https://rhubarbtart.neocities.org/p1hackinglog), with [character stats](https://rhubarbtart.neocities.org/file/stats.txt) and [memory/growth notes](https://rhubarbtart.neocities.org/file/tama_notes.txt). Useful original reverse-engineering findings; speculative notes were checked against assembly before inclusion in the verified table.
- The researcher's [timeline.py](https://rhubarbtart.neocities.org/file/timeline.py) assumes perfect care, requires a ROM through its imports, and explicitly notes wake-boundary inaccuracies. It was inspected as a reference, not executed or copied into the runtime.
- [TamaLIB](https://github.com/jcrona/tamalib) was inspected as an alternative/reference. No TamaLIB code, ROM or GPL emulator dependency is incorporated.

`TRMNL/fixtures/p1-reference.json` records the SHA-256 of the assembly actually inspected. `scripts/extract-reference.py` accepts that source as a local argument and regenerates the facts and sprite paths using only the Python standard library. It never copies the firmware into this project.

## Artwork mapping

The disassembly's informal graphics captions are incomplete. For example, the adult named Kuchipatchi in some captions does not match that character's lookup-table selection. Extraction follows the upper and lower character tables at **0xC00** and **0xD00**. A descriptor's low seven bits select `0x1030 + descriptor * 16`; its high bit mirrors the row. Sixteen column bytes produce each 16×8 half, combined into a 16×16 sprite. Babytchi uses original 0x1030/0x1070 poses in the lower half. Death uses the original 0x14E0/0x14F0 angel, and sleep uses the 0x17D0 Z.

Bandai retains the original artwork. The embedded pixel paths and screenshots are excluded from this repository’s MIT license; see LICENSE. Public TRMNL recipe publication is deferred.

## TRMNL sources

- [Saved State](https://help.trmnl.com/en/articles/16777795-saved-state): Static strategy support, `input.trmnl.state`, returned `trmnl_state`, per-install state, 8192-byte cap and Force Refresh behavior.
- [Serverless](https://help.trmnl.com/en/articles/14130649-serverless): Node runtime, `run(input)`, five-second / 128 MB limits.
- [Plugin strategies](https://help.trmnl.com/en/articles/17434705-plugin-strategies): account prerequisites, Static strategy and refresh configuration.
- [Screen-generation metadata](https://docs.trmnl.com/go/plugin-marketplace/plugin-screen-generation-flow): `user.time_zone_iana` and UTC timestamps.
- [TRMNL framework view layouts](https://trmnl.com/framework/docs/3.3/view) and [X device guide](https://help.trmnl.com/en/articles/17434702-trmnl-x): four layout variants and X dimensions/orientations.

## Existing plugin conventions inspected

The implementation follows your `TRMNL/src/` structure, `transform.js` naming and separate Shared/four-layout approach:

- [HTTP Pets](https://github.com/taichikuji/trmnl-http-pets-plugin): Static `{}`, Node Serverless, refresh and custom-field settings.
- [Xiaomi Weather](https://github.com/taichikuji/trmnl-xiaomi-weather-plugin): dependency-free VM checks and UTC metadata handling.
- [Frank Energie](https://github.com/taichikuji/trmnl-frank-energie-plugin): OG/X, portrait and mashup conventions.
- [LaLiga](https://github.com/taichikuji/trmnl-laliga-plugin) and [TMB](https://github.com/taichikuji/trmnl-tmb-plugin): source/layout and preview organization.

No changes were made to those reference repositories. Hosted TRMNL validation and public recipe publication remain pending.

## Display framework

- [TRMNL framework guidance](https://github.com/usetrmnl/trmnl-agent-skills): native components and utilities, platform-owned screen/view wrappers, and size-specific content.
- [Structure](https://trmnl.com/framework/docs/3.4/structure): one `layout` per view, with the standard `title_bar` as its sibling. Screen, mashup, and view wrappers belong to the platform.
- [Title bar](https://trmnl.com/framework/docs/3.4/title_bar), [size utilities](https://trmnl.com/framework/docs/3.4/size), and [screen](https://trmnl.com/framework/docs/3.4/screen): layout/title-bar siblings, native device dimensions, and pixel scaling.
- [Official Framework 3.4.3 release](https://github.com/usetrmnl/trmnl-framework/releases/tag/v3.4.3): pinned for plugin settings and cached locally by the preview. Framework assets and fonts are development cache files, not plugin runtime dependencies.
