/*
 * navigation.js – Folien blättern aus einer Seite im PowerPoint-Viewer heraus
 *
 * Wenn eine Simulation im Viewer den Tastaturfokus hat, kommen Tasten nicht beim
 * Add-in an. Dieses Skript leitet deshalb die Taste N an den Viewer weiter, der dann
 * zur nächsten Folie blättert. Außerdem meldet es die Mausposition, damit der Viewer
 * die Blätterpfeile einblenden kann, wenn die Maus in die Nähe kommt.
 *
 * Einbinden:
 *   Seiten auf david-winderlich.github.io bindet der Viewer automatisch ein,
 *   dort ist nichts zu tun. Seiten auf anderen Domains können es selbst laden:
 *   <script src="https://david-winderlich.github.io/powerpointwebviewer/navigation.js"></script>
 *
 * Weitergeleitet wird nur N (n oder N, ohne Cmd/Ctrl/Alt). Alle anderen Tasten
 * (Pfeiltasten, Leertaste, Page Up/Down …) gehören der Simulation. In Texteingaben
 * (Textfelder, Zahlenfelder, textarea, contenteditable) wird auch N nicht
 * weitergeleitet, dort kann man normal tippen. Schalter, Checkboxen,
 * Schieberegler, Knöpfe und Auswahlfelder blättern dagegen weiter.
 *
 * Nachricht an den Viewer: { typ: 'folie', richtung: 'weiter' }
 */
(function () {
  if (window.__pptNavigation) return;          // nicht doppelt laden
  window.__pptNavigation = true;
  if (window.parent === window) return;        // nur sinnvoll innerhalb des Viewers

  function istWeiterTaste(e) {
    return (e.key === 'n' || e.key === 'N') && !e.metaKey && !e.ctrlKey && !e.altKey;
  }

  function senden(nachricht) {
    try { window.parent.postMessage(nachricht, '*'); } catch (e) {}
  }

  // Nur echte Texteingaben ausnehmen. Checkboxen, Schieberegler usw. sind auch
  // <input>, sollen N aber nicht verschlucken.
  var TEXT_TYPEN = /^(text|search|email|number|password|tel|url|date|datetime-local|month|time|week)$/i;
  function istEingabe(el) {
    if (!el) return false;
    if (el.isContentEditable || el.tagName === 'TEXTAREA') return true;
    return el.tagName === 'INPUT' && TEXT_TYPEN.test(el.type || 'text');
  }

  window.addEventListener('keydown', function (e) {
    // Bei Seiten auf derselben Domain fängt der Viewer die Taste selbst ab
    if (window.__pptNavigationDirekt) return;
    if (!istWeiterTaste(e) || istEingabe(e.target) || istEingabe(document.activeElement)) return;
    e.preventDefault();
    e.stopPropagation();
    if (!e.repeat) senden({ typ: 'folie', richtung: 'weiter' });
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
