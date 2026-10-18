# Verification

Run `node TRMNL/check.cjs` from the repository root with Node 20+ and Python 3. The checks use only their standard libraries.

## Automated coverage

- All seven growth charts and character timers match the independently extracted factual fixture.
- Evolution thresholds, sleep, midnight, waking, illness, discipline, aging, death, and rebirth are exercised.
- Minute, 15-minute, irregular, and daily refresh schedules produce the same lifecycle.
- IANA timezone checks include European and half-hour Australian daylight-saving transitions.
- Saved state survives cleared previous merge variables and missing timezone metadata. Invalid state fails without replacement.
- Catch-up is bounded at 120,000 elapsed minutes per run and retains progress for longer gaps. State and display payload sizes are checked.
- `TRMNL/src` contains exactly one JavaScript file, `transform.js`, with embedded sprites and no runtime imports.
- The actual generated ZIP has exactly seven root-level files. Its own `transform.js` is executed in isolation to initialize an egg and resume the same life as Babytchi.
- Plugin settings use Static input, Node, a 15-minute interval and a description within the hosted 35-character limit.
- Plugin templates are checked for native layout/title-bar structure, crisp SVG artwork, and absence of custom CSS, inline styles, or browser scripts.
- Template checks cover 468 device/layout/character/condition combinations, plus escaping and sleeping/death indications.

Local browser inspection uses the official Framework 3.4.3 release and its own fonts, device scale, view, and mashup wrappers. All twelve OG/X landscape/X portrait layout combinations were checked with the longest character name, with no measured content overflow. Sleep, illness, egg, and rebirth also received compact-slot visual checks. Representative captures are in `TRMNL/media/`. These are local framework renders; physical-device rendering remains unverified.

## Hosted validation progress

Checked against the private installation through its plugin MCP key on 2026-10-18:

- The plugin reports healthy with Static input `{}`, Node Serverless, and Framework 3.4.3.
- A scheduled refresh log records an HTTP 200 Serverless response, exit code 0, and 19 ms execution. It generated an egg and saved version 1 lifecycle state.
- The live name is `TRMNLGotchi`. Full and horizontal banner updates were read back and match the local templates exactly.
- Hosted screenshots of those two layouts render the egg, centered joy indicator, age, native banner, and generation label.
- Saved generation, birth timestamp, and simulation cursor remain unchanged after the name and markup updates.

The connection exposes the name as writable, but not the plugin description. The chosen description is present in the local settings and import ZIP; it has not been verified on the live plugin.

Still pending: two successive scheduled refreshes advancing the same saved life, Force Refresh persistence, hosted renders of every OG/X layout and orientation, and physical-device inspection. The regenerated flat ZIP is checked locally; a fresh import of that exact archive has not been observed. Follow the acceptance steps in `TRMNL/README.md` for the remaining checks.
