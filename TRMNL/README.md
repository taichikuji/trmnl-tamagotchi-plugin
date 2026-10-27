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

Install the [published recipe](https://trmnl.com/recipes/510825), keep **Pet → My own pet** selected and add it to your playlist. Each installation has its own pet and saved progress; two devices using the same installation show the same pet. Separate pets need separate installations.

### Private import or manual setup

Create a Private Plugin with **Static** data `{}`, Framework **3.4.3**, **Node** Serverless and a **15-minute** refresh interval. Private plugins require Developer or BYOD access.

Generate the import package from the repository root:

```sh
python3 scripts/package-import.py
```

In TRMNL, choose **Plugins → Private Plugins → Import new** and upload `dist/trmnl-tamagotchi-plugin.zip`. This script creates the flat archive TRMNL expects. Upload [media/icon.svg](media/icon.svg) in the plugin settings for the orange listing icon.

For manual setup, copy the values from [settings.yml](src/settings.yml) into the dashboard, paste [shared.liquid](src/shared.liquid) into Shared and each layout into its matching markup tab. Paste the complete [transform.js](src/transform.js) into **Serverless** and select **Node**.

Save, Force Refresh and add the plugin to your playlist. Sleep follows your TRMNL account time zone automatically; no time zone input is needed. If TRMNL temporarily omits it, the pet keeps its saved time zone. A new installation without usable time zone metadata displays **Time zone unavailable · sleep uses UTC** until account metadata becomes available.

### Existing installs showing the author's pet

The original recipe had only an About field. TRMNL [reuses the recipe master's screens when there are no input fields](https://help.trmnl.com/en/articles/16777795-saved-state), leaving the install's saved state empty. The **Pet** selector is required to get a separate simulation even though it has only one option. Keep it in the recipe; the About field alone is insufficient.

After the updated recipe is published, open the installed plugin's settings, save **Pet → My own pet** and Force Refresh. If it still shows the author's pet, install a new copy of the updated recipe and add that copy to your playlist. Confirm the new copy progresses independently before removing the old playlist entry. Whether existing installs switch automatically needs verification on hosted TRMNL.

An empty save starts at **Egg · Gen 1** and hatches after five elapsed minutes, visible on the next refresh. Existing valid saves continue unchanged. Do not use **Clear Saved State** to apply this fix: that resets an actual pet and does not address shared recipe screens.

Before considering the rollout verified, test two separate TRMNL accounts with the same **My own pet** selection. Each must start a new life, progress across refreshes and retain its own birth time, seed and cursor in `trmnl.state`; also test an installation made before the update. Local tests cover the field, packaged settings, separate transform inputs and preservation of valid saves, but cannot exercise TRMNL's hosted recipe rendering or installation migration.

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

## Character appearance rates

A simulation of **10,000 complete lives** at [commit `a288353`](https://github.com/taichikuji/trmnl-tamagotchi-plugin/commit/a288353d7c74129507a28acf9389e08d2bc0bf1d) produced the results below. Each life started as a fresh egg and ran until its first death, using the normal automatic caretaker, varied seeds and start times across October 18, 2026 (UTC), and the `Europe/Madrid` time zone.

Each percentage is the share of all 10,000 lives that reached that character at least once. The percentages overlap because a life passes through several characters; a life reaching Bill also counts toward Maskutchi. These are estimates for the sampled conditions, and an existing life follows its saved seed and care history.

| Character | Lives reaching character | Percentage |
| --- | ---: | ---: |
| Egg | 10,000 | 100.00% |
| Babytchi | 10,000 | 100.00% |
| Marutchi | 10,000 | 100.00% |
| Tamatchi | 6,198 | 61.98% |
| Kuchitamatchi | 3,209 | 32.09% |
| Tarakotchi | 2,705 | 27.05% |
| Maskutchi | 2,142 | 21.42% |
| Bill | 1,872 | 18.72% |
| Mametchi | 1,645 | 16.45% |
| TRMY | 1,486 | 14.86% |
| Nyorotchi | 303 | 3.03% |
| Ginjirotchi | 207 | 2.07% |
| Kuchipatchi | 22 | 0.22% |

Every character appeared naturally in this sample. **1,490 lives (14.90%) ended before adulthood.**

## Trademark and artwork notice

TRMNLGotchi is an unofficial fan project. Tamagotchi is a trademark of BANDAI Co., Ltd.; its characters and original artwork belong to BANDAI. This project is not affiliated with, sponsored by, or endorsed by BANDAI or Bandai Namco. The MIT license covers original code and documentation; third-party material retains its own terms. See [LICENSE](../LICENSE) and the [full notice](../README.md#trademark-and-artwork-notice).

TRMY is the TRMNL mascot. Its supplied pixel-art redraws are separate from the original Bandai P1 artwork; adding this fan-made appearance does not imply TRMNL endorsement.

For support, [open a GitHub issue](https://github.com/taichikuji/trmnl-tamagotchi-plugin/issues). Local preview, verification and publishing instructions are in the [development guide](https://github.com/taichikuji/trmnl-tamagotchi-plugin/wiki/Development).
