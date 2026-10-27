/*
 * navigation.js – Folien blättern aus einer Seite im PowerPoint-Viewer heraus
 *
 * Wenn eine Simulation im Viewer den Tastaturfokus hat, kommen Tasten nicht beim
 * Add-in an. Dieses Skript leitet deshalb Page Down an den Viewer weiter, der dann
 * zur nächsten Folie blättert. Außerdem meldet es die Mausposition, damit der Viewer
 * die Blätterpfeile einblenden kann, wenn die Maus in die Nähe kommt.
 *
 * Einbinden:
 *   Seiten auf david-winderlich.github.io bindet der Viewer automatisch ein,
 *   dort ist nichts zu tun. Seiten auf anderen Domains können es selbst laden:
 *   <script src="https://david-winderlich.github.io/powerpointwebviewer/navigation.js"></script>
 *
 * Bewusst NICHT weitergeleitet: Pfeiltasten, Leertaste, Page Up. Die gehören der
 * Simulation. In Eingabefeldern (input, textarea, select, contenteditable) wird
 * auch Page Down nicht weitergeleitet.
 *
 * Nachricht an den Viewer: { typ: 'folie', richtung: 'weiter' }
 */
(function () {
  if (window.__pptNavigation) return;          // nicht doppelt laden
  window.__pptNavigation = true;
  if (window.parent === window) return;        // nur sinnvoll innerhalb des Viewers

  var TASTEN = { PageDown: 'weiter' };

  function senden(nachricht) {
    try { window.parent.postMessage(nachricht, '*'); } catch (e) {}
  }

  function istEingabe(el) {
    if (!el) return false;
    var t = el.tagName;
    return t === 'INPUT' || t === 'TEXTAREA' || t === 'SELECT' || el.isContentEditable;
  }

  window.addEventListener('keydown', function (e) {
    var richtung = TASTEN[e.key];
    if (!richtung || istEingabe(e.target) || istEingabe(document.activeElement)) return;
    e.preventDefault();
    e.stopPropagation();
    if (!e.repeat) senden({ typ: 'folie', richtung: richtung });
  }, true);

  // Mausposition melden (höchstens einmal pro Bild), damit die Pfeile erscheinen
  var geplant = false, letzte = null;
  document.addEventListener('mousemove', function (e) {
    letzte = e;
    if (geplant) return;
    geplant = true;
    requestAnimationFrame(function () {
      geplant = false;
      senden({ typ: 'maus', x: letzte.clientX, y: letzte.clientY, breite: window.innerWidth });
    });
  }, true);
  document.documentElement.addEventListener('mouseleave', function () {
    senden({ typ: 'maus-weg' });
  });
})();
