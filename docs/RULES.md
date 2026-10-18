# P1 rule table and model boundaries

The rule table was checked against the original P1 assembly, not the modern remake. Addresses below refer to the source pinned in [SOURCES.md](SOURCES.md). `TRMNL/fixtures/p1-reference.json` contains independently extracted numerical facts; `scripts/extract-reference.py` can rebuild them from a local copy of that assembly. No firmware is required at runtime.

## Character timers

All countdowns are **awake minutes**, not calendar hours. Hunger/happiness columns are the initial interval between gauge decrements. Adult growth timers activate old-age behavior; they are not fixed death deadlines.

| Character | Wake–sleep | Hunger / happy | Illness countdown | Growth countdown | Discipline interval | Initial discipline |
|---|---|---:|---:|---:|---:|---:|
| Babytchi | Nap after 40 awake minutes, for 5 minutes | 3 / 4 | 45 | 60 | 15, calls suppressed | 0 |
| Marutchi | 09:00–20:00 | 50 / 60 | 990 | 1380 | 6 heart events | 0 |
| Tamatchi | 09:00–21:00 | 75 / 85 | 1656 | 2220 | 6 | 0, or 8 for type 1 |
| Kuchitamatchi | 09:00–21:00 | 75 / 85 | 660 | 1380 | 6 | 0, or 8 for type 1 |
| Mametchi / Bill | 09:00–22:00 | 81 / 91 | 3900 | 4095 | 15 | 15 |
| Ginjirotchi | 09:00–22:00 | 81 / 91 | 2808 | 3120 | 7 | 8 |
| Maskutchi | 11:00–23:00 | 55 / 65 | 2592 | 2880 | 7 | 0 |
| Kuchipatchi | 09:00–22:00 | 60 / 70 | 1170 | 1560 | 15 | 15 |
| Nyorotchi | 09:00–22:00 | 60 / 70 | 360 | 780 | 7 | 8 |
| Tarakotchi | 10:00–22:00 | 45 / 50 | 660 | 1440 | 7 | 0 |

These are decoded from `0x1564–0x15E5`. The original 4-bit hunger/happiness gauges range from 0 to 15: meals/game wins add 4, heart events subtract 4, with clamping. The caretaker fills gauges by repeating meals/games. Medicine increments decode to 1 dose for Mametchi, Ginjirotchi, Maskutchi and Bill; 2 for Babytchi, Marutchi, both teens, Kuchipatchi and Tarakotchi; 3 for Nyorotchi.

## Growth paths

Care (`C`) and discipline (`D`) mistakes accumulate across evolutions and saturate at 15. The following ordered rules come from the seven vectors at `0xD9C–0xDC5`, evaluated at `0x35D–0x36C`. First matching rule wins.

| Current chart | Conditions, worst to best | Result |
|---|---|---|
| Baby | Any | Marutchi |
| Marutchi | C ≥ 3, D ≥ 3 / C ≥ 3 / D ≥ 3 / otherwise | Kuchitamatchi type 2 / Kuchitamatchi type 1 / Tamatchi type 2 / Tamatchi type 1 |
| Tamatchi type 1 | C ≥ 3, D ≥ 4 / C ≥ 3, D ≥ 2 / C ≥ 3 / D ≥ 2 / D ≥ 1 / otherwise | Tarakotchi / Nyorotchi / Kuchipatchi / Maskutchi without Bill / Ginjirotchi / Mametchi |
| Tamatchi type 2 | C ≥ 4, D ≥ 8 / C ≥ 4 / D ≥ 2 / otherwise | Tarakotchi / Nyorotchi / Maskutchi with Bill / Ginjirotchi |
| Kuchitamatchi type 1 | D ≥ 3 / D ≥ 2 / otherwise | Tarakotchi / Nyorotchi / Kuchipatchi |
| Kuchitamatchi type 2 | D ≥ 6 / otherwise | Tarakotchi / Nyorotchi |
| Eligible Maskutchi | Its growth countdown expires | Bill |

The eligible Maskutchi has chart 6, whose sole vector leads to Bill. This resolves the research note's speculation that it may always evolve: the branch does, provided the character survives until the countdown expires. Other adults have terminal chart 15.

## Other verified behavior

