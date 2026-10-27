# Randtexturen für den Viewer

Der Viewer liegt in PowerPoint über der ganzen Folie. Er zeichnet den farbigen Rand
und die Milchglasfläche selbst, weil PowerPoint Add-ins immer undurchsichtig und
eckig anzeigt. Die Bilder in diesem Ordner sind die Randtexturen.

## Erwartete Dateien

| Datei        | Zweck                                                        |
|--------------|--------------------------------------------------------------|
| `gruen.png`  | Randtextur Grün (Standard)                                   |
| `orange.png` | Randtextur Orange                                            |
| `logo.png`   | optional: Logo, das unten rechts über der Simulation liegt   |
| `farben.js`  | Liste der Farben, die im Auswahlfeld erscheinen              |

Dateinamen klein schreiben, ohne Umlaute und Leerzeichen. GitHub Pages unterscheidet
Groß- und Kleinschreibung.

## Format der Randtexturen

- Seitenverhältnis 16:9, wie die Folie (z. B. 1920 × 1080 oder 3840 × 2160 Pixel).
- Das Bild wird auf das ganze Add-in-Fenster gestreckt (100 % × 100 %).
- Am einfachsten: In PowerPoint eine Folie mit dem Rand duplizieren, alles außer dem
  Hintergrund löschen und über **Datei → Exportieren → PNG** nur diese Folie speichern.

## Neue Farbe hinzufügen

1. Bild hochladen, z. B. `rand/blau.png`.
2. In `farben.js` eine Zeile ergänzen:
   `{ id: 'blau', name: 'Blau', ersatz: '#2f5f9e' },`

Die `id` ist der Dateiname ohne `.png`. `ersatz` ist die Farbe, die angezeigt wird,
solange das Bild fehlt.

## Logo

`logo.png` wird nur angezeigt, wenn im Viewer der Haken **Logo** gesetzt ist.
Position und Größe stehen oben in `viewer.html` (`--logo-rechts`, `--logo-unten`,
`--logo-breite`, `--logo-hoehe`, Angaben in pt bezogen auf eine Folie von
960 × 540 pt). Standard: Fläche ab x 878 / y 470 pt, 60 × 48 pt. Ein transparentes PNG
ist am besten.

## Maße der Glasfläche (Folie 960 × 540 pt)

- 9 pt Abstand links und oben, Größe 942 × 522 pt
- Eckenradius 13 pt
- Hintergrund weiß mit 92 % Deckkraft, 12 px Unschärfe dahinter (Milchglas)
