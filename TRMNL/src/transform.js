// Original P1 pixel paths. Private prototype; Bandai artwork. See docs/SOURCES.md.
// BEGIN P1_SPRITES
const P1_SPRITES = {"egg":["M6 2h1v1h-1zM7 2h1v1h-1zM8 2h1v1h-1zM9 2h1v1h-1zM5 3h1v1h-1zM7 3h1v1h-1zM8 3h1v1h-1zM9 3h1v1h-1zM10 3h1v1h-1zM4 4h1v1h-1zM7 4h1v1h-1zM8 4h1v1h-1zM10 4h1v1h-1zM11 4h1v1h-1zM4 5h1v1h-1zM6 5h1v1h-1zM7 5h1v1h-1zM8 5h1v1h-1zM11 5h1v1h-1zM3 6h1v1h-1zM4 6h1v1h-1zM5 6h1v1h-1zM6 6h1v1h-1zM7 6h1v1h-1zM8 6h1v1h-1zM9 6h1v1h-1zM10 6h1v1h-1zM11 6h1v1h-1zM12 6h1v1h-1zM3 7h1v1h-1zM4 7h1v1h-1zM5 7h1v1h-1zM6 7h1v1h-1zM9 7h1v1h-1zM10 7h1v1h-1zM11 7h1v1h-1zM12 7h1v1h-1zM3 8h1v1h-1zM4 8h1v1h-1zM5 8h1v1h-1zM6 8h1v1h-1zM9 8h1v1h-1zM12 8h1v1h-1zM3 9h1v1h-1zM6 9h1v1h-1zM7 9h1v1h-1zM8 9h1v1h-1zM9 9h1v1h-1zM11 9h1v1h-1zM12 9h1v1h-1zM4 10h1v1h-1zM7 10h1v1h-1zM8 10h1v1h-1zM9 10h1v1h-1zM10 10h1v1h-1zM11 10h1v1h-1zM5 11h1v1h-1zM6 11h1v1h-1zM7 11h1v1h-1zM10 11h1v1h-1zM4 12h1v1h-1zM5 12h1v1h-1zM6 12h1v1h-1zM7 12h1v1h-1zM8 12h1v1h-1zM9 12h1v1h-1zM10 12h1v1h-1zM11 12h1v1h-1z","M7 3h1v1h-1zM8 3h1v1h-1zM5 4h1v1h-1zM6 4h1v1h-1zM7 4h1v1h-1zM8 4h1v1h-1zM9 4h1v1h-1zM10 4h1v1h-1zM4 5h1v1h-1zM6 5h1v1h-1zM7 5h1v1h-1zM8 5h1v1h-1zM9 5h1v1h-1zM11 5h1v1h-1zM3 6h1v1h-1zM6 6h1v1h-1zM7 6h1v1h-1zM8 6h1v1h-1zM9 6h1v1h-1zM12 6h1v1h-1zM2 7h1v1h-1zM3 7h1v1h-1zM5 7h1v1h-1zM6 7h1v1h-1zM7 7h1v1h-1zM8 7h1v1h-1zM9 7h1v1h-1zM10 7h1v1h-1zM11 7h1v1h-1zM12 7h1v1h-1zM13 7h1v1h-1zM2 8h1v1h-1zM3 8h1v1h-1zM4 8h1v1h-1zM5 8h1v1h-1zM6 8h1v1h-1zM9 8h1v1h-1zM10 8h1v1h-1zM11 8h1v1h-1zM12 8h1v1h-1zM13 8h1v1h-1zM2 9h1v1h-1zM5 9h1v1h-1zM6 9h1v1h-1zM9 9h1v1h-1zM10 9h1v1h-1zM11 9h1v1h-1zM12 9h1v1h-1zM13 9h1v1h-1zM3 10h1v1h-1zM6 10h1v1h-1zM7 10h1v1h-1zM8 10h1v1h-1zM9 10h1v1h-1zM12 10h1v1h-1zM4 11h1v1h-1zM5 11h1v1h-1zM6 11h1v1h-1zM7 11h1v1h-1zM8 11h1v1h-1zM9 11h1v1h-1zM11 11h1v1h-1zM3 12h1v1h-1zM4 12h1v1h-1zM5 12h1v1h-1zM6 12h1v1h-1zM7 12h1v1h-1zM8 12h1v1h-1zM9 12h1v1h-1zM10 12h1v1h-1zM11 12h1v1h-1zM12 12h1v1h-1z"],"babytchi":["M6 9h1v1h-1zM7 9h1v1h-1zM8 9h1v1h-1zM9 9h1v1h-1zM5 10h1v1h-1zM7 10h1v1h-1zM8 10h1v1h-1zM10 10h1v1h-1zM5 11h1v1h-1zM6 11h1v1h-1zM7 11h1v1h-1zM8 11h1v1h-1zM9 11h1v1h-1zM10 11h1v1h-1zM5 12h1v1h-1zM6 12h1v1h-1zM9 12h1v1h-1zM10 12h1v1h-1zM5 13h1v1h-1zM6 13h1v1h-1zM7 13h1v1h-1zM8 13h1v1h-1zM9 13h1v1h-1zM10 13h1v1h-1zM6 14h1v1h-1zM7 14h1v1h-1zM8 14h1v1h-1zM9 14h1v1h-1z","M6 8h1v1h-1zM7 8h1v1h-1zM8 8h1v1h-1zM9 8h1v1h-1zM5 9h1v1h-1zM7 9h1v1h-1zM8 9h1v1h-1zM10 9h1v1h-1zM5 10h1v1h-1zM6 10h1v1h-1zM7 10h1v1h-1zM8 10h1v1h-1zM9 10h1v1h-1zM10 10h1v1h-1zM5 11h1v1h-1zM6 11h1v1h-1zM9 11h1v1h-1zM10 11h1v1h-1zM5 12h1v1h-1zM6 12h1v1h-1zM9 12h1v1h-1zM10 12h1v1h-1zM6 13h1v1h-1zM7 13h1v1h-1zM8 13h1v1h-1zM9 13h1v1h-1z"],"marutchi":["M5 3h1v1h-1zM6 3h1v1h-1zM7 3h1v1h-1zM8 3h1v1h-1zM9 3h1v1h-1zM10 3h1v1h-1zM4 4h1v1h-1zM11 4h1v1h-1zM3 5h1v1h-1zM7 5h1v1h-1zM12 5h1v1h-1zM3 6h1v1h-1zM12 6h1v1h-1zM3 7h1v1h-1zM4 7h1v1h-1zM5 7h1v1h-1zM6 7h1v1h-1zM12 7h1v1h-1zM3 8h1v1h-1zM12 8h1v1h-1zM3 9h1v1h-1zM12 9h1v1h-1zM4 10h1v1h-1zM11 10h1v1h-1zM5 11h1v1h-1zM6 11h1v1h-1zM7 11h1v1h-1zM8 11h1v1h-1zM9 11h1v1h-1zM10 11h1v1h-1z","M5 3h1v1h-1zM6 3h1v1h-1zM7 3h1v1h-1zM8 3h1v1h-1zM9 3h1v1h-1zM10 3h1v1h-1zM4 4h1v1h-1zM11 4h1v1h-1zM3 5h1v1h-1zM5 5h1v1h-1zM10 5h1v1h-1zM12 5h1v1h-1zM3 6h1v1h-1zM7 6h1v1h-1zM8 6h1v1h-1zM12 6h1v1h-1zM3 7h1v1h-1zM7 7h1v1h-1zM8 7h1v1h-1zM12 7h1v1h-1zM3 8h1v1h-1zM12 8h1v1h-1zM4 9h1v1h-1zM11 9h1v1h-1zM5 10h1v1h-1zM6 10h1v1h-1zM7 10h1v1h-1zM8 10h1v1h-1zM9 10h1v1h-1zM10 10h1v1h-1z"],"tamatchi":["M5 3h1v1h-1zM6 3h1v1h-1zM7 3h1v1h-1zM8 3h1v1h-1zM9 3h1v1h-1zM10 3h1v1h-1zM4 4h1v1h-1zM11 4h1v1h-1zM3 5h1v1h-1zM7 5h1v1h-1zM12 5h1v1h-1zM3 6h1v1h-1zM12 6h1v1h-1zM3 7h1v1h-1zM4 7h1v1h-1zM5 7h1v1h-1zM6 7h1v1h-1zM12 7h1v1h-1zM3 8h1v1h-1zM12 8h1v1h-1zM3 9h1v1h-1zM12 9h1v1h-1zM4 10h1v1h-1zM11 10h1v1h-1zM4 11h1v1h-1zM5 11h1v1h-1zM6 11h1v1h-1zM7 11h1v1h-1zM8 11h1v1h-1zM11 11h1v1h-1zM4 12h1v1h-1zM6 12h1v1h-1zM9 12h1v1h-1zM11 12h1v1h-1zM5 13h1v1h-1zM10 13h1v1h-1zM11 13h1v1h-1z","M5 3h1v1h-1zM6 3h1v1h-1zM7 3h1v1h-1zM8 3h1v1h-1zM9 3h1v1h-1zM10 3h1v1h-1zM4 4h1v1h-1zM11 4h1v1h-1zM3 5h1v1h-1zM5 5h1v1h-1zM10 5h1v1h-1zM12 5h1v1h-1zM3 6h1v1h-1zM7 6h1v1h-1zM8 6h1v1h-1zM12 6h1v1h-1zM3 7h1v1h-1zM7 7h1v1h-1zM8 7h1v1h-1zM12 7h1v1h-1zM2 8h1v1h-1zM3 8h1v1h-1zM4 8h1v1h-1zM12 8h1v1h-1zM13 8h1v1h-1zM3 9h1v1h-1zM12 9h1v1h-1zM3 10h1v1h-1zM12 10h1v1h-1zM4 11h1v1h-1zM6 11h1v1h-1zM7 11h1v1h-1zM8 11h1v1h-1zM9 11h1v1h-1zM11 11h1v1h-1zM5 12h1v1h-1zM9 12h1v1h-1zM11 12h1v1h-1zM10 13h1v1h-1z"],"kuchitamatchi":["M5 1h1v1h-1zM6 1h1v1h-1zM7 1h1v1h-1zM8 1h1v1h-1zM9 1h1v1h-1zM4 2h1v1h-1zM10 2h1v1h-1zM1 3h1v1h-1zM2 3h1v1h-1zM3 3h1v1h-1zM5 3h1v1h-1zM9 3h1v1h-1zM11 3h1v1h-1zM0 4h1v1h-1zM12 4h1v1h-1zM1 5h1v1h-1zM2 5h1v1h-1zM3 5h1v1h-1zM12 5h1v1h-1zM0 6h1v1h-1zM12 6h1v1h-1zM1 7h1v1h-1zM2 7h1v1h-1zM3 7h1v1h-1zM12 7h1v1h-1zM3 8h1v1h-1zM12 8h1v1h-1zM3 9h1v1h-1zM12 9h1v1h-1zM4 10h1v1h-1zM11 10h1v1h-1zM5 11h1v1h-1zM6 11h1v1h-1zM7 11h1v1h-1zM8 11h1v1h-1zM9 11h1v1h-1zM10 11h1v1h-1z","M1 1h1v1h-1zM4 1h1v1h-1zM5 1h1v1h-1zM6 1h1v1h-1zM7 1h1v1h-1zM8 1h1v1h-1zM9 1h1v1h-1zM0 2h1v1h-1zM2 2h1v1h-1zM3 2h1v1h-1zM5 2h1v1h-1zM10 2h1v1h-1zM0 3h1v1h-1zM8 3h1v1h-1zM11 3h1v1h-1zM1 4h1v1h-1zM2 4h1v1h-1zM3 4h1v1h-1zM12 4h1v1h-1zM0 5h1v1h-1zM12 5h1v1h-1zM0 6h1v1h-1zM2 6h1v1h-1zM3 6h1v1h-1zM12 6h1v1h-1zM1 7h1v1h-1zM3 7h1v1h-1zM12 7h1v1h-1zM3 8h1v1h-1zM12 8h1v1h-1zM4 9h1v1h-1zM11 9h1v1h-1zM5 10h1v1h-1zM6 10h1v1h-1zM7 10h1v1h-1zM8 10h1v1h-1zM9 10h1v1h-1zM10 10h1v1h-1z"],"mametchi":["M5 0h1v1h-1zM11 0h1v1h-1zM4 1h1v1h-1zM5 1h1v1h-1zM6 1h1v1h-1zM10 1h1v1h-1zM11 1h1v1h-1zM12 1h1v1h-1zM4 2h1v1h-1zM5 2h1v1h-1zM6 2h1v1h-1zM7 2h1v1h-1zM8 2h1v1h-1zM9 2h1v1h-1zM10 2h1v1h-1zM11 2h1v1h-1zM12 2h1v1h-1zM4 3h1v1h-1zM11 3h1v1h-1zM12 3h1v1h-1zM3 4h1v1h-1zM5 4h1v1h-1zM9 4h1v1h-1zM12 4h1v1h-1zM13 4h1v1h-1zM2 5h1v1h-1zM13 5h1v1h-1zM2 6h1v1h-1zM5 6h1v1h-1zM6 6h1v1h-1zM13 6h1v1h-1zM3 7h1v1h-1zM13 7h1v1h-1zM3 8h1v1h-1zM8 8h1v1h-1zM10 8h1v1h-1zM13 8h1v1h-1zM3 9h1v1h-1zM8 9h1v1h-1zM10 9h1v1h-1zM13 9h1v1h-1zM3 10h1v1h-1zM9 10h1v1h-1zM13 10h1v1h-1zM4 11h1v1h-1zM12 11h1v1h-1zM5 12h1v1h-1zM7 12h1v1h-1zM8 12h1v1h-1zM9 12h1v1h-1zM11 12h1v1h-1zM5 13h1v1h-1zM7 13h1v1h-1zM9 13h1v1h-1zM11 13h1v1h-1zM6 14h1v1h-1zM10 14h1v1h-1z","M4 0h1v1h-1zM5 0h1v1h-1zM11 0h1v1h-1zM12 0h1v1h-1zM3 1h1v1h-1zM4 1h1v1h-1zM5 1h1v1h-1zM6 1h1v1h-1zM10 1h1v1h-1zM11 1h1v1h-1zM12 1h1v1h-1zM13 1h1v1h-1zM3 2h1v1h-1zM4 2h1v1h-1zM5 2h1v1h-1zM6 2h1v1h-1zM7 2h1v1h-1zM8 2h1v1h-1zM9 2h1v1h-1zM10 2h1v1h-1zM11 2h1v1h-1zM12 2h1v1h-1zM13 2h1v1h-1zM3 3h1v1h-1zM13 3h1v1h-1zM3 4h1v1h-1zM6 4h1v1h-1zM10 4h1v1h-1zM13 4h1v1h-1zM2 5h1v1h-1zM14 5h1v1h-1zM2 6h1v1h-1zM7 6h1v1h-1zM8 6h1v1h-1zM9 6h1v1h-1zM14 6h1v1h-1zM3 7h1v1h-1zM13 7h1v1h-1zM2 8h1v1h-1zM5 8h1v1h-1zM11 8h1v1h-1zM13 8h1v1h-1zM3 9h1v1h-1zM4 9h1v1h-1zM11 9h1v1h-1zM12 9h1v1h-1zM13 9h1v1h-1zM3 10h1v1h-1zM13 10h1v1h-1zM4 11h1v1h-1zM12 11h1v1h-1zM5 12h1v1h-1zM7 12h1v1h-1zM8 12h1v1h-1zM9 12h1v1h-1zM11 12h1v1h-1zM5 13h1v1h-1zM7 13h1v1h-1zM10 13h1v1h-1zM6 14h1v1h-1z"],"ginjirotchi":["M5 1h1v1h-1zM6 1h1v1h-1zM7 1h1v1h-1zM8 1h1v1h-1zM9 1h1v1h-1zM10 1h1v1h-1zM4 2h1v1h-1zM7 2h1v1h-1zM10 2h1v1h-1zM11 2h1v1h-1zM3 3h1v1h-1zM5 3h1v1h-1zM9 3h1v1h-1zM11 3h1v1h-1zM12 3h1v1h-1zM2 4h1v1h-1zM3 4h1v1h-1zM11 4h1v1h-1zM12 4h1v1h-1zM13 4h1v1h-1zM1 5h1v1h-1zM9 5h1v1h-1zM12 5h1v1h-1zM13 5h1v1h-1zM1 6h1v1h-1zM2 6h1v1h-1zM3 6h1v1h-1zM4 6h1v1h-1zM5 6h1v1h-1zM6 6h1v1h-1zM7 6h1v1h-1zM8 6h1v1h-1zM12 6h1v1h-1zM13 6h1v1h-1zM2 7h1v1h-1zM12 7h1v1h-1zM13 7h1v1h-1zM3 8h1v1h-1zM8 8h1v1h-1zM10 8h1v1h-1zM13 8h1v1h-1zM3 9h1v1h-1zM8 9h1v1h-1zM10 9h1v1h-1zM13 9h1v1h-1zM3 10h1v1h-1zM9 10h1v1h-1zM13 10h1v1h-1zM4 11h1v1h-1zM12 11h1v1h-1zM5 12h1v1h-1zM7 12h1v1h-1zM8 12h1v1h-1zM9 12h1v1h-1zM11 12h1v1h-1zM5 13h1v1h-1zM7 13h1v1h-1zM9 13h1v1h-1zM11 13h1v1h-1zM6 14h1v1h-1zM10 14h1v1h-1z","M5 1h1v1h-1zM6 1h1v1h-1zM7 1h1v1h-1zM8 1h1v1h-1zM9 1h1v1h-1zM10 1h1v1h-1zM11 1h1v1h-1zM4 2h1v1h-1zM7 2h1v1h-1zM8 2h1v1h-1zM9 2h1v1h-1zM12 2h1v1h-1zM3 3h1v1h-1zM5 3h1v1h-1zM11 3h1v1h-1zM13 3h1v1h-1zM3 4h1v1h-1zM13 4h1v1h-1zM3 5h1v1h-1zM5 5h1v1h-1zM11 5h1v1h-1zM13 5h1v1h-1zM3 6h1v1h-1zM6 6h1v1h-1zM7 6h1v1h-1zM8 6h1v1h-1zM9 6h1v1h-1zM10 6h1v1h-1zM13 6h1v1h-1zM3 7h1v1h-1zM13 7h1v1h-1zM2 8h1v1h-1zM5 8h1v1h-1zM11 8h1v1h-1zM13 8h1v1h-1zM3 9h1v1h-1zM4 9h1v1h-1zM11 9h1v1h-1zM12 9h1v1h-1zM13 9h1v1h-1zM3 10h1v1h-1zM13 10h1v1h-1zM4 11h1v1h-1zM12 11h1v1h-1zM5 12h1v1h-1zM7 12h1v1h-1zM8 12h1v1h-1zM9 12h1v1h-1zM11 12h1v1h-1zM5 13h1v1h-1zM7 13h1v1h-1zM10 13h1v1h-1zM6 14h1v1h-1z"],"maskutchi":["M8 0h1v1h-1zM9 0h1v1h-1zM10 0h1v1h-1zM11 0h1v1h-1zM4 1h1v1h-1zM5 1h1v1h-1zM6 1h1v1h-1zM7 1h1v1h-1zM8 1h1v1h-1zM9 1h1v1h-1zM10 1h1v1h-1zM11 1h1v1h-1zM3 2h1v1h-1zM4 2h1v1h-1zM5 2h1v1h-1zM6 2h1v1h-1zM7 2h1v1h-1zM8 2h1v1h-1zM9 2h1v1h-1zM10 2h1v1h-1zM11 2h1v1h-1zM12 2h1v1h-1zM2 3h1v1h-1zM3 3h1v1h-1zM4 3h1v1h-1zM5 3h1v1h-1zM6 3h1v1h-1zM7 3h1v1h-1zM8 3h1v1h-1zM9 3h1v1h-1zM10 3h1v1h-1zM11 3h1v1h-1zM12 3h1v1h-1zM13 3h1v1h-1zM2 4h1v1h-1zM5 4h1v1h-1zM6 4h1v1h-1zM7 4h1v1h-1zM8 4h1v1h-1zM9 4h1v1h-1zM10 4h1v1h-1zM11 4h1v1h-1zM12 4h1v1h-1zM13 4h1v1h-1zM2 5h1v1h-1zM3 5h1v1h-1zM5 5h1v1h-1zM9 5h1v1h-1zM10 5h1v1h-1zM11 5h1v1h-1zM12 5h1v1h-1zM13 5h1v1h-1zM1 6h1v1h-1zM2 6h1v1h-1zM5 6h1v1h-1zM12 6h1v1h-1zM13 6h1v1h-1zM1 7h1v1h-1zM2 7h1v1h-1zM3 7h1v1h-1zM4 7h1v1h-1zM13 7h1v1h-1zM3 8h1v1h-1zM14 8h1v1h-1zM3 9h1v1h-1zM14 9h1v1h-1zM4 10h1v1h-1zM13 10h1v1h-1zM5 11h1v1h-1zM12 11h1v1h-1zM14 11h1v1h-1zM15 11h1v1h-1zM3 12h1v1h-1zM4 12h1v1h-1zM6 12h1v1h-1zM7 12h1v1h-1zM8 12h1v1h-1zM9 12h1v1h-1zM10 12h1v1h-1zM11 12h1v1h-1zM15 12h1v1h-1zM2 13h1v1h-1zM14 13h1v1h-1zM1 14h1v1h-1zM2 14h1v1h-1zM3 14h1v1h-1zM13 14h1v1h-1zM14 14h1v1h-1zM15 14h1v1h-1z","M8 0h1v1h-1zM9 0h1v1h-1zM10 0h1v1h-1zM11 0h1v1h-1zM4 1h1v1h-1zM5 1h1v1h-1zM6 1h1v1h-1zM7 1h1v1h-1zM8 1h1v1h-1zM9 1h1v1h-1zM10 1h1v1h-1zM11 1h1v1h-1zM3 2h1v1h-1zM4 2h1v1h-1zM5 2h1v1h-1zM6 2h1v1h-1zM7 2h1v1h-1zM8 2h1v1h-1zM9 2h1v1h-1zM10 2h1v1h-1zM11 2h1v1h-1zM12 2h1v1h-1zM2 3h1v1h-1zM3 3h1v1h-1zM4 3h1v1h-1zM5 3h1v1h-1zM6 3h1v1h-1zM7 3h1v1h-1zM8 3h1v1h-1zM9 3h1v1h-1zM10 3h1v1h-1zM11 3h1v1h-1zM12 3h1v1h-1zM13 3h1v1h-1zM2 4h1v1h-1zM5 4h1v1h-1zM6 4h1v1h-1zM7 4h1v1h-1zM8 4h1v1h-1zM9 4h1v1h-1zM10 4h1v1h-1zM11 4h1v1h-1zM12 4h1v1h-1zM13 4h1v1h-1zM2 5h1v1h-1zM3 5h1v1h-1zM5 5h1v1h-1zM9 5h1v1h-1zM10 5h1v1h-1zM11 5h1v1h-1zM12 5h1v1h-1zM13 5h1v1h-1zM1 6h1v1h-1zM2 6h1v1h-1zM5 6h1v1h-1zM12 6h1v1h-1zM13 6h1v1h-1zM1 7h1v1h-1zM2 7h1v1h-1zM3 7h1v1h-1zM4 7h1v1h-1zM13 7h1v1h-1zM2 8h1v1h-1zM13 8h1v1h-1zM3 9h1v1h-1zM4 9h1v1h-1zM11 9h1v1h-1zM12 9h1v1h-1zM2 10h1v1h-1zM5 10h1v1h-1zM6 10h1v1h-1zM7 10h1v1h-1zM8 10h1v1h-1zM9 10h1v1h-1zM10 10h1v1h-1zM12 10h1v1h-1zM2 11h1v1h-1zM12 11h1v1h-1zM3 12h1v1h-1zM13 12h1v1h-1zM4 13h1v1h-1zM13 13h1v1h-1zM3 14h1v1h-1zM4 14h1v1h-1zM5 14h1v1h-1zM12 14h1v1h-1zM13 14h1v1h-1zM14 14h1v1h-1z"],"kuchipatchi":["M5 1h1v1h-1zM6 1h1v1h-1zM7 1h1v1h-1zM8 1h1v1h-1zM9 1h1v1h-1zM4 2h1v1h-1zM10 2h1v1h-1zM1 3h1v1h-1zM2 3h1v1h-1zM3 3h1v1h-1zM5 3h1v1h-1zM9 3h1v1h-1zM11 3h1v1h-1zM0 4h1v1h-1zM12 4h1v1h-1zM1 5h1v1h-1zM2 5h1v1h-1zM3 5h1v1h-1zM12 5h1v1h-1zM0 6h1v1h-1zM12 6h1v1h-1zM1 7h1v1h-1zM2 7h1v1h-1zM3 7h1v1h-1zM12 7h1v1h-1zM3 8h1v1h-1zM8 8h1v1h-1zM10 8h1v1h-1zM13 8h1v1h-1zM3 9h1v1h-1zM8 9h1v1h-1zM10 9h1v1h-1zM13 9h1v1h-1zM3 10h1v1h-1zM9 10h1v1h-1zM13 10h1v1h-1zM4 11h1v1h-1zM12 11h1v1h-1zM5 12h1v1h-1zM7 12h1v1h-1zM8 12h1v1h-1zM9 12h1v1h-1zM11 12h1v1h-1zM5 13h1v1h-1zM7 13h1v1h-1zM9 13h1v1h-1zM11 13h1v1h-1zM6 14h1v1h-1zM10 14h1v1h-1z","M1 1h1v1h-1zM4 1h1v1h-1zM5 1h1v1h-1zM6 1h1v1h-1zM7 1h1v1h-1zM8 1h1v1h-1zM9 1h1v1h-1zM0 2h1v1h-1zM2 2h1v1h-1zM3 2h1v1h-1zM5 2h1v1h-1zM10 2h1v1h-1zM0 3h1v1h-1zM8 3h1v1h-1zM11 3h1v1h-1zM1 4h1v1h-1zM2 4h1v1h-1zM3 4h1v1h-1zM12 4h1v1h-1zM0 5h1v1h-1zM12 5h1v1h-1zM0 6h1v1h-1zM2 6h1v1h-1zM3 6h1v1h-1zM12 6h1v1h-1zM1 7h1v1h-1zM3 7h1v1h-1zM12 7h1v1h-1zM3 8h1v1h-1zM8 8h1v1h-1zM10 8h1v1h-1zM13 8h1v1h-1zM3 9h1v1h-1zM9 9h1v1h-1zM13 9h1v1h-1zM3 10h1v1h-1zM13 10h1v1h-1zM3 11h1v1h-1zM12 11h1v1h-1zM4 12h1v1h-1zM6 12h1v1h-1zM7 12h1v1h-1zM9 12h1v1h-1zM10 12h1v1h-1zM11 12h1v1h-1zM4 13h1v1h-1zM6 13h1v1h-1zM7 13h1v1h-1zM9 13h1v1h-1zM5 14h1v1h-1zM8 14h1v1h-1z"],"nyorotchi":["M5 1h1v1h-1zM6 1h1v1h-1zM7 1h1v1h-1zM8 1h1v1h-1zM9 1h1v1h-1zM4 2h1v1h-1zM10 2h1v1h-1zM1 3h1v1h-1zM2 3h1v1h-1zM3 3h1v1h-1zM5 3h1v1h-1zM9 3h1v1h-1zM11 3h1v1h-1zM0 4h1v1h-1zM12 4h1v1h-1zM1 5h1v1h-1zM2 5h1v1h-1zM3 5h1v1h-1zM12 5h1v1h-1zM0 6h1v1h-1zM12 6h1v1h-1zM1 7h1v1h-1zM2 7h1v1h-1zM3 7h1v1h-1zM12 7h1v1h-1zM3 8h1v1h-1zM12 8h1v1h-1zM4 9h1v1h-1zM11 9h1v1h-1zM5 10h1v1h-1zM6 10h1v1h-1zM7 10h1v1h-1zM8 10h1v1h-1zM9 10h1v1h-1zM10 10h1v1h-1zM7 11h1v1h-1zM8 11h1v1h-1zM7 12h1v1h-1zM8 12h1v1h-1zM12 12h1v1h-1zM8 13h1v1h-1zM9 13h1v1h-1zM11 13h1v1h-1zM13 13h1v1h-1zM15 13h1v1h-1zM9 14h1v1h-1zM10 14h1v1h-1zM11 14h1v1h-1zM14 14h1v1h-1z","M5 1h1v1h-1zM6 1h1v1h-1zM7 1h1v1h-1zM8 1h1v1h-1zM9 1h1v1h-1zM4 2h1v1h-1zM10 2h1v1h-1zM1 3h1v1h-1zM2 3h1v1h-1zM3 3h1v1h-1zM5 3h1v1h-1zM9 3h1v1h-1zM11 3h1v1h-1zM0 4h1v1h-1zM12 4h1v1h-1zM1 5h1v1h-1zM2 5h1v1h-1zM3 5h1v1h-1zM12 5h1v1h-1zM0 6h1v1h-1zM12 6h1v1h-1zM1 7h1v1h-1zM2 7h1v1h-1zM3 7h1v1h-1zM12 7h1v1h-1zM3 8h1v1h-1zM12 8h1v1h-1zM4 9h1v1h-1zM11 9h1v1h-1zM5 10h1v1h-1zM6 10h1v1h-1zM7 10h1v1h-1zM8 10h1v1h-1zM9 10h1v1h-1zM10 10h1v1h-1zM7 11h1v1h-1zM8 11h1v1h-1zM6 12h1v1h-1zM7 12h1v1h-1zM13 12h1v1h-1zM5 13h1v1h-1zM6 13h1v1h-1zM9 13h1v1h-1zM10 13h1v1h-1zM13 13h1v1h-1zM6 14h1v1h-1zM7 14h1v1h-1zM8 14h1v1h-1zM11 14h1v1h-1zM12 14h1v1h-1z"],"tarakotchi":["M5 0h1v1h-1zM6 0h1v1h-1zM7 0h1v1h-1zM8 0h1v1h-1zM9 0h1v1h-1zM10 0h1v1h-1zM11 0h1v1h-1zM4 1h1v1h-1zM10 1h1v1h-1zM11 1h1v1h-1zM12 1h1v1h-1zM3 2h1v1h-1zM6 2h1v1h-1zM9 2h1v1h-1zM11 2h1v1h-1zM12 2h1v1h-1zM13 2h1v1h-1zM1 3h1v1h-1zM2 3h1v1h-1zM3 3h1v1h-1zM4 3h1v1h-1zM5 3h1v1h-1zM6 3h1v1h-1zM7 3h1v1h-1zM12 3h1v1h-1zM13 3h1v1h-1zM1 4h1v1h-1zM7 4h1v1h-1zM13 4h1v1h-1zM1 5h1v1h-1zM2 5h1v1h-1zM3 5h1v1h-1zM4 5h1v1h-1zM5 5h1v1h-1zM6 5h1v1h-1zM7 5h1v1h-1zM13 5h1v1h-1zM1 6h1v1h-1zM6 6h1v1h-1zM13 6h1v1h-1zM1 7h1v1h-1zM2 7h1v1h-1zM3 7h1v1h-1zM4 7h1v1h-1zM5 7h1v1h-1zM6 7h1v1h-1zM13 7h1v1h-1zM1 8h1v1h-1zM12 8h1v1h-1zM1 9h1v1h-1zM12 9h1v1h-1zM2 10h1v1h-1zM11 10h1v1h-1zM0 11h1v1h-1zM1 11h1v1h-1zM3 11h1v1h-1zM10 11h1v1h-1zM0 12h1v1h-1zM4 12h1v1h-1zM5 12h1v1h-1zM6 12h1v1h-1zM7 12h1v1h-1zM8 12h1v1h-1zM9 12h1v1h-1zM11 12h1v1h-1zM12 12h1v1h-1zM1 13h1v1h-1zM13 13h1v1h-1zM0 14h1v1h-1zM1 14h1v1h-1zM2 14h1v1h-1zM12 14h1v1h-1zM13 14h1v1h-1zM14 14h1v1h-1z","M5 0h1v1h-1zM6 0h1v1h-1zM7 0h1v1h-1zM8 0h1v1h-1zM9 0h1v1h-1zM10 0h1v1h-1zM11 0h1v1h-1zM4 1h1v1h-1zM10 1h1v1h-1zM11 1h1v1h-1zM12 1h1v1h-1zM3 2h1v1h-1zM6 2h1v1h-1zM9 2h1v1h-1zM11 2h1v1h-1zM12 2h1v1h-1zM13 2h1v1h-1zM1 3h1v1h-1zM2 3h1v1h-1zM3 3h1v1h-1zM4 3h1v1h-1zM5 3h1v1h-1zM6 3h1v1h-1zM7 3h1v1h-1zM12 3h1v1h-1zM13 3h1v1h-1zM1 4h1v1h-1zM7 4h1v1h-1zM13 4h1v1h-1zM1 5h1v1h-1zM2 5h1v1h-1zM3 5h1v1h-1zM4 5h1v1h-1zM5 5h1v1h-1zM6 5h1v1h-1zM7 5h1v1h-1zM13 5h1v1h-1zM1 6h1v1h-1zM6 6h1v1h-1zM13 6h1v1h-1zM1 7h1v1h-1zM2 7h1v1h-1zM3 7h1v1h-1zM4 7h1v1h-1zM5 7h1v1h-1zM6 7h1v1h-1zM13 7h1v1h-1zM3 8h1v1h-1zM14 8h1v1h-1zM3 9h1v1h-1zM14 9h1v1h-1zM4 10h1v1h-1zM13 10h1v1h-1zM5 11h1v1h-1zM12 11h1v1h-1zM14 11h1v1h-1zM15 11h1v1h-1zM3 12h1v1h-1zM4 12h1v1h-1zM6 12h1v1h-1zM7 12h1v1h-1zM8 12h1v1h-1zM9 12h1v1h-1zM10 12h1v1h-1zM11 12h1v1h-1zM15 12h1v1h-1zM2 13h1v1h-1zM14 13h1v1h-1zM1 14h1v1h-1zM2 14h1v1h-1zM3 14h1v1h-1zM13 14h1v1h-1zM14 14h1v1h-1zM15 14h1v1h-1z"],"bill":["M3 0h1v1h-1zM4 0h1v1h-1zM5 0h1v1h-1zM6 0h1v1h-1zM7 0h1v1h-1zM8 0h1v1h-1zM9 0h1v1h-1zM10 0h1v1h-1zM11 0h1v1h-1zM2 1h1v1h-1zM12 1h1v1h-1zM13 1h1v1h-1zM2 2h1v1h-1zM4 2h1v1h-1zM5 2h1v1h-1zM6 2h1v1h-1zM7 2h1v1h-1zM8 2h1v1h-1zM9 2h1v1h-1zM10 2h1v1h-1zM14 2h1v1h-1zM3 3h1v1h-1zM11 3h1v1h-1zM14 3h1v1h-1zM3 4h1v1h-1zM5 4h1v1h-1zM11 4h1v1h-1zM12 4h1v1h-1zM13 4h1v1h-1zM2 5h1v1h-1zM3 5h1v1h-1zM4 5h1v1h-1zM5 5h1v1h-1zM6 5h1v1h-1zM9 5h1v1h-1zM14 5h1v1h-1zM1 6h1v1h-1zM14 6h1v1h-1zM1 7h1v1h-1zM2 7h1v1h-1zM3 7h1v1h-1zM4 7h1v1h-1zM13 7h1v1h-1zM2 8h1v1h-1zM13 8h1v1h-1zM2 9h1v1h-1zM4 9h1v1h-1zM5 9h1v1h-1zM6 9h1v1h-1zM7 9h1v1h-1zM8 9h1v1h-1zM9 9h1v1h-1zM13 9h1v1h-1zM3 10h1v1h-1zM4 10h1v1h-1zM12 10h1v1h-1zM2 11h1v1h-1zM4 11h1v1h-1zM6 11h1v1h-1zM10 11h1v1h-1zM11 11h1v1h-1zM13 11h1v1h-1zM1 12h1v1h-1zM5 12h1v1h-1zM6 12h1v1h-1zM7 12h1v1h-1zM8 12h1v1h-1zM9 12h1v1h-1zM10 12h1v1h-1zM14 12h1v1h-1zM2 13h1v1h-1zM13 13h1v1h-1zM1 14h1v1h-1zM2 14h1v1h-1zM3 14h1v1h-1zM12 14h1v1h-1zM13 14h1v1h-1zM14 14h1v1h-1z","M3 1h1v1h-1zM4 1h1v1h-1zM5 1h1v1h-1zM6 1h1v1h-1zM7 1h1v1h-1zM8 1h1v1h-1zM9 1h1v1h-1zM10 1h1v1h-1zM11 1h1v1h-1zM2 2h1v1h-1zM12 2h1v1h-1zM13 2h1v1h-1zM2 3h1v1h-1zM5 3h1v1h-1zM6 3h1v1h-1zM7 3h1v1h-1zM8 3h1v1h-1zM9 3h1v1h-1zM10 3h1v1h-1zM14 3h1v1h-1zM2 4h1v1h-1zM4 4h1v1h-1zM7 4h1v1h-1zM11 4h1v1h-1zM14 4h1v1h-1zM3 5h1v1h-1zM8 5h1v1h-1zM9 5h1v1h-1zM10 5h1v1h-1zM12 5h1v1h-1zM13 5h1v1h-1zM3 6h1v1h-1zM14 6h1v1h-1zM2 7h1v1h-1zM3 7h1v1h-1zM4 7h1v1h-1zM5 7h1v1h-1zM6 7h1v1h-1zM9 7h1v1h-1zM10 7h1v1h-1zM14 7h1v1h-1zM1 8h1v1h-1zM13 8h1v1h-1zM1 9h1v1h-1zM2 9h1v1h-1zM3 9h1v1h-1zM4 9h1v1h-1zM13 9h1v1h-1zM2 10h1v1h-1zM13 10h1v1h-1zM2 11h1v1h-1zM4 11h1v1h-1zM5 11h1v1h-1zM6 11h1v1h-1zM7 11h1v1h-1zM8 11h1v1h-1zM13 11h1v1h-1zM1 12h1v1h-1zM3 12h1v1h-1zM4 12h1v1h-1zM9 12h1v1h-1zM12 12h1v1h-1zM14 12h1v1h-1zM2 13h1v1h-1zM4 13h1v1h-1zM6 13h1v1h-1zM10 13h1v1h-1zM11 13h1v1h-1zM13 13h1v1h-1zM1 14h1v1h-1zM2 14h1v1h-1zM3 14h1v1h-1zM4 14h1v1h-1zM5 14h1v1h-1zM6 14h1v1h-1zM7 14h1v1h-1zM8 14h1v1h-1zM9 14h1v1h-1zM10 14h1v1h-1zM11 14h1v1h-1zM12 14h1v1h-1zM13 14h1v1h-1zM14 14h1v1h-1z"],"dead":["M5 1h1v1h-1zM6 1h1v1h-1zM7 1h1v1h-1zM4 2h1v1h-1zM5 2h1v1h-1zM6 2h1v1h-1zM7 2h1v1h-1zM8 2h1v1h-1zM3 3h1v1h-1zM5 3h1v1h-1zM9 3h1v1h-1zM2 4h1v1h-1zM6 4h1v1h-1zM10 4h1v1h-1zM2 5h1v1h-1zM4 5h1v1h-1zM8 5h1v1h-1zM10 5h1v1h-1zM1 6h1v1h-1zM2 6h1v1h-1zM10 6h1v1h-1zM11 6h1v1h-1zM12 6h1v1h-1zM0 7h1v1h-1zM2 7h1v1h-1zM5 7h1v1h-1zM6 7h1v1h-1zM10 7h1v1h-1zM13 7h1v1h-1zM0 8h1v1h-1zM3 8h1v1h-1zM9 8h1v1h-1zM13 8h1v1h-1zM0 9h1v1h-1zM4 9h1v1h-1zM5 9h1v1h-1zM6 9h1v1h-1zM7 9h1v1h-1zM8 9h1v1h-1zM13 9h1v1h-1zM0 10h1v1h-1zM2 10h1v1h-1zM3 10h1v1h-1zM4 10h1v1h-1zM9 10h1v1h-1zM10 10h1v1h-1zM11 10h1v1h-1zM13 10h1v1h-1zM1 11h1v1h-1zM4 11h1v1h-1zM10 11h1v1h-1zM12 11h1v1h-1zM5 12h1v1h-1zM9 12h1v1h-1zM10 12h1v1h-1zM6 13h1v1h-1zM7 13h1v1h-1zM8 13h1v1h-1zM10 13h1v1h-1zM8 14h1v1h-1z","M5 1h1v1h-1zM6 1h1v1h-1zM7 1h1v1h-1zM4 2h1v1h-1zM5 2h1v1h-1zM6 2h1v1h-1zM7 2h1v1h-1zM8 2h1v1h-1zM3 3h1v1h-1zM5 3h1v1h-1zM9 3h1v1h-1zM2 4h1v1h-1zM6 4h1v1h-1zM10 4h1v1h-1zM2 5h1v1h-1zM4 5h1v1h-1zM8 5h1v1h-1zM10 5h1v1h-1zM1 6h1v1h-1zM2 6h1v1h-1zM10 6h1v1h-1zM11 6h1v1h-1zM12 6h1v1h-1zM0 7h1v1h-1zM2 7h1v1h-1zM5 7h1v1h-1zM6 7h1v1h-1zM10 7h1v1h-1zM13 7h1v1h-1zM0 8h1v1h-1zM3 8h1v1h-1zM9 8h1v1h-1zM13 8h1v1h-1zM0 9h1v1h-1zM4 9h1v1h-1zM5 9h1v1h-1zM6 9h1v1h-1zM7 9h1v1h-1zM8 9h1v1h-1zM13 9h1v1h-1zM0 10h1v1h-1zM2 10h1v1h-1zM3 10h1v1h-1zM4 10h1v1h-1zM9 10h1v1h-1zM10 10h1v1h-1zM11 10h1v1h-1zM13 10h1v1h-1zM1 11h1v1h-1zM4 11h1v1h-1zM10 11h1v1h-1zM12 11h1v1h-1zM5 12h1v1h-1zM9 12h1v1h-1zM10 12h1v1h-1zM6 13h1v1h-1zM7 13h1v1h-1zM8 13h1v1h-1zM10 13h1v1h-1zM8 14h1v1h-1z"],"sleep":"M1 2h1v1h-1zM2 2h1v1h-1zM3 2h1v1h-1zM4 2h1v1h-1zM4 3h1v1h-1zM3 4h1v1h-1zM2 5h1v1h-1zM1 6h1v1h-1zM1 7h1v1h-1zM2 7h1v1h-1zM3 7h1v1h-1zM4 7h1v1h-1z"};
// END P1_SPRITES

