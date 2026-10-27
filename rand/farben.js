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
//
// Alle Maße beziehen sich auf eine Folie von 960 × 540 pt.
// Neue Farbe: Bild hochladen und Einträge nach dem Muster unten ergänzen.
// Der Eintrag mit der id 'gruen' ist der Standard.
window.RAHMEN_FARBEN = [
  { id: 'gruen',    name: 'Grün 100 %', bild: 'gruen', ersatz: '#3f8f6b' },
  { id: 'gruen-66', name: 'Grün 66 %',  bild: 'gruen', ersatz: '#3f8f6b', x: 323.3, glasX: 327.2, nachbarBis: 319.4 },
  { id: 'gruen-50', name: 'Grün 50 %',  bild: 'gruen', ersatz: '#3f8f6b', x: 480,   glasX: 482.7, nachbarBis: 474.9 },
  { id: 'gruen-33', name: 'Grün 33 %',  bild: 'gruen', ersatz: '#3f8f6b', x: 634.3, glasX: 638.2, nachbarBis: 630.4 },
  { id: 'orange',   name: 'Orange 100 %', bild: 'orange', ersatz: '#e07b2a' }
];
