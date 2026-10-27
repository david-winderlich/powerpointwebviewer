# Randtexturen für den Viewer

Der Viewer liegt in PowerPoint über der ganzen Folie. Er zeichnet den farbigen Rand
und die Milchglasfläche selbst, weil PowerPoint Add-ins immer undurchsichtig und
eckig anzeigt. Die Bilder in diesem Ordner sind die Randtexturen.

## Erwartete Dateien

| Datei        | Zweck                                                        |
|--------------|--------------------------------------------------------------|
| `gruen.png`  | Randtextur Grün (Standard)                                   |
| `orange.png` | Randtextur Orange                                            |
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

## Blättern in der Bildschirmpräsentation

Weil das Add-in die ganze Folie bedeckt, kann man nicht mehr auf die Folie klicken.
Dafür gibt es:

- zwei kleine Pfeile im farbigen Rand unten links (‹ zurück) und unten rechts
  (› weiter). Sie werden erst sichtbar, wenn die Maus in die Nähe kommt. Größe und
  Abstand stehen oben in `viewer.html` (`--nav-breite`, `--nav-hoehe`, `--nav-seite`,
  `--nav-unten`, Angaben in pt).
- die Taste **Page Down** für „weiter“, auch wenn die Simulation den Fokus hat, z. B.
  nach einem Klick auf einen Schalter. Dafür bindet der Viewer `../navigation.js`
  automatisch in die geladene Seite ein. Pfeiltasten, Leertaste und Page Up bleiben
  bei der Simulation, in Textfeldern wird Page Down nicht abgefangen.

## Maße der Glasfläche (Folie 960 × 540 pt)

- 9 pt Abstand links und oben, Größe 942 × 522 pt
- Eckenradius 13 pt
- Hintergrund weiß mit 92 % Deckkraft, 12 px Unschärfe dahinter (Milchglas)