// Autonomous P1 model. Timings are minutes, gauges are original 4-bit values.
// See docs/RULES.md for assembly addresses, limits and deliberate adaptations.
const P1_NAMES = ['egg', 'babytchi', 'marutchi', 'tamatchi', 'kuchitamatchi', 'mametchi',
  'ginjirotchi', 'maskutchi', 'kuchipatchi', 'nyorotchi', 'tarakotchi', 'bill'];
// wake, sleep, hunger, happiness, illness, growth, discipline-call interval, initial discipline, medicine increment
const P1_STATS = [null,
  [255,255,3,4,45,60,15,0,12], [9,20,50,60,990,1380,6,0,12],
  [9,21,75,85,1656,2220,6,0,12], [9,21,75,85,660,1380,6,0,12],
  [9,22,81,91,3900,4095,15,15,8], [9,22,81,91,2808,3120,7,8,8],
  [11,23,55,65,2592,2880,7,0,8], [9,22,60,70,1170,1560,15,15,12],
  [9,22,60,70,360,780,7,8,13], [10,22,45,50,660,1440,7,0,12],
  [9,22,81,91,3900,4095,15,15,8]];
// Ordered worst to best: minimum care mistakes, minimum discipline mistakes, next chart, character.
const P1_CHARTS = [
  [[0,0,1,2]],
  [[3,3,5,4],[3,0,4,4],[0,3,3,3],[0,0,2,3]],
  [[3,4,15,10],[3,2,15,9],[3,0,15,8],[0,2,15,7],[0,1,15,6],[0,0,15,5]],
  [[4,8,15,10],[4,0,15,9],[0,2,6,7],[0,0,15,6]],
  [[0,3,15,10],[0,2,15,9],[0,0,15,8]], [[0,6,15,10],[0,0,15,9]], [[0,0,15,11]]];
