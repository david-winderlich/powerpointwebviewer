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
 * Simulation. In Texteingaben (Textfelder, Zahlenfelder, textarea, contenteditable)
 * wird auch Page Down nicht weitergeleitet. Schalter, Checkboxen, Schieberegler,
 * Knöpfe und Auswahlfelder blättern dagegen weiter.
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

  // Nur echte Texteingaben ausnehmen. Checkboxen, Schieberegler usw. sind auch
  // <input>, sollen Page Down aber nicht verschlucken.
  var TEXT_TYPEN = /^(text|search|email|number|password|tel|url|date|datetime-local|month|time|week)$/i;
  function istEingabe(el) {
    if (!el) return false;
    if (el.isContentEditable || el.tagName === 'TEXTAREA') return true;
    return el.tagName === 'INPUT' && TEXT_TYPEN.test(el.type || 'text');
  }

  window.addEventListener('keydown', function (e) {
    // Bei Seiten auf derselben Domain fängt der Viewer Page Down selbst ab
    if (window.__pptNavigationDirekt) return;
    var richtung = TASTEN[e.key] || (e.keyCode === 34 ? 'weiter' : null);
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
