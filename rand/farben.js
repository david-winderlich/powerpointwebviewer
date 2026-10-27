// Liste der Rahmenfarben für den Viewer.
//
// Neue Farbe hinzufügen:
//   1. Bild als rand/<id>.png in diesen Ordner hochladen (z. B. rand/blau.png).
//   2. Hier eine Zeile ergänzen, z. B. { id: 'blau', name: 'Blau', ersatz: '#2f5f9e' },
//
// id     = Dateiname ohne .png (klein, ohne Umlaute und Leerzeichen)
// name   = Anzeige im Auswahlfeld des Viewers
// ersatz = Farbe, die erscheint, solange das Bild fehlt oder noch lädt
//
// Die erste Farbe mit der id 'gruen' ist der Standard.
window.RAHMEN_FARBEN = [
  { id: 'gruen',  name: 'Grün',   ersatz: '#3f8f6b' },
  { id: 'orange', name: 'Orange', ersatz: '#e07b2a' }
];