| Behavior | Evidence and implementation |
|---|---|
| Hatch | Five minute countdown, `0x1214–1215`, `0xC7B–C80`. Initialization substitutes for the original clock-setting step. |
| Minute ticks | `0xC7A–CD0`: sleep pauses need, illness and growth clocks. During illness the illness counter counts upward, while growth still decreases. |
| Waking and age | `0xF17–F34`: waking advances the original age counter and restores lights. Wake-up itself does not decrement awake countdowns. |
| Care calls | `0xF98–FB6`, `0x31C–328`: attempted drops below zero start/reset attention. Counter 1 reaches 15 after 14 awake minutes; baby starts at 13 and is exempt from counted care mistakes. |
| Sleep mistakes | `0xC8E–C94`, `0xF35–F3C`: leaving lights on reaches 64 sleep minutes, counts one mistake, then saturates. |
| Discipline calls | `0xFB7–FC5`: a decrement-event countdown and a 4-bit phase accumulator determine calls. Adding current discipline + 1 without overflow requests scolding. Scolding adds 4, clamped at 15 (`0xAE1–AE6`). A missed call counts after 14 awake minutes (`0xFCD–FD2`). |
| Poop | First baby countdown 15, subsequent baby 25, others 180 awake minutes; the existing countdown survives evolution (`0x336–341`, initialization `0x781`). Eight uncleared poops trigger illness (`0x342–348`). |
| Illness | Countdown expires → episode count increments; evolution resets episode count (`0xDD4–DD5`). Medicine resets the countdown when cured (`0x610–61B`). Three episodes in one stage cause death, checked before evolution (`0xF5B–F5D`). |
| Extended neglect | Adults/children die at 720 continuously awake minutes with an empty gauge or 352 awake minutes continuously ill (`0xF63–F70`). Baby is excluded from these checks. |
| Adult grace | Adult lethal care counter starts counting only when chart 15's growth countdown has expired (`0xFDF–FE7`). Five such mistakes cause death (`0xF71–F75`). |
| Aging | After the adult countdown expires, each wake subtracts floor(rate / 4) from each need interval (`0xF2A–F49`). Repeated attention resets preserve the original short-interval care-mistake quirk. |
| Evolution counters | Heart/poop clocks and care/discipline mistakes survive transitions. Growth and discipline data reload; illness data reloads unless already ill (`0xDD2–DFF`). |

## Deliberate adaptations and fidelity limits

This package **does not claim full ROM or cycle accuracy**. It verifies and implements the behavior-level rules above. No full emulator or differential ROM playthrough has been run.

- The autonomous caretaker, its probabilities, task queue and response delays are new behavior. Each generation selects one of three profiles with equal probability. Baby care is protected. Meals and games repeat until their corresponding gauge is full; individual game rounds, weight, snacks, menu time and button presses are omitted.
- Profile response probabilities for ordinary care are 99%, 73%, 35%; discipline 99%, 55%, 12%; medicine 100%, 98%, 85%. Delays are 1–4, 1–24, 1–80 minutes, respectively. A later heart/poop/call event can offer another chance after missed care. No evolution result is selected directly.
- The MCU handles several events between minute interrupts. This model processes them in documented priority within a minute and then services automated care. Some simultaneous-event and subminute boundaries may differ by a tick. Countdown progress occurs in integer UTC minutes; start time is rounded down to the minute.
- Infant food and happiness start at the original value 1. The caretaker's first actions happen one minute after hatching. Baby sleep is represented by its awake-minute countdown and five sleeping ticks.
- A new egg automatically follows death after one simulated hour, even when the ROM would require a reset or qualify egg behavior differently. Death can pass unseen during downtime.
- Poses are display illustrations sampled from original character sprite tables, not a reproduction of the ROM animation sequencer. A sleeping pet stays in one position with the original sleep Z; it does not walk. No continuous animation occurs on the device.
- IANA timezone rules govern local sleep. A timezone setting change applies after catching up old elapsed time in the previous saved timezone. If no IANA name exists, UTC is visibly indicated until configured. No historical DST reconstruction is attempted from a lone current UTC offset.
- A single run processes at most 120,000 elapsed minutes, preserving the cursor for later catch-up rather than skipping life events. No unbounded event history is stored.

Keep these limits visible when describing the prototype. Changes to the model require rerunning the branch, replay and timezone checks before replacing the installed Serverless script.
