// Liste der Rahmen für den Viewer (Auswahlfeld in der Steuerleiste).
//
// Felder:
//   id      eindeutiger Name (klein, ohne Umlaute und Leerzeichen); wird pro Folie gespeichert
//   name    Anzeige im Auswahlfeld
//   bild    Randbild rand/<bild>.png (ohne Angabe: <id>.png)
//   ersatz  Farbe, die erscheint, solange das Bild fehlt oder noch lädt
//   x       nur bei geteilten Folien: linke Kante des Add-ins auf der Folie in pt.
//           Das Add-in reicht dann von x bis zum rechten Folienrand und ist
//           (960 - x) / 960 der Folienbreite breit. Ohne Angabe: 0 (ganze Folie).
//   glasX   linke Kante der Glasfläche auf der Folie in pt (ohne Angabe: 9).
//           Die Glasfläche endet immer bei 951 pt, oben 9 pt, 522 pt hoch.
//   nachbarBis  rechte Kante der linken Glasfläche in pt (nur geteilte Folien).
//           Deren Schatten fällt in die Lücke und wird mitgezeichnet.
//   glas    Farbe der Glasfläche, gemessen an den Folien (ohne Angabe: Weiß 92 %).
//   schatten  Deckkraft des Schattens (ohne Angabe: 0.6). PowerPoint mischt den
//           Schatten in linearem Licht, der Browser in sRGB; kräftige Ränder wie Rot
//           und Türkis brauchen deshalb mehr Deckkraft (an den Folien gemessen).
//
// Alle Maße beziehen sich auf eine Folie von 960 × 540 pt.
// Neue Farbe: Bild hochladen und Einträge nach dem Muster unten ergänzen.
// Der Eintrag mit der id 'gruen' ist der Standard.
// Geteilte Folien (gemessen an den Orange-Folien, Lücke zwischen den Flächen 9 pt):
//   66 %: linke Fläche bis 320.1 pt, rechte ab 329.1 pt
//   50 %: linke Fläche bis 475.5 pt, rechte ab 484.5 pt
//   33 %: linke Fläche bis 630.9 pt, rechte ab 639.9 pt
// x liegt jeweils in der Mitte der Lücke (bei 50 % genau auf der Folienmitte).
window.RAHMEN_FARBEN = [
  { id: 'gruen',     name: 'Grün 100 %',   bild: 'gruen',  ersatz: '#3f8f6b', glas: '#f2f6f2' },
  { id: 'gruen-66',  name: 'Grün 66 %',    bild: 'gruen',  ersatz: '#3f8f6b', glas: '#f2f6f2', x: 324.6, glasX: 329.1, nachbarBis: 320.1 },
  { id: 'gruen-50',  name: 'Grün 50 %',    bild: 'gruen',  ersatz: '#3f8f6b', glas: '#f2f6f2', x: 480,   glasX: 484.5, nachbarBis: 475.5 },
  { id: 'gruen-33',  name: 'Grün 33 %',    bild: 'gruen',  ersatz: '#3f8f6b', glas: '#f2f6f2', x: 635.4, glasX: 639.9, nachbarBis: 630.9 },
  { id: 'orange',    name: 'Orange 100 %', bild: 'orange', ersatz: '#e07b2a', glas: '#f7f4f2' },
  { id: 'orange-66', name: 'Orange 66 %',  bild: 'orange', ersatz: '#e07b2a', glas: '#f7f4f2', x: 324.6, glasX: 329.1, nachbarBis: 320.1 },
  { id: 'orange-50', name: 'Orange 50 %',  bild: 'orange', ersatz: '#e07b2a', glas: '#f7f4f2', x: 480,   glasX: 484.5, nachbarBis: 475.5 },
  { id: 'orange-33', name: 'Orange 33 %',  bild: 'orange', ersatz: '#e07b2a', glas: '#f7f4f2', x: 635.4, glasX: 639.9, nachbarBis: 630.9 },
  { id: 'rot',       name: 'Rot 100 %',    bild: 'rot',    ersatz: '#e82b3c', glas: '#f7f2f3', schatten: 0.71 },
  { id: 'rot-66',    name: 'Rot 66 %',     bild: 'rot',    ersatz: '#e82b3c', glas: '#f7f2f3', schatten: 0.71, x: 324.6, glasX: 329.1, nachbarBis: 320.1 },
  { id: 'rot-50',    name: 'Rot 50 %',     bild: 'rot',    ersatz: '#e82b3c', glas: '#f7f2f3', schatten: 0.71, x: 480,   glasX: 484.5, nachbarBis: 475.5 },
  { id: 'rot-33',    name: 'Rot 33 %',     bild: 'rot',    ersatz: '#e82b3c', glas: '#f7f2f3', schatten: 0.71, x: 635.4, glasX: 639.9, nachbarBis: 630.9 },
  { id: 'tuerkis',    name: 'Türkis 100 %', bild: 'tuerkis', ersatz: '#01d2da', glas: '#f2f7f7', schatten: 0.66 },
  { id: 'tuerkis-66', name: 'Türkis 66 %',  bild: 'tuerkis', ersatz: '#01d2da', glas: '#f2f7f7', schatten: 0.66, x: 324.6, glasX: 329.1, nachbarBis: 320.1 },
  { id: 'tuerkis-50', name: 'Türkis 50 %',  bild: 'tuerkis', ersatz: '#01d2da', glas: '#f2f7f7', schatten: 0.66, x: 480,   glasX: 484.5, nachbarBis: 475.5 },
  { id: 'tuerkis-33', name: 'Türkis 33 %',  bild: 'tuerkis', ersatz: '#01d2da', glas: '#f2f7f7', schatten: 0.66, x: 635.4, glasX: 639.9, nachbarBis: 630.9 },
  { id: 'flieder',    name: 'Flieder 100 %', bild: 'flieder', ersatz: '#7446bd', glas: '#f4f3f6', schatten: 0.69 },
  { id: 'flieder-66', name: 'Flieder 66 %',  bild: 'flieder', ersatz: '#7446bd', glas: '#f4f3f6', schatten: 0.69, x: 324.6, glasX: 329.1, nachbarBis: 320.1 },
  { id: 'flieder-50', name: 'Flieder 50 %',  bild: 'flieder', ersatz: '#7446bd', glas: '#f4f3f6', schatten: 0.69, x: 480,   glasX: 484.5, nachbarBis: 475.5 },
  { id: 'flieder-33', name: 'Flieder 33 %',  bild: 'flieder', ersatz: '#7446bd', glas: '#f4f3f6', schatten: 0.69, x: 635.4, glasX: 639.9, nachbarBis: 630.9 },
  { id: 'grau',    name: 'Grau 100 %', bild: 'grau', ersatz: '#535353', glas: '#fdfdfd' },
  { id: 'grau-66', name: 'Grau 66 %',  bild: 'grau', ersatz: '#535353', glas: '#fdfdfd', x: 324.6, glasX: 329.1, nachbarBis: 320.1 },
  { id: 'grau-50', name: 'Grau 50 %',  bild: 'grau', ersatz: '#535353', glas: '#fdfdfd', x: 480,   glasX: 484.5, nachbarBis: 475.5 },
  { id: 'grau-33', name: 'Grau 33 %',  bild: 'grau', ersatz: '#535353', glas: '#fdfdfd', x: 635.4, glasX: 639.9, nachbarBis: 630.9 },
  { id: 'blau',    name: 'Blau 100 %', bild: 'blau', ersatz: '#2b55bf', glas: '#f3f3f6', schatten: 0.69 },
  { id: 'blau-66', name: 'Blau 66 %',  bild: 'blau', ersatz: '#2b55bf', glas: '#f3f3f6', schatten: 0.69, x: 324.6, glasX: 329.1, nachbarBis: 320.1 },
  { id: 'blau-50', name: 'Blau 50 %',  bild: 'blau', ersatz: '#2b55bf', glas: '#f3f3f6', schatten: 0.69, x: 480,   glasX: 484.5, nachbarBis: 475.5 },
  { id: 'blau-33', name: 'Blau 33 %',  bild: 'blau', ersatz: '#2b55bf', glas: '#f3f3f6', schatten: 0.69, x: 635.4, glasX: 639.9, nachbarBis: 630.9 }
];
