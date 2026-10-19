# Development

Use Node 20+ and Python 3. The development scripts use their standard libraries; no package installation is required. All deployed JavaScript lives in `TRMNL/src/transform.js`.

## Local preview

From the repository root, run:

```sh
node scripts/preview.cjs
```

Open **http://127.0.0.1:8766**. Choose a device, layout, character and pose state, or select **Seeded lifecycle** and advance time to exercise the simulation. **Needs labels** compares the original words, icons only, icons beside words and icons above words. Icons only is the template default; the other treatments exist only in the local preview. See the [visual comparison](NEEDS-ICONS.md).

The first launch downloads the official Framework 3.4.3 release and fonts into the ignored `.cache/` directory. Later launches work offline. The preview supplies TRMNL's native screen and mashup wrappers, including X's 1.8 physical-pixel scale. Preview-only CSS positions and crops the device canvas; it is excluded from the plugin ZIP.

For [TRMNLP](https://github.com/usetrmnl/trmnlp), open `TRMNL/` and run `trmnlp serve`. `.trmnlp.yml` disables the local transform and provides a fixed Mametchi artwork fixture. Use the lifecycle preview or hosted plugin to exercise growth.

## Checks and import package

From the repository root:

```sh
node TRMNL/check.cjs
python3 scripts/package-import.py
```

The import archive is `dist/trmnl-tamagotchi-plugin.zip`. It contains `settings.yml`, five Liquid files and `transform.js` directly at the archive root. GitHub's source archive contains repository folders and is not an import package.

See [verification coverage and hosted progress](VERIFICATION.md) for completed and outstanding checks.

## Markup

Each view contains one native `layout` and a sibling `title_bar`. Layout, grid, flex, spacing, sizing and typography use framework utilities. There are no custom stylesheets, inline styles or browser scripts in the plugin templates.

Pet and heart SVG artwork uses `shape-rendering="crispEdges"`. Pixel hearts avoid font-dependent glyph rendering. The shared `svg_food` and `svg_joy` captures embed the supplied `TRMNL/media/FOOD-black.svg` and `TRMNL/media/JOY-black.svg` unchanged. Keep those captures in sync when editing the source SVGs. Needs icons are 28 framework pixels in full view and 24 in mashups, with the framework applying device scaling. Accessible Food/Joy names and heart values remain on the heart SVGs.

The shared `svg_logo` capture supplies a black egg as an inline SVG image to every title bar; `TRMNL/media/icon.svg` supplies the same artwork in orange for the plugin listing. Upload the listing icon separately from the flat import ZIP. The full and horizontal title bars show the plugin, character, stage and generation; narrow views keep the character name and generation. Sleep has a visible Z. Illness, rebirth countdowns and time zone warnings appear when relevant.

## State and time

Sleep automatically uses a valid `trmnl.user.time_zone_iana`. Missing, blank or invalid metadata preserves the saved time zone. Only a new instance with neither uses UTC; `timezone_fallback` keeps an unobtrusive warning visible across refreshes and rebirth until valid account metadata arrives. An account explicitly set to UTC does not show that warning.

Existing version 1 state remains supported. The removed custom field is ignored, including any leftover value on an existing installation. Elapsed time is processed in the previous saved zone before adopting the current account zone for future minutes, even when catch-up spans multiple runs. Birth time, seed, generation, needs and care history are preserved. Duplicate timestamps do not advance life; older timestamps cannot change the saved zone. For an older UTC state with no provenance or account metadata, show the warning until the account confirms its zone. No UTC-offset approximation is used for DST.

The simulation advances in elapsed UTC minutes. Catch-up is bounded at 120,000 minutes per run, retaining the cursor for subsequent refreshes when a gap is longer. Invalid state raises an error rather than silently resetting the pet. Force Refresh preserves the life; Clear Saved State deliberately starts over.

See [rules and adaptations](RULES.md) before describing the simulation as faithful. It is a researched behavior model rather than a cycle-accurate firmware emulator.

## Hosted acceptance checks

- Confirm a fresh install has no time zone field. Inspect Serverless input for `trmnl.user.time_zone_iana` on its first render and subsequent scheduled refreshes; verify the saved zone matches the account. Do not clear an existing pet to perform this check.
- Confirm the first render creates an egg and saves `trmnl.state.version = 1`, `born`, `seed` and `cursor`.
- Allow two scheduled 15-minute refreshes. The cursor must advance while the birth timestamp and seed remain stable; Babytchi should appear at the first scheduled refresh.
- Use Force Refresh and confirm the same life is preserved, including when previous merge variables are cleared. Rendering twice in one minute must not advance the simulation.
- Check a mashup from the same plugin instance shows the same pet. Separate installations have separate lives.
- Check all four views on OG and X, including portrait, sleep times and debug logs.

## GitHub publishing workflow

**Publish to TRMNL** runs manually with `workflow_dispatch` and automatically on pushes to `main` that change plugin source, media or the workflow itself. Such a push deploys the plugin to the configured private installation.

Configure repository secrets `TRMNL_API_KEY` and `TRMNL_PLUGIN_SETTING_ID`. The latter is the installed plugin number in `/plugin_settings/<ID>/edit`. The workflow needs a TRMNL account API key; a plugin MCP key is a separate credential. Keep credentials out of the repository.

Public recipe publication remains deferred. Original artwork and trademark terms are documented in [LICENSE](../LICENSE) and the [project notice](../README.md#trademark-and-artwork-notice).
