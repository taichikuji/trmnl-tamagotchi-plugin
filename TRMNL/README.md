# TRMNLGotchi

A TRMNL plugin that raises a nostalgic P1-style virtual pet. It hatches, eats, plays, sleeps and evolves with an automatic caretaker.

## Icon

<div align="center">
  <img src="media/icon.svg" alt="Plugin Icon" width="90">
</div>

## Previews

Previews show TRMY in different care states, rendered with Framework 3.4.3.

| Full View · Cheerful | Half Horizontal View · Playing |
|------------|----------------------|
| ![Cheerful TRMY in the full view](media/preview_full.webp) | ![TRMY playing in the half horizontal view](media/preview_half_horizontal.webp) |

| Half Vertical View · Having a Meal | Quadrant View · Needs Cleaning |
|-------------------|----------------|
| ![TRMY having a meal in the half vertical view](media/preview_half_vertical.webp) | ![TRMY needing cleanup in the quadrant view](media/preview_quadrant.webp) |

| TRMNL X Landscape · Sleeping | TRMNL X Portrait · Under the Weather |
|-------------------|------------------|
| ![TRMY sleeping on TRMNL X landscape](media/preview_trmnl_x.webp) | ![Unwell TRMY on TRMNL X portrait](media/preview_trmnl_x_portrait.webp) |

## Templates

- **transform.js**: Simulation, seeded care, evolution, saved state and original sprite data.
- **shared.liquid**: Shared icons, pet artwork, needs, notices and title bar. Each layout supplies its sizing and banner options.
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

Progress follows elapsed time, so changing the refresh frequency does not change care decisions. Force Refresh preserves the pet; **Clear Saved State** starts a new life. See the [rule table](https://github.com/taichikuji/trmnl-tamagotchi-plugin/wiki/Lifecycle-rules) for the researched rules and adaptations, and [verification progress](https://github.com/taichikuji/trmnl-tamagotchi-plugin/wiki/Verification) for the hosted checks completed so far.

TRMY is an alternative perfect-care adult alongside Mametchi. When the Mametchi-eligible Tamatchi teen reaches adulthood with **zero care mistakes and zero missed discipline calls**, its life seed chooses evenly between Mametchi and TRMY. Mametchi-eligible teens with one or two care mistakes still become Mametchi. All other evolution branches, including the secret adult, keep their original outcomes. The choice happens during normal evolution and is saved as the character itself; existing adults keep their current identities after updating.

TRMY has its own entry in the same character, stats, sprites and growth tables. Its hunger drops every **180 awake minutes** and happiness every **210 awake minutes**, compared with Mametchi's 81 and 91. It sleeps **22:00–09:00** in the account time zone, starts fully disciplined, and takes one medicine dose per treatment. Illness and adult aging countdowns are both 4,095 awake minutes, within the original P1 timer ranges. It uses the same cleanup, illness, aging, death and rebirth mechanics as the other pets. Aging eventually accelerates its needs too.

TRMY's eight expressions are complete 32×32 SVG pixel paths in the same `P1_SPRITES` table. **Unamused** and **cheerful** alternate at the original 15-minute idle cadence; care states and recent activities select the other expressions:

| Expression | When it appears |
| --- | --- |
| Unamused / cheerful | Ordinary idle poses |
| Sleepy | Sleeping, with the original Z indicator |
| Fainted | Illness |
| Squinting | Cleanup is pending, beside the original poop indicator |
| Skeptical | Discipline calls, empty food/joy, or just after scolding |
| Delighted | Having a meal, freshly cleaned, or recovering after medicine |
| Starry | Playing a game |

Sleep takes priority over illness, then cleanup, then discipline/empty needs, then activity reactions. Brief meal, play and successful-care reactions remain visible for up to **15 simulated minutes** so a normal refresh can catch them. This display-only extension uses the existing activity timestamp; care timings, random decisions and saved-state fields are unchanged.

Only the current expression's path is sent to the display. A `scale(0.5)` transform fits its native detail into the existing 16-unit character tile. Sleep Z, poop, discipline and the death angel reuse the original artwork. The original P1 extraction script assembles upper and lower tiles before embedding complete paths; the plugin does not assemble or decode tiles at runtime.

Run `node scripts/preview.cjs` from the repository root and select **trmy** in the local preview to inspect it. Production character selection follows care history and evolution.

## Trademark and artwork notice

TRMNLGotchi is an unofficial fan project. Tamagotchi is a trademark of BANDAI Co., Ltd.; its characters and original artwork belong to BANDAI. This project is not affiliated with, sponsored by, or endorsed by BANDAI or Bandai Namco. The MIT license covers original code and documentation; third-party material retains its own terms. See [LICENSE](../LICENSE) and the [full notice](../README.md#trademark-and-artwork-notice).

TRMY is the TRMNL mascot. Its supplied pixel-art redraws are separate from the original Bandai P1 artwork; adding this fan-made appearance does not imply TRMNL endorsement.

Public recipe publication remains deferred. For support, [open a GitHub issue](https://github.com/taichikuji/trmnl-tamagotchi-plugin/issues). Local preview, verification and publishing instructions are in the [development guide](https://github.com/taichikuji/trmnl-tamagotchi-plugin/wiki/Development).