const P1_PROFILES = ['Attentive', 'Inconsistent', 'Neglectful'];
const P1_TASKS = ['feed', 'play', 'medicine', 'clean', 'lights', 'discipline'];
const P1_MAX_TICKS = 120000; // ponytail: ~83 days per run; retained cursor catches up larger gaps on later refreshes.

function hashSeed(text) {
  let hash = 2166136261;
  for (const char of String(text)) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  return hash >>> 0;
}
function random(s) {
  // Mulberry32. Only simulated decisions consume this saved stream.
  s.rng = (s.rng + 0x6D2B79F5) >>> 0;
  let n = s.rng;
  n = Math.imul(n ^ n >>> 15, n | 1);
  n ^= n + Math.imul(n ^ n >>> 7, n | 61);
  return ((n ^ n >>> 14) >>> 0) / 4294967296;
}
function remember(s, text) {
  s.recent.push({ at: s.cursor, text });
  if (s.recent.length > 5) s.recent.shift();
}
function newLife(seed, now, timezone, generation = 1) {
  const s = { version: 1, seed: seed >>> 0, rng: seed >>> 0, generation,
    timezone, born: now, cursor: now, character: 0, chart: 0, profile: 0,
    hunger: 1, happiness: 1, discipline: 0, care: 0, missed_discipline: 0,
    adult_care: 0, sick: false, sick_count: 0, sleeping: false, lights: true,
    poop: 0, age: 0, hunger_rate: 3, happy_rate: 4,
    timers: { hatch: 5, hunger: 0, happy: 2, illness: 45, growth: 60,
      poop: 15, discipline: 15, attention: 0, scold: 0, lights: 0,
      neglect: 0, nap_start: 40, nap: 5 }, due: {}, dead_at: null,
    activity: 'Hatching soon', activity_until: now, recent: [] };
  s.profile = Math.floor(random(s) * 3);
  remember(s, 'A new egg');
  return s;
}
function chooseEvolution(chart, care, discipline) {
  const row = P1_CHARTS[chart]?.find(([c, d]) => care >= c && discipline >= d);
  if (!row) throw new Error('Invalid P1 growth chart');
  return { chart: row[2], character: row[3] };
}
function evolve(s) {
  const next = chooseEvolution(s.chart, s.care, s.missed_discipline);
  s.character = next.character; s.chart = next.chart;
  const data = P1_STATS[s.character];
  s.sick_count = 0;
  s.timers.growth = data[5];
  if (!s.sick) s.timers.illness = data[4];
  s.hunger_rate = data[2]; s.happy_rate = data[3];
  s.timers.discipline = data[6];
  s.discipline = [2, 4].includes(s.chart) ? 8 : data[7];
  // Heart and poop countdowns, mistakes and outstanding calls survive evolution.
  remember(s, `Grew into ${P1_NAMES[s.character]}`);
}
function die(s, cause) {
  s.dead_at = s.cursor; s.due = {}; s.sleeping = false;
  s.activity = cause; s.activity_until = s.cursor + 60;
  remember(s, cause);
}
function careMistake(s) {
  s.care = Math.min(15, s.care + 1);
  // Adult mistakes become lethal only after the adult growth countdown expires (0xFDF–FE7).
  if (s.chart === 15 && s.timers.growth === 0) s.adult_care = Math.min(15, s.adult_care + 1);
}
function requestCare(s, task) {
  if (s.due[task] !== undefined) return;
  const baby = s.character === 1;
  const chance = task === 'medicine' ? [1, .98, .85] :
    task === 'discipline' ? [.99, .55, .12] : [ .99, .73, .35 ];
  const answered = random(s) < (baby ? 1 : chance[s.profile]);
  const delay = 1 + Math.floor(random(s) * (baby ? 1 : [4, 24, 80][s.profile]));
  if (answered) s.due[task] = s.cursor + delay;
}
function serviceCare(s) {
  // Medicine/scolding first: the original refuses meals during sickness or a discipline call.
  for (const task of ['medicine', 'discipline', 'clean', 'lights', 'feed', 'play']) {
    if (s.due[task] === undefined || s.due[task] > s.cursor) continue;
    if (s.sleeping && task !== 'lights') continue;
    if (['feed', 'play'].includes(task) && (s.sick || s.timers.scold)) continue;
    delete s.due[task];
    if (task === 'medicine') {
      if (!s.sick) continue;
      // Caretaker gives all required doses; dose count follows character medicine nibble.
      let value = 15;
      do { value = ((value | 8) + P1_STATS[s.character][8]) & 15; } while (value & 8);
      s.sick = false; s.timers.illness = P1_STATS[s.character][4];
      s.activity = 'Feeling better';
    } else if (task === 'discipline') {
      if (!s.timers.scold) continue;
      s.timers.scold = 0; s.discipline = Math.min(15, s.discipline + 4);
      s.activity = 'Learning manners';
    } else if (task === 'clean') {
      if (!s.poop) continue;
      s.poop = 0; s.activity = 'Fresh and clean';
    } else if (task === 'lights') {
      if (!s.sleeping) continue;
      s.lights = false; s.timers.lights = 255;
      continue;
    } else {
      s[task === 'feed' ? 'hunger' : 'happiness'] = 15;
      s.activity = task === 'feed' ? 'Having a meal' : 'Playing a game';
      if (s.hunger && s.happiness) { s.timers.attention = 0; s.timers.neglect = 0; }
    }
    s.activity_until = s.cursor + 4;
  }
}
function heartDrop(s, key, rate) {
  s.timers[key] = rate;
  const gauge = key === 'hunger' ? 'hunger' : 'happiness';
  const old = s[gauge];
  s[gauge] = Math.max(0, old - 4);
  if (old < 4) {
    // Repeated calls reset this timer, including the original sub-15-minute old-age quirk.
    s.timers.attention = s.character === 1 ? 13 : 1;
  } else {
    s.timers.discipline = Math.max(0, s.timers.discipline - 1);
  }
  requestCare(s, key === 'hunger' ? 'feed' : 'play');
}
function startSleep(s) {
  s.sleeping = true; s.lights = true; s.timers.lights = s.character === 1 ? 61 : 0;
  remember(s, 'Went to sleep'); requestCare(s, 'lights');
}
function minuteTick(s, localMinute) {
  const t = s.timers;
  if (s.character === 0) {
    if (--t.hatch === 0) {
      s.character = 1; remember(s, 'Babytchi hatched');
      requestCare(s, 'feed'); requestCare(s, 'play');
    }
    return;
  }
  const data = P1_STATS[s.character];
  const baby = s.character === 1;
  const shouldSleep = baby ? t.nap_start === 0 && t.nap > 0 :
    localMinute >= data[1] * 60 || localMinute < data[0] * 60;
  if (s.sleeping) {
    if (baby) t.nap = Math.max(0, t.nap - 1);
    else t.lights = Math.min(255, t.lights + 1);
    if ((baby && t.nap === 0) || (!baby && !shouldSleep)) {
      s.sleeping = false; s.lights = true; s.age = Math.min(99, s.age + 1);
      delete s.due.lights;
      if (s.chart === 15 && t.growth === 0) {
        s.hunger_rate -= Math.floor(s.hunger_rate / 4);
        s.happy_rate -= Math.floor(s.happy_rate / 4);
      }
      remember(s, 'Woke up');
    } else if (s.lights && t.lights >= 64 && t.lights !== 255) {
      careMistake(s); t.lights = 255;
    }
    serviceCare(s);
    return;
  }
  // Minute interrupt 0xC96–CD0. Growth advances while ill, pauses while asleep.
  if (baby && t.nap_start) t.nap_start--;
  for (const key of ['hunger', 'happy', 'growth', 'poop']) t[key] = Math.max(0, t[key] - 1);
  if (t.attention) t.attention = Math.min(15, t.attention + 1);
  if (t.scold) t.scold = Math.min(15, t.scold + 1);
  t.neglect = !s.hunger || !s.happiness ? t.neglect + 1 : 0;
  t.illness = s.sick ? t.illness + 1 : Math.max(0, t.illness - 1);
  if (shouldSleep || (baby && t.nap_start === 0 && t.nap > 0)) {
    startSleep(s); serviceCare(s); return;
  }
  // Original event priority: death, evolution, poop, illness, hearts, discipline, missed calls.
  if (s.sick_count >= 3 || (!baby && (t.neglect >= 720 || (s.sick && t.illness >= 352))) || s.adult_care >= 5) {
    die(s, s.sick_count >= 3 ? 'Three illnesses in one stage' : s.adult_care >= 5 ? 'Reached the end of this life' : 'Care was missed');
    return;
  }
  if (t.growth === 0 && s.chart !== 15) evolve(s);
  if (t.poop === 0) {
    t.poop = baby ? 25 : 180;
    s.poop = Math.min(8, s.poop + 1);
    if (s.poop >= 8 && !s.sick) t.illness = 0;
    requestCare(s, 'clean');
  }
  if (!s.sick && t.illness === 0) {
    s.sick = true; s.sick_count++;
    remember(s, 'Feeling unwell'); requestCare(s, 'medicine');
    // Original main loop immediately checks death again after registering sickness.
    if (s.sick_count >= 3) { die(s, 'Three illnesses in one stage'); return; }
  }
  if (t.hunger === 0) heartDrop(s, 'hunger', s.hunger_rate);
  if (t.happy === 0) heartDrop(s, 'happy', s.happy_rate);
  if (t.discipline === 0) {
    t.discipline = P1_STATS[s.character][6];
    s.discipline_phase = (s.discipline_phase || 0) + s.discipline + 1;
    const call = s.discipline_phase < 16;
    s.discipline_phase &= 15;
    if (call && !baby) { t.scold = 1; requestCare(s, 'discipline'); }
  }
  if (t.attention === 15) { t.attention = 0; if (!baby) careMistake(s); }
  if (t.scold === 15) { t.scold = 0; s.missed_discipline = Math.min(15, s.missed_discipline + 1); }
  serviceCare(s);
}
function validateState(s) {
  if (!s || s.version !== 1) throw new Error('Unsupported saved state. Export it before using Clear Saved State.');
  const integer = (v, min, max) => Number.isSafeInteger(v) && v >= min && v <= max;
  const bounds = { seed: [0,4294967295], rng: [0,4294967295], generation: [1,1e9],
    born: [0,1e10], cursor: [0,1e10], character: [0,11], chart: [0,15], profile: [0,2],
    hunger: [0,15], happiness: [0,15], discipline: [0,15], care: [0,15], missed_discipline: [0,15],
    adult_care: [0,15], sick_count: [0,3], poop: [0,8], age: [0,99], hunger_rate: [3,255], happy_rate: [3,255], activity_until: [0,1e10] };
  for (const [key, [min, max]] of Object.entries(bounds)) {
    if (!integer(s[key], min, max)) throw new Error(`Invalid saved state: ${key}`);
  }
  if (s.cursor < s.born || ![0,1,2,3,4,5,6,15].includes(s.chart) ||
      typeof s.timezone !== 'string' || typeof s.activity !== 'string' ||
      !['sick','sleeping','lights'].every(k => typeof s[k] === 'boolean') ||
      !(s.dead_at === null || integer(s.dead_at, s.born, s.cursor)) ||
      !Array.isArray(s.recent) || s.recent.length > 5 ||
      !s.recent.every(e => e && integer(e.at, s.born, s.cursor) && typeof e.text === 'string')) {
    throw new Error('Invalid saved lifecycle');
  }
  for (const key of Object.keys(newLife(0, 0, 'UTC').timers)) {
    if (!integer(s.timers?.[key], 0, 1e7)) throw new Error(`Invalid timer: ${key}`);
  }
  if (!s.due || Array.isArray(s.due) || Object.entries(s.due).some(([k,v]) => !P1_TASKS.includes(k) || !integer(v, s.born, 1e10))) {
    throw new Error('Invalid pending care');
  }
  if (s.timezone_fallback !== undefined && typeof s.timezone_fallback !== 'boolean') throw new Error('Invalid timezone fallback');
  if (s.discipline_phase !== undefined && !integer(s.discipline_phase, 0, 15)) throw new Error('Invalid discipline phase');
}
function localClock(timezone) {
  const formatter = new Intl.DateTimeFormat('en-GB', { timeZone: timezone, hourCycle: 'h23', hour: '2-digit', minute: '2-digit' });
  let lastHour = NaN, offset = 0, transition = false;
  function offsetAt(minute) {
    const text = formatter.format(new Date(minute * 60000));
    return Number(text.slice(0, 2)) * 60 + Number(text.slice(3, 5)) - minute % 1440;
  }
  return minute => {
    const hour = Math.floor(minute / 60);
    if (hour !== lastHour) {
      offset = offsetAt(hour * 60);
      transition = offsetAt(hour * 60 + 59) !== offset;
      lastHour = hour;
    }
    // Lord Howe changes by 30 minutes inside a UTC hour; don't cache through that transition.
    const currentOffset = transition ? offsetAt(minute) : offset;
    return ((minute + currentOffset) % 1440 + 1440) % 1440;
  };
}
function advance(previous, now, maxTicks = P1_MAX_TICKS) {
  validateState(previous);
  const s = JSON.parse(JSON.stringify(previous));
  const clock = localClock(s.timezone);
  const stop = Math.min(now, s.cursor + maxTicks);
  while (s.cursor < stop) {
    s.cursor++;
    if (s.dead_at !== null) {
      if (s.cursor >= s.dead_at + 60) {
        const next = newLife(hashSeed(`${s.seed}:${s.generation + 1}`), s.cursor, s.timezone, s.generation + 1);
        Object.assign(s, next);
        delete s.discipline_phase;
      }
    } else minuteTick(s, clock(s.cursor));
  }
  return s;
}
function timestampMinute(input) {
  const value = input?.trmnl?.system?.timestamp_utc;
  let ms = value === undefined ? Date.now() :
    typeof value === 'number' ? value * 1000 :
    typeof value === 'string' && /^\d+(\.\d+)?$/.test(value) ? Number(value) * 1000 : Date.parse(value);
  if (!Number.isFinite(ms) || ms < 0 || ms > 8640000000000000) throw new Error('Invalid TRMNL UTC timestamp');
  return Math.floor(ms / 60000);
}
function displayPet(s, now, warning = s.timezone_fallback ? 'Time zone unavailable · sleep uses UTC' : '') {
  const names = ['Egg', 'Babytchi', 'Marutchi', 'Tamatchi', 'Kuchitamatchi', 'Mametchi',
    'Ginjirotchi', 'Maskutchi', 'Kuchipatchi', 'Nyorotchi', 'Tarakotchi', 'Bill'];
  const dead = s.dead_at !== null;
  const slot = Math.floor(s.cursor / 15);
  // Independent visual stream: no stored mutations, no consumption of care RNG.
  const frame = (slot + (s.seed & 1)) % 2;
  const id = dead ? 'dead' : P1_NAMES[s.character];
  const offset = s.sleeping || dead || !s.character ? 0 : ((slot + s.seed % 7) % 7) - 3;
  const hearts = value => Array.from({length: 4}, (_, i) => i < Math.ceil(value / 4) ? '♥' : '♡').join('');
  const age = Math.max(0, s.cursor - s.born);
  const catchup = s.cursor < now;
  const status = dead ? 'Resting among the stars' : !s.character ? 'A little life is on its way' :
    s.sleeping ? 'Sound asleep' : s.sick ? 'Under the weather' :
    s.activity_until >= s.cursor ? s.activity : s.hunger === 0 ? 'Ready for a meal' : s.happiness === 0 ? 'A little bored' : 'Enjoying the day';
  // Pixel hearts avoid font-dependent Unicode rendering on OG and X.
  const heartPath = value => Array.from({length: 4}, (_, i) => {
    const x = i * 9;
    const outline = `M${x+1} 1h2v1h2V1h2v1h1v2h-1v1h-1v1h-1v1h-2V6h-1V5h-1V4h-1V2h1z`;
    const hollow = `M${x+1} 2h2v1h2V2h2v2h-1v1h-1v1h-2V5h-1V4h-1z`;
    return outline + (i < Math.ceil(value / 4) ? '' : hollow);
  }).join('');
  const progress = catchup ? `Catching up · ${Math.ceil((now-s.cursor)/1440)} days remaining` : '';
  const reminder = [progress, warning].filter(Boolean).join(' · ');
  const notice = reminder ||
    (dead ? `New egg in ${Math.max(0, 60 - (s.cursor - s.dead_at))}m` : s.sick ? 'Under the weather' : '');
  return { name: dead ? 'Until next time' : names[s.character], character: id,
    stage: dead ? 'REBIRTH' : !s.character ? 'EGG' : s.character === 1 ? 'BABY' : s.character === 2 ? 'CHILD' : s.character < 5 ? 'TEEN' : 'ADULT',
    generation: String(s.generation),
    age: age < 60 ? `${age}m` : age < 1440 ? `${Math.floor(age/60)}h ${age%60}m` : `${Math.floor(age/1440)}d ${Math.floor(age%1440/60)}h`,
    food: hearts(s.hunger), joy: hearts(s.happiness), status,
    food_path: heartPath(s.hunger), joy_path: heartPath(s.happiness),
    logo_path: P1_SPRITES.egg[0], notice, notice_visibility: notice ? 'visible' : 'hidden',
    caretaker: P1_PROFILES[s.profile], frame, sprite_path: P1_SPRITES[id][frame],
    sprite_transform: `translate(${8 + offset} 4)`, sleep_path: s.sleeping ? P1_SPRITES.sleep : '',
    state_class: s.sleeping ? 'is-sleeping' : dead ? 'is-dead' : '',
    warning: reminder,
    updated_at: new Date(s.cursor * 60000).toISOString(),
    next_event: dead ? `New egg in ${Math.max(0, 60 - (s.cursor - s.dead_at))}m` :
      s.sleeping ? 'Dreams in progress' : !s.character ? `Hatching in ${s.timers.hatch}m` : `${P1_PROFILES[s.profile]} caretaker` };
}
function run(input = {}) {
  const now = timestampMinute(input);
  const previous = input?.trmnl?.state;
  let accountTimezone;
  const metadata = input?.trmnl?.user?.time_zone_iana;
  if (typeof metadata === 'string' && metadata.trim()) {
    try { localClock(metadata.trim()); accountTimezone = metadata.trim(); }
    catch { /* Missing or unusable metadata must not discard a saved timezone. */ }
  }
  const timezone = accountTimezone || previous?.timezone || 'UTC';
  let s;
  if (previous === undefined || (previous && typeof previous === 'object' && !Array.isArray(previous) && Object.keys(previous).length === 0)) {
    const install = input?.trmnl?.plugin_settings?.id ?? input?.trmnl?.user?.plugin_setting_id;
    const seed = install === undefined ? Math.floor(Math.random() * 4294967296) : hashSeed(`${install}:${now}`);
    s = newLife(seed, now, timezone);
  } else s = advance(previous, now);
  // Catch up in the saved timezone before adopting account time for future minutes.
  // Older UTC states have no provenance; warn until account metadata confirms the zone.
  if (s.cursor === now) {
    s.timezone = timezone;
    s.timezone_fallback = !accountTimezone && (previous?.timezone_fallback ?? timezone === 'UTC');
  } else if (s.timezone_fallback === undefined) s.timezone_fallback = s.timezone === 'UTC';
  const result = { pet: displayPet(s, now), trmnl_state: s };
  // State is ASCII, so JSON length also equals its UTF-8 byte count.
  if (JSON.stringify(s).length > 8192) throw new Error('Saved state exceeds TRMNL limit');
  return result;
}
