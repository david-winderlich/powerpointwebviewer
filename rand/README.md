# Randtexturen für den Viewer

Der Viewer liegt in PowerPoint über der ganzen Folie oder, bei geteilten Folien,
rechtsbündig über der rechten Glasfläche. Er zeichnet den farbigen Rand, die
Milchglasfläche und ihren Schatten selbst, weil PowerPoint Add-ins immer
undurchsichtig und eckig anzeigt. Die Bilder in diesem Ordner sind die Randtexturen.

## Varianten und Position des Add-ins

Im Auswahlfeld der Steuerleiste wählst du die Variante passend zur Folie. Das Add-in
muss dann so auf der Folie liegen (oben 0, Höhe = ganze Folienhöhe, rechts bündig
mit dem Folienrand):

| Variante           | Position links | Breite   | Folie 33,87 cm breit        | Folie 50,8 cm breit         |
|--------------------|----------------|----------|-----------------------------|-----------------------------|
| Grün/Orange 100 %  | 0 %            | 100 %    | x 0 cm, Breite 33,87 cm     | x 0 cm, Breite 50,80 cm     |
| Grün/Orange 66 %   | 33,81 %        | 66,19 %  | x 11,45 cm, Breite 22,42 cm | x 17,18 cm, Breite 33,62 cm |
| Grün/Orange 50 %   | 50 %           | 50 %     | x 16,93 cm, Breite 16,93 cm | x 25,40 cm, Breite 25,40 cm |
| Grün/Orange 33 %   | 66,19 %        | 33,81 %  | x 22,42 cm, Breite 11,45 cm | x 33,62 cm, Breite 17,18 cm |

Alle Varianten einer Farbe nutzen dasselbe Bild (`gruen.png`, `orange.png`); der Viewer
schneidet den passenden Ausschnitt aus. Die Glasfläche bekommt die an den Folien
gemessene Farbe (`glas` in `farben.js`). Der Reiter „Kapitel“ oben rechts wird nicht nachgebildet,
dort zeigt der Viewer die normale abgerundete Ecke. Die Positionen der geteilten
Glasflächen stehen in `farben.js` (`x`, `glasX`, `nachbarBis`).

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
   `{ id: 'blau', name: 'Blau 100 %', bild: 'blau', ersatz: '#2f5f9e' },`
3. Für geteilte Folien die Grün-Zeilen kopieren und `id`, `name` und `bild` anpassen;
   `x`, `glasX` und `nachbarBis` bleiben gleich, solange das Folienlayout gleich ist.

`bild` ist der Dateiname ohne `.png`. `ersatz` ist die Farbe, die angezeigt wird,
solange das Bild fehlt.

## Blättern in der Bildschirmpräsentation

Weil das Add-in die ganze Folie bedeckt, kann man nicht mehr auf die Folie klicken.
Dafür gibt es:

- zwei kleine Pfeile im farbigen Rand unten links (‹ zurück) und unten rechts
  (› weiter). Sie werden erst sichtbar, wenn die Maus in die Nähe kommt. Größe und
  Abstand stehen oben in `viewer.html` (`--nav-breite`, `--nav-hoehe`, `--nav-seite`,
  `--nav-unten`, Angaben in pt).
- die Taste **N** für „weiter“, auch wenn die Simulation den Fokus hat, z. B. nach
  einem Klick auf einen Schalter. Für den Presenter (Logitech Spotlight) in der
  Logitech-App bei „Weiter halten“ die Taste N eintragen. Alle anderen Tasten
  (Pfeiltasten, Leertaste, Page Up/Down) bleiben bei der Simulation. In Textfeldern
  wird N nicht abgefangen, dort kann man normal tippen. Cmd/Ctrl/Alt+N bleiben frei.

## Maße der Glasfläche (Folie 960 × 540 pt)

- 9 pt Abstand links und oben, Größe 942 × 522 pt (geteilt: von `glasX` bis 951 pt)
- Eckenradius 13 pt
- Hintergrund weiß mit 92 % Deckkraft, 12 px Unschärfe dahinter (Milchglas)
- Schatten: 6 pt nach unten, 12 pt Unschärfe, 60 % Deckkraft, an den Folien gemessen
  (`--schatten-y`, `--schatten-blur`, `--schatten-alpha` oben in `viewer.html`)
