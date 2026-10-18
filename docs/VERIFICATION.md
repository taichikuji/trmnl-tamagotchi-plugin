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
- Template checks cover 468 device/layout/character/condition combinations, plus escaping and sleeping/death indications.

The original local browser inspection covered all twelve OG/X landscape/X portrait layout combinations, including the longest character name, with no measured layout overflow. Representative captures are in `TRMNL/media/`. These are local-shell renders, not hosted or physical-device screenshots.

## Hosted validation remains pending

The earlier whole-project ZIP did not match TRMNL's flat import format. `scripts/package-import.py` now generates the documented layout, and the checks verify its contents and standalone execution locally. That does not prove the hosted importer, Serverless VM or scheduler accepts and executes it.

After account access is available, follow the acceptance steps in `TRMNL/README.md`: import, inspect errors, wait for two scheduled refreshes, verify Saved State survives Force Refresh, and check all device/layout combinations. Do not treat a local check or Git push as proof of hosted behavior.
