# TRMNLGotchi

A TRMNL plugin that raises a nostalgic P1-style virtual pet. It hatches, eats, plays, sleeps and evolves with an automatic caretaker.

## Icon

The listing icon is stored in [media/icon.svg](media/icon.svg) in TRMNL orange (`#E76F55`) and referenced from `settings.yml`. All four title bars reuse the black `svg_logo` captured in `shared.liquid`.

<div align="center">
  <img src="media/icon.svg" alt="Plugin Icon" width="90">
</div>

## Previews

Previews use a fixed Mametchi artwork fixture rendered with Framework 3.4.3.

Food and joy use the supplied Tamagotchi icons beside the heart meters. See [all four label options and the comparison](../docs/NEEDS-ICONS.md), or switch **Needs labels** in the local preview to compare them on any device and layout.

| Full View | Half Horizontal View |
|------------|----------------------|
| ![Full View](media/preview_full.webp) | ![Half Horizontal View](media/preview_half_horizontal.webp) |

| Half Vertical View | Quadrant View |
|-------------------|----------------|
| ![Half Vertical View](media/preview_half_vertical.webp) | ![Quadrant View](media/preview_quadrant.webp) |

| TRMNL X Landscape | TRMNL X Portrait |
|-------------------|------------------|
| ![TRMNL X Landscape](media/preview_trmnl_x.webp) | ![TRMNL X Portrait](media/preview_trmnl_x_portrait.webp) |

## Templates

- **transform.js**: Simulation, seeded care, evolution, saved state and original sprite data.
- **shared.liquid**: Shared black egg, food and joy SVGs; styling comes from the native TRMNL framework.
- **full.liquid**: Centered pet, food, joy and age, with the character, stage and generation in the title bar.
- **half_horizontal.liquid**: The same information in a shorter horizontal view.
- **half_vertical.liquid**: Pet and needs with the character name and generation in the title bar.
- **quadrant.liquid**: Compact pet and needs for the smallest slot.

All four layouts use native Framework 3.4.3 utilities and crisp SVG artwork. Serverless and Saved State keep the simulation inside TRMNL; no external service or runtime dependencies are required.

## Setup

Create a Private Plugin with **Static** data `{}`, Framework **3.4.3**, **Node** Serverless and a **15-minute** refresh interval. Private plugins require Developer or BYOD access.

Generate the import package from the repository root:

```sh
python3 scripts/package-import.py
```

In TRMNL, choose **Plugins → Private Plugins → Import new** and upload `dist/trmnl-tamagotchi-plugin.zip`. This script creates the flat archive TRMNL expects. Upload [media/icon.svg](media/icon.svg) in the plugin settings for the orange listing icon.

For manual setup, copy the values from [settings.yml](src/settings.yml) into the dashboard, paste [shared.liquid](src/shared.liquid) into Shared and each layout into its matching markup tab. Paste the complete [transform.js](src/transform.js) into **Serverless** and select **Node**.

Save, Force Refresh and add the plugin to your playlist. Sleep follows your TRMNL account time zone automatically; no time zone input is needed. If TRMNL temporarily omits it, the pet keeps its saved time zone. A new installation without usable time zone metadata displays **Time zone unavailable · sleep uses UTC** until account metadata becomes available.

## Pet behavior

Each generation gets a seeded caretaker. Care history determines evolution, and a new egg appears one simulated hour after death. **Gen 1** is the first generation.

Progress follows elapsed time, so changing the refresh frequency does not change care decisions. Force Refresh preserves the pet; **Clear Saved State** starts a new life. See the [rule table](../docs/RULES.md) for the researched rules and adaptations, and [verification progress](../docs/VERIFICATION.md) for the hosted checks completed so far.

## Trademark and artwork notice

TRMNLGotchi is an unofficial fan project. Tamagotchi is a trademark of BANDAI Co., Ltd.; its characters and original artwork belong to BANDAI. This project is not affiliated with, sponsored by, or endorsed by BANDAI or Bandai Namco. The MIT license covers original code and documentation; third-party material retains its own terms. See [LICENSE](../LICENSE) and the [full notice](../README.md#trademark-and-artwork-notice).

Public recipe publication remains deferred. For support, [open a GitHub issue](https://github.com/taichikuji/trmnl-tamagotchi-plugin/issues). Local preview, verification and publishing instructions are in the [development guide](../docs/DEVELOPMENT.md).
