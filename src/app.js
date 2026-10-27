const STORAGE_KEY = "codex-sales-research-studio-v1";
const LANGUAGE_KEY = "codex-sales-research-studio-language-v1";
const APP_VERSION = 1;
const $ = (id) => document.getElementById(id);
const makeId = () => globalThis.crypto?.randomUUID?.() ?? `n${Date.now()}${Math.random().toString(16).slice(2)}`;
const freshWorkspace = () => ({ version: APP_VERSION, lead: null, evidence: [], questions: [], tasks: [], draft: "", draftEvidenceId: "", reviewed: false, activity: [], updatedAt: new Date().toISOString() });
let data = freshWorkspace();
let toastTimer;
const translations = {
  "Codex Sales Research Studio":"Codex Sales Research Studio",
  "A local-first evidence brief builder for public business research. Record sources, separate signals from unknowns, and export a reviewable brief.":"Ein browserbasiertes Werkzeug für belegte Unternehmensrecherche. Quellen erfassen, Signale von offenen Fragen trennen und ein prüfbares Briefing exportieren.",
  "Switch language":"Sprache wechseln","Page navigation":"Seitennavigation","Workspace":"Arbeitsbereich","Brief":"Briefing","Privacy & method":"Datenschutz & Methode","Built with Codex":"Mit Codex erstellt",
  "A practical account-research workflow · built with Codex":"Praxisnaher Ablauf für die Kundenrecherche · mit Codex erstellt","Go from scattered notes to a":"Von verstreuten Notizen zum","clear next step.":"klaren nächsten Schritt.",
  "Prepare an account brief you can review and share: keep source links beside your observations, separate possible signals from unknowns, and leave with focused questions and follow-up tasks.":"Erstelle ein prüfbares und teilbares Kundenbriefing: Halte Quellen direkt bei deinen Beobachtungen fest, trenne mögliche Signale von offenen Fragen und leite konkrete Rückfragen und nächste Schritte ab.",
  "Build an account brief":"Kundenbriefing erstellen","See a finished sample":"Fertiges Beispiel ansehen","Useful for preparing a customer conversation, handing research to a colleague, or keeping your own follow-up straight.":"Hilfreich zur Vorbereitung auf ein Kundengespräch, zur Übergabe an Kollegen und um eigene Nachfassaktionen im Blick zu behalten.",
  "Preview of a fictional example brief":"Vorschau auf ein fiktives Beispiel-Briefing","EXAMPLE OUTPUT · FICTIONAL":"BEISPIELERGEBNIS · FIKTIV","ACCOUNT BRIEF":"KUNDENBRIEFING","A concise account snapshot, ready for your review.":"Kompakte Kundenübersicht zur Prüfung.","Possible signal":"Mögliches Signal","Public page mentions recurring team orders.":"Eine öffentliche Seite erwähnt wiederkehrende Teambestellungen.","Still unknown":"Noch offen","Who owns supplier decisions?":"Wer entscheidet über Lieferanten?","NEXT STEP":"NÄCHSTER SCHRITT","Verify the ordering path, then prepare a relevant question.":"Bestellablauf prüfen und anschließend eine passende Frage vorbereiten.","SOURCE-LINKED":"MIT QUELLENVERWEIS","REVIEWABLE":"PRÜFBAR","EDITABLE":"BEARBEITBAR",
  "How this tool handles data":"So geht das Tool mit Daten um","Manual, source-linked evidence":"Manuell erfasste Quellenbelege","User labels signals and confidence":"Du ordnest Signale und Sicherheit ein","Browser-only workspace":"Arbeitsbereich nur im Browser","Export before sharing":"Vor dem Teilen exportieren",
  "What you get from the workflow":"Dein Nutzen aus diesem Ablauf","01 · PREPARE":"01 · VORBEREITEN","One account, one working brief":"Ein Kunde, ein übersichtliches Briefing","Keep company context, source notes, and the question you are researching together.":"Firmenkontext, Quellen und deine Recherchefrage an einem Ort.","02 · JUDGE":"02 · EINORDNEN","Know what is evidence and what is still open":"Belege und offene Punkte auseinanderhalten","Show possible signals with their source, and make gaps visible before you act.":"Mögliche Signale mit Quelle festhalten und Wissenslücken erkennen, bevor du handelst.","03 · FOLLOW THROUGH":"03 · WEITERARBEITEN","Leave with a concrete next move":"Mit einem konkreten nächsten Schritt abschließen","Capture follow-up tasks and shape an editable first-contact draft from a note you selected.":"Nachfassaufgaben notieren und aus einer ausgewählten Beobachtung einen bearbeitbaren Kontaktentwurf erstellen.",
  "01 — BUILD A RESEARCH PACK":"01 — RECHERCHEPAKET ERSTELLEN","Your workspace":"Dein Arbeitsbereich","Remember on this device":"Auf diesem Gerät speichern","Clear workspace":"Arbeitsbereich leeren","Account context":"Kundenkontext","Describe the company and your working hypothesis.":"Beschreibe das Unternehmen und deine Arbeitshypothese.","NO ACCOUNT":"KEIN KUNDE","WORKING ACCOUNT":"KUNDENKONTEXT","FICTIONAL SAMPLE":"FIKTIVES BEISPIEL","Company or account name":"Unternehmen oder Kunde","e.g. Northstar Components":"z. B. Beispiel GmbH","Public website":"Öffentliche Website","Saved as a reference only. This app does not open or crawl it.":"Wird nur als Quellenverweis gespeichert. Die App öffnet oder durchsucht die Seite nicht.","Segment or context":"Branche oder Kontext","optional":"optional","e.g. B2B manufacturing":"z. B. B2B-Fertigung","Research question":"Recherchefrage","What workflow or need are we trying to understand?":"Welchen Ablauf oder Bedarf möchten wir verstehen?","Save account context":"Kundenkontext speichern","Context is in this browser workspace.":"Kontext ist in diesem Browser-Arbeitsbereich gespeichert.","Save an account first.":"Speichere zuerst einen Kundenkontext.",
  "02":"02","Evidence ledger":"Quellenübersicht","Add a fact you observed and where you observed it.":"Ergänze eine Beobachtung und ihren Fundort.","0 SOURCES":"0 QUELLEN","Source title":"Quellentitel","e.g. Services page":"z. B. Leistungsseite","Source URL":"Quellen-URL","HTTPS links only. The link opens only if you click it.":"Nur HTTPS-Links. Die Seite wird nur geöffnet, wenn du den Link anklickst.","Your observation":"Deine Beobachtung","What does the page explicitly say? Keep this to an observable point.":"Was steht ausdrücklich auf der Seite? Halte eine konkrete Beobachtung fest.","How are you classifying it?":"Wie ordnest du die Beobachtung ein?","Potential signal":"Mögliches Signal","Constraint or risk":"Einschränkung oder Risiko","Open question / not established":"Offene Frage / nicht belegt","Your confidence in this note":"Deine Sicherheit bei dieser Beobachtung","High — direct and clear":"Hoch — direkt und eindeutig","Medium — reasonable reading":"Mittel — plausible Einordnung","Low — needs checking":"Niedrig — muss geprüft werden","Add source note":"Quellenbeleg hinzufügen","No external lookup or upload occurs.":"Es erfolgt keine externe Recherche oder Übertragung.","Recorded observations":"Erfasste Beobachtungen","YOUR NOTES · NOT AUTOMATICALLY VERIFIED":"DEINE NOTIZEN · NICHT AUTOMATISCH GEPRÜFT","No evidence yet. Add a source note above or load the fictional sample.":"Noch keine Belege. Füge oben einen Quellenbeleg hinzu oder lade das fiktive Beispiel.","No evidence yet. Add a source note above or load the fictional sample.":"Noch keine Belege. Füge oben einen Quellenbeleg hinzu oder lade das fiktive Beispiel.",
  "03":"03","What is still unknown?":"Was ist noch offen?","Keep missing internal context explicit instead of filling it with guesses.":"Mache fehlenden internen Kontext sichtbar, statt ihn durch Vermutungen zu ersetzen.","0 OPEN":"0 OFFEN","Add an open question":"Offene Frage hinzufügen","e.g. Who owns the current process?":"z. B. Wer ist für den aktuellen Ablauf zuständig?","Add question":"Frage hinzufügen","No open questions recorded.":"Noch keine offenen Fragen erfasst.",
  "LIVE COVERAGE":"AKTUELLER ÜBERBLICK","Research pack":"Recherchepaket","source notes":"Quellenbelege","Potential signals":"Mögliche Signale","Constraints / risks":"Einschränkungen / Risiken","Unknowns":"Offene Punkte","Coverage is a count of what you entered, not a company score or a verified business outcome.":"Die Übersicht zählt deine Eingaben. Sie ist weder eine Unternehmensbewertung noch ein bestätigtes Geschäftsergebnis.","04 — FOLLOW THROUGH":"04 — NÄCHSTE SCHRITTE","Next steps":"Nächste Schritte","0 TASKS":"0 AUFGABEN","Next step":"Nächster Schritt","Add a next step…":"Nächsten Schritt notieren …","Due date":"Fällig am","Add task":"Aufgabe hinzufügen","No next steps yet.":"Noch keine nächsten Schritte erfasst.","LOCAL CHANGE TRAIL":"LOKALE ÄNDERUNGEN","Workspace activity":"Aktivitäten","0 EVENTS":"0 EREIGNISSE","Your edits appear here for this browser session.":"Deine Änderungen erscheinen hier während dieser Browsersitzung.",
  "PORTABLE BY DESIGN":"LEICHT MITZUNEHMEN","Your files stay yours":"Deine Dateien bleiben bei dir","Export a Markdown brief for review, or a JSON project file to move or back up this workspace.":"Exportiere ein Markdown-Briefing zur Prüfung oder eine JSON-Projektdatei, um den Arbeitsbereich zu übertragen oder zu sichern.","Export research brief (.md)":"Briefing exportieren (.md)","Export project data (.json)":"Projektdaten exportieren (.json)","Import project (.json)":"Projekt importieren (.json)","Opt in to local saving above. Otherwise your workspace exists only in this browser tab until you refresh.":"Aktiviere oben die lokale Speicherung. Andernfalls bleibt dein Arbeitsbereich nur bis zum Neuladen in diesem Browser-Tab.",
  "05 — REVIEW BEFORE YOU SHARE":"05 — VOR DEM TEILEN PRÜFEN","Brief preview":"Briefing-Vorschau","Mark reviewed":"Als geprüft markieren","Reviewed ✓":"Geprüft ✓","ACCOUNT RESEARCH BRIEF":"KUNDENRECHERCHE-BRIEFING","NOT CREATED":"NOCH NICHT ERSTELLT","Your brief will appear here.":"Hier erscheint dein Briefing.","Save an account and add source notes. The brief uses only the content you enter and labels each item by its source ID.":"Speichere einen Kundenkontext und füge Quellenbelege hinzu. Das Briefing verwendet nur deine Eingaben und ordnet jeden Punkt einer Quellen-ID zu.","NOT REVIEWED · DRAFT":"NICHT GEPRÜFT · ENTWURF","REVIEWED BY YOU · NO EXTERNAL ACTION":"VON DIR GEPRÜFT · KEINE EXTERNE AKTION","06":"06","Optional outreach draft":"Optionaler Kontaktentwurf","Build a draft from one selected observation. Edit it before reuse.":"Erstelle einen Entwurf aus einer ausgewählten Beobachtung und bearbeite ihn vor der Verwendung.","Choose a potential signal":"Mögliches Signal auswählen","Add a potential signal first":"Füge zuerst ein mögliches Signal hinzu","Create draft from selected evidence":"Entwurf aus ausgewähltem Beleg erstellen","Internal draft":"Interner Entwurf","Your draft will appear here. Nothing can be sent from this page.":"Hier erscheint dein Entwurf. Von dieser Seite kann nichts versendet werden.","NO SEND FUNCTION":"KEINE VERSANDFUNKTION","This is an editable suggestion. It is not approved, addressed to a person, or sent.":"Dies ist ein bearbeitbarer Vorschlag. Er wurde nicht freigegeben, an eine Person adressiert oder versendet.","Save draft in this project":"Entwurf in diesem Projekt speichern",
  "DESIGNED TO BE AUDITABLE":"NACHVOLLZIEHBAR ENTWICKELT","Useful because it shows its work.":"Nützlich, weil der Weg zum Ergebnis sichtbar bleibt.","This project turns Codex-assisted product development into a small tool with explicit evidence boundaries—not an autonomous sales agent.":"Dieses Projekt macht aus der Produktentwicklung mit Codex ein kleines Werkzeug mit klaren Grenzen bei Quellen und Belegen — keinen autonomen Vertriebsagenten.","Evidence remains attached":"Belege bleiben zugeordnet","Every observation has a source title, HTTPS URL, user-selected classification, and confidence label. The app never fetches the page or claims to verify your note.":"Jede Beobachtung hat einen Quellentitel, eine HTTPS-URL, deine Einordnung und eine Sicherheitseinschätzung. Die App ruft die Seite nicht ab und behauptet nicht, deine Notiz geprüft zu haben.","Unknown means unknown":"Offen bleibt offen","Signals and risks are classifications you choose. Open questions get their own list. Coverage counts do not turn into a fabricated lead score.":"Du ordnest Signale und Risiken selbst ein. Offene Fragen erhalten eine eigene Liste. Die Übersicht wird nicht zu einem erfundenen Lead-Score.","Approval has no send button":"Prüfen ohne Versandknopf","The report has a review marker and an editable outreach draft. There is no email connection, contact action, or hidden automation.":"Das Briefing kann als geprüft markiert werden; ein Kontaktentwurf bleibt bearbeitbar. Es gibt keine E-Mail-Verbindung, Kontaktaktion oder versteckte Automatisierung.","Local-first, portable data":"Lokale und übertragbare Daten","There is no server database or analytics in this demo. Saving is opt-in and stays in your browser storage; JSON and Markdown exports give you control of your files.":"Diese Demo hat keine Serverdatenbank und keine Analysefunktion. Das Speichern ist freiwillig und bleibt im Browser. JSON- und Markdown-Exporte geben dir die Kontrolle über deine Dateien.","Implementation notes and verification boundaries":"Technische Hinweise und Grenzen der Überprüfung","This standalone tool runs deterministically in the browser. It does not call an AI model, read a website, send data to an API, or send outreach. It creates a source-backed research pack and editable internal brief that a person can inspect and export.":"Dieses eigenständige Werkzeug läuft deterministisch im Browser. Es ruft kein KI-Modell und keine Website auf, überträgt keine Daten an eine API und versendet keine Kontaktaufnahme. Es erstellt ein quellenbasiertes Recherchepaket und ein bearbeitbares internes Briefing, das sich prüfen und exportieren lässt.","This public tool runs deterministically in the browser. It does not call an AI model, read a website, send data to an API, or send outreach. Its purpose is to make a source-backed research pack and editable internal brief that a person can inspect and export.":"Dieses öffentliche Werkzeug läuft deterministisch im Browser. Es ruft kein KI-Modell und keine Website auf, überträgt keine Daten an eine API und versendet keine Kontaktaufnahme. Es erstellt ein quellenbasiertes Recherchepaket und ein bearbeitbares internes Briefing, das du prüfen und exportieren kannst.","OpenAI is not affiliated with or endorsing this independent demonstration.":"OpenAI ist mit dieser unabhängigen Demo weder verbunden noch befürwortet OpenAI sie.","A small, inspectable workflow built with Codex.":"Ein kleines, nachvollziehbares Werkzeug, mit Codex erstellt.","Fictional sample data · no live crawl · no outreach.":"Fiktive Beispieldaten · keine Live-Recherche · kein Versand.","Back to top ↑":"Nach oben ↑",
  "Fictional B2B supplier":"Fiktiver B2B-Anbieter","Could recurring uniform orders be a relevant workflow to discuss?":"Könnten wiederkehrende Uniformbestellungen ein relevantes Gesprächsthema sein?","Company overview · sample page":"Unternehmensprofil · Beispielseite","The fictional page describes workwear for small teams.":"Die fiktive Seite beschreibt Arbeitskleidung für kleine Teams.","Ordering guide · sample page":"Bestellhinweise · Beispielseite","The fictional guide describes recurring orders and a request-a-quote path.":"Der fiktive Leitfaden beschreibt wiederkehrende Bestellungen und eine Angebotsanfrage.","Service FAQ · sample page":"Service-FAQ · Beispielseite","The scenario does not establish who decides on a supplier or whether a change is planned.":"Aus dem Beispiel geht nicht hervor, wer über Lieferanten entscheidet oder ob ein Wechsel geplant ist.","Who owns the current ordering process?":"Wer ist für den aktuellen Bestellablauf zuständig?","Verify the sample ordering path against a real source":"Bestellablauf anhand einer echten Quelle prüfen","Loaded the fictional sample workspace.":"Fiktiven Beispiel-Arbeitsbereich geladen.","Sample loaded. Every company and source is fictional.":"Beispiel geladen. Unternehmen und Quellen sind frei erfunden.",
  "high":"hoch","medium":"mittel","low":"niedrig","confidence":"Sicherheit","user-classified":"von dir eingeordnet","Potential signals":"Mögliche Signale","Constraints and risks":"Einschränkungen und Risiken","No potential signals recorded.":"Keine möglichen Signale erfasst.","No constraints or risks recorded.":"Keine Einschränkungen oder Risiken erfasst.","No source-related unknowns recorded.":"Keine quellenbezogenen offenen Punkte erfasst.","Research question":"Recherchefrage","Open questions":"Offene Fragen","No additional questions recorded.":"Keine weiteren Fragen erfasst.","No open next steps recorded.":"Keine offenen nächsten Schritte erfasst.","Generated from user-entered notes. Source content was not fetched or independently verified. This brief is a working aid, not a validated account assessment.":"Aus deinen Notizen erstellt. Quellen wurden weder abgerufen noch unabhängig geprüft. Dieses Briefing ist eine Arbeitshilfe und keine bestätigte Unternehmensbewertung.",
  "Potential signal":"Mögliches Signal","Constraint":"Risiko","Unknown":"Offen","SIGNAL":"SIGNAL","RISK":"RISIKO","UNKNOWN":"OFFEN","CONFIDENCE":"SICHERHEIT","Added":"Hinzugefügt","Remove note":"Beleg entfernen","Remove":"Entfernen","Mark":"Markiere","open":"offen","complete":"erledigt","Completed a next step.":"Nächsten Schritt erledigt.","Reopened a next step.":"Nächsten Schritt wieder geöffnet.","Removed a next step.":"Nächsten Schritt entfernt.","Removed an open question.":"Offene Frage entfernt.","Removed evidence note":"Quellenbeleg entfernt","Added an open question.":"Offene Frage hinzugefügt.","Added a next step.":"Nächsten Schritt hinzugefügt.","Updated account context.":"Kundenkontext aktualisiert.","Created account context.":"Kundenkontext erstellt.","Added evidence note":"Quellenbeleg hinzugefügt","Open source:":"Quelle öffnen:","Due":"Fällig",
  "Choose a signal":"Signal auswählen","Updated":"AKTUALISIERT","No account":"Kein Kundenkontext","Browser storage is unavailable. Export a JSON backup instead.":"Der Browserspeicher ist nicht verfügbar. Exportiere stattdessen eine JSON-Sicherung.","Enter a company name and a valid public HTTPS URL.":"Gib einen Unternehmensnamen und eine gültige öffentliche HTTPS-Adresse ein.","Account context saved in the current workspace.":"Kundenkontext im aktuellen Arbeitsbereich gespeichert.","Add a title, HTTPS source URL, and direct observation.":"Ergänze einen Titel, eine HTTPS-Quellenadresse und eine konkrete Beobachtung.","Source note added. It was not independently verified.":"Quellenbeleg hinzugefügt. Er wurde nicht unabhängig geprüft.","Draft created from one selected note. Review and edit it before reuse.":"Entwurf aus einer ausgewählten Notiz erstellt. Prüfe und bearbeite ihn vor der Verwendung.","Draft saved in the current project. Nothing was sent.":"Entwurf in diesem Projekt gespeichert. Es wurde nichts versendet.","Review marker recorded. No message was sent.":"Prüfvermerk gespeichert. Es wurde keine Nachricht versendet.","Review marker removed.":"Prüfvermerk entfernt.","Opted in: this workspace is saved in this browser only.":"Aktiviert: Dieser Arbeitsbereich wird nur in diesem Browser gespeichert.","Local copy removed. Export a backup first if you need one.":"Lokale Kopie entfernt. Exportiere vorher eine Sicherung, falls du sie benötigst.","Clear this workspace from the page and this browser's saved copy? Export a backup first if needed.":"Diesen Arbeitsbereich und die gespeicherte Browserkopie löschen? Exportiere bei Bedarf zuerst eine Sicherung.","Workspace cleared from this page and local storage.":"Arbeitsbereich und lokale Browserkopie gelöscht.","Project file exceeds the 1 MB import limit.":"Die Projektdatei überschreitet das Importlimit von 1 MB.","Imported a project file into this browser.":"Projektdatei in diesen Browser importiert.","Project imported locally. Check all source notes before use.":"Projekt lokal importiert. Prüfe vor der Verwendung alle Quellenbelege.","That file is not a valid Codex Sales Research Studio project export.":"Diese Datei ist kein gültiger Projektexport von Codex Sales Research Studio.","The selected file could not be read.":"Die ausgewählte Datei konnte nicht gelesen werden.",
  "No account yet":"Noch kein Kundenkontext","Not recorded":"Nicht erfasst","None recorded.":"Nichts erfasst.","Account research brief":"Kundenrecherche-Briefing","Website":"Website","Segment/context":"Branche/Kontext","Updated":"Aktualisiert","Potential signals":"Mögliche Signale","Constraints and risks":"Einschränkungen und Risiken","Unknowns":"Offene Punkte","Open questions":"Offene Fragen","Next steps":"Nächste Schritte","Review status":"Prüfstatus","Draft; not reviewed.":"Entwurf; nicht geprüft.","Marked reviewed by the user in this browser workspace.":"Von dir in diesem Browser-Arbeitsbereich als geprüft markiert.","No outreach was sent.":"Es wurde keine Kontaktaufnahme versendet.",
  "Hello ":"Hallo "," team,":"-Team,","I noticed this public information on your ":"Auf Ihrer öffentlich zugänglichen Seite ","Is this an area your team is currently reviewing? If it is relevant, I can share a short set of questions for comparing approaches.":"prüfe ich derzeit folgende Information: „","Best,":"Freundliche Grüße,","[Your name]":"[Dein Name]","Source to verify before use:":"Quelle vor der Verwendung prüfen:",
  "No source note yet":"Noch kein Quellenbeleg","Select an account to continue":"Wähle einen Kundenkontext, um fortzufahren","CLEAR":"LEEREN"
};
Object.assign(translations,{
  "Completed a next step.":"Nächsten Schritt erledigt.","Reopened a next step.":"Nächsten Schritt wieder geöffnet.","Removed an open question.":"Offene Frage entfernt.","Removed a next step.":"Nächsten Schritt entfernt.","Saved an internal outreach draft.":"Internen Kontaktentwurf gespeichert.","Marked the brief reviewed in this browser workspace.":"Briefing in diesem Browser als geprüft markiert.","Reopened the brief for review.":"Briefing erneut zur Prüfung geöffnet.","Exported a Markdown brief.":"Markdown-Briefing exportiert.","Exported project JSON.":"Projekt als JSON exportiert.","Imported a project file into this browser.":"Projektdatei in diesen Browser importiert."
});
const reverseTranslations = Object.fromEntries(Object.entries(translations).map(([en,de])=>[de,en]));
let language = (()=>{try{return localStorage.getItem(LANGUAGE_KEY)==="de"?"de":"en";}catch{return"en";}})();
function tr(value) {
  const text=String(value ?? "");
  if(language==="de") {
    if(text.startsWith("Added evidence note ")) return `Quellenbeleg hinzugefügt: ${text.slice("Added evidence note ".length).replace(/\.$/,"")}`;
    if(text.startsWith("Removed evidence note ")) return `Quellenbeleg entfernt: ${text.slice("Removed evidence note ".length).replace(/\.$/,"")}`;
  }
  return language === "de" ? (translations[text] ?? text) : (reverseTranslations[text] ?? text);
}
function applyLanguage() {
  document.documentElement.lang=language;
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  let textNode;
  while((textNode=walker.nextNode())) {
    const raw=textNode.nodeValue, trimmed=raw.trim();
    if(!trimmed) continue;
    const translated=tr(trimmed);
    if(translated!==trimmed) textNode.nodeValue=raw.replace(trimmed,translated);
  }
  for(const element of document.querySelectorAll("[placeholder],[aria-label],[title]")) {
    for(const attribute of ["placeholder","aria-label","title"]) if(element.hasAttribute(attribute)) element.setAttribute(attribute,tr(element.getAttribute(attribute)));
  }
  $("language-toggle").textContent=language==="de"?"EN · English":"DE · Deutsch";
  $("language-toggle").setAttribute("aria-label",language==="de"?"Sprache auf Englisch umstellen":"Switch language to German");
  document.querySelector('meta[name="description"]').content=tr("A local-first evidence brief builder for public business research. Record sources, separate signals from unknowns, and export a reviewable brief.");
}
function pluralLabel(count,en,deSingular,dePlural) {
  if(language==="de") return `${count} ${count===1?deSingular:dePlural}`;
  return `${count} ${en}${count===1?"":"S"}`;
}

function safeUrl(raw) {
  try {
    const url = new URL(raw.trim());
    if (url.protocol !== "https:" || url.username || url.password || (url.port && url.port !== "443")) return null;
    if (raw.trim().length > 2000) return null;
    return url.toString();
  } catch { return null; }
}
function showToast(message) {
  const toast = $("toast"); toast.textContent = tr(message); toast.hidden = false;
  clearTimeout(toastTimer); toastTimer = setTimeout(() => { toast.hidden = true; }, 3300);
}
function node(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined && text !== null) el.textContent = tr(text);
  return el;
}
function addActivity(message) {
  data.activity.unshift({ id: makeId(), at: new Date().toISOString(), message });
  data.activity = data.activity.slice(0, 40);
  data.updatedAt = new Date().toISOString();
}
function persist() {
  data.version = APP_VERSION;
  data.updatedAt = new Date().toISOString();
  if ($("remember-data").checked) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
    catch { showToast("Browser storage is unavailable. Export a JSON backup instead."); }
  }
}
function touch(message) {
  data.reviewed = false;
  if (message) addActivity(message);
  persist(); render();
}
function loadSample() {
  data = {
    version: APP_VERSION,
    lead: { id: makeId(), name: "Fieldhouse Workwear", url: "https://fieldhouse-workwear.example", segment: "Fictional B2B supplier", question: "Could recurring uniform orders be a relevant workflow to discuss?", fictional: true, createdAt: new Date().toISOString() },
    evidence: [
      { id: "E-01", title: "Company overview · sample page", url: "https://fieldhouse-workwear.example/about", observation: "The fictional page describes workwear for small teams.", kind: "signal", confidence: "high", addedAt: new Date().toISOString() },
      { id: "E-02", title: "Ordering guide · sample page", url: "https://fieldhouse-workwear.example/ordering", observation: "The fictional guide describes recurring orders and a request-a-quote path.", kind: "signal", confidence: "medium", addedAt: new Date().toISOString() },
      { id: "E-03", title: "Service FAQ · sample page", url: "https://fieldhouse-workwear.example/faq", observation: "The scenario does not establish who decides on a supplier or whether a change is planned.", kind: "unknown", confidence: "high", addedAt: new Date().toISOString() }
    ],
    questions: ["Who owns the current ordering process?"],
    tasks: [{ id: makeId(), text: "Verify the sample ordering path against a real source", due: "", done: false }],
    draft: "", draftEvidenceId: "", reviewed: false, activity: [], updatedAt: new Date().toISOString()
  };
  addActivity("Loaded the fictional sample workspace."); persist(); render();
  showToast("Sample loaded. Every company and source is fictional.");
  location.hash = "report";
  document.getElementById("report").scrollIntoView({ behavior: "smooth", block: "start" });
}
function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (saved?.version === APP_VERSION && saved.lead && Array.isArray(saved.evidence)) {
      data = normalizeWorkspace(saved);
      $("remember-data").checked = true;
      showToast("Your opted-in workspace was restored from this browser.");
    }
  } catch { try { localStorage.removeItem(STORAGE_KEY); } catch {} }
}
function normalizeWorkspace(value) {
  const cleanLead = value.lead ? {
    id: String(value.lead.id || makeId()), name: String(value.lead.name || "").slice(0,120),
    url: safeUrl(String(value.lead.url || "")) || "", segment: String(value.lead.segment || "").slice(0,160),
    question: String(value.lead.question || "").slice(0,240), fictional: !!value.lead.fictional, createdAt: String(value.lead.createdAt || new Date().toISOString())
  } : null;
  return {
    version: APP_VERSION, lead: cleanLead,
    evidence: value.evidence.slice(0,200).map((x,i)=>({id:`E-${String(i+1).padStart(2,"0")}`,title:String(x.title||"").slice(0,140),url:safeUrl(String(x.url||""))||"",observation:String(x.observation||"").slice(0,1000),kind:["signal","constraint","unknown"].includes(x.kind)?x.kind:"unknown",confidence:["high","medium","low"].includes(x.confidence)?x.confidence:"medium",addedAt:String(x.addedAt||new Date().toISOString())})).filter(x=>x.title&&x.url&&x.observation),
    questions: Array.isArray(value.questions)?value.questions.slice(0,100).map(x=>String(x).slice(0,240)):[],
    tasks: Array.isArray(value.tasks)?value.tasks.slice(0,100).map(x=>({id:String(x.id||makeId()),text:String(x.text||"").slice(0,240),due:String(x.due||""),done:!!x.done})).filter(x=>x.text):[],
    draft:String(value.draft||"").slice(0,2000), draftEvidenceId:String(value.draftEvidenceId||""), reviewed:!!value.reviewed,
    activity:Array.isArray(value.activity)?value.activity.slice(0,40).map(x=>({id:String(x.id||makeId()),at:String(x.at||new Date().toISOString()),message:String(x.message||"").slice(0,180)})):[],
    updatedAt:String(value.updatedAt||new Date().toISOString())
  };
}
function renderEvidence() {
  const list = $("evidence-list"); list.replaceChildren();
  $("evidence-count").textContent = pluralLabel(data.evidence.length,"SOURCE","QUELLE","QUELLEN");
  if (!data.evidence.length) { list.append(node("div","empty-state","No evidence yet. Add a source note above or load the fictional sample.")); return; }
  data.evidence.forEach((item,index)=>{
    const card=node("article","evidence-item");
    const top=node("div","evidence-top"); top.append(node("span","evidence-id",`E-${String(index+1).padStart(2,"0")}`));
    top.append(node("div","evidence-title",item.title));
    const tags=node("div","evidence-meta");
    const kindLabel={signal:"SIGNAL",constraint:"RISK",unknown:"UNKNOWN"}[item.kind];
    tags.append(node("span",`tag ${item.kind}`,kindLabel));
    const confidenceLabel=language==="de"?{high:"HOHE SICHERHEIT",medium:"MITTLERE SICHERHEIT",low:"NIEDRIGE SICHERHEIT"}[item.confidence]:`${item.confidence.toUpperCase()} CONFIDENCE`;
    tags.append(node("span","tag confidence",confidenceLabel)); top.append(tags);
    card.append(top, node("div","evidence-observation",item.observation));
    const link=node("a","source-link",item.url); link.href=item.url; link.target="_blank"; link.rel="noopener noreferrer"; link.setAttribute("aria-label",`${tr("Open source:")} ${item.title}`); card.append(link);
    const footer=node("div","evidence-footer"); footer.append(node("span",`${tr("Added")} ${new Date(item.addedAt).toLocaleDateString(language==="de"?"de-DE":"en-US")}`));
    const remove=node("button","small-action","Remove note"); remove.type="button"; remove.addEventListener("click",()=>{data.evidence=data.evidence.filter(x=>x.id!==item.id);if(data.draftEvidenceId===item.id){data.draftEvidenceId="";data.draft="";}touch(`Removed evidence note ${item.title}.`);});footer.append(remove);card.append(footer);list.append(card);
  });
}
function renderQuestions() {
  const list=$("question-list"); list.replaceChildren(); $("question-count").textContent=language==="de"?pluralLabel(data.questions.length,"OPEN","OFFENE FRAGE","OFFENE FRAGEN"):`${data.questions.length} OPEN`;
  if (!data.questions.length) list.append(node("li","empty-inline","No open questions recorded."));
  data.questions.forEach((question,index)=>{const li=node("li");li.append(node("span","question-bullet","?"),node("span","task-copy",question));const remove=node("button","small-action","Remove");remove.type="button";remove.addEventListener("click",()=>{data.questions.splice(index,1);touch("Removed an open question.");});li.append(remove);list.append(li);});
}
function renderTasks() {
  const list=$("task-list"); list.replaceChildren(); const open=data.tasks.filter(t=>!t.done).length;
  $("task-count").textContent=pluralLabel(data.tasks.length,"TASK","AUFGABE","AUFGABEN");
  if (!data.tasks.length) list.append(node("li","empty-inline","No next steps yet."));
  data.tasks.forEach((task,index)=>{const li=node("li",`task-item${task.done?" done":""}`);const check=document.createElement("input");check.type="checkbox";check.checked=task.done;check.setAttribute("aria-label",`${tr("Mark")} ${task.text} ${tr(task.done?"complete":"open")}`);check.addEventListener("change",()=>{data.tasks[index].done=check.checked;touch(check.checked?"Completed a next step.":"Reopened a next step.");});const copy=node("span","task-copy",task.text);if(task.due)copy.append(node("small","task-due",`${tr("Due")} ${task.due}`));const remove=node("button","small-action","Remove");remove.type="button";remove.addEventListener("click",()=>{data.tasks=data.tasks.filter(x=>x.id!==task.id);touch("Removed a next step.");});li.append(check,copy,remove);list.append(li);});
}
function reportSections() {
  const signals=data.evidence.filter(x=>x.kind==="signal"), risks=data.evidence.filter(x=>x.kind==="constraint"), unknown=data.evidence.filter(x=>x.kind==="unknown");
  return {signals,risks,unknown};
}
function renderReport() {
  const host=$("report-preview"); host.replaceChildren(); const lead=data.lead;
  if (!lead) {const empty=node("div","empty-report");empty.append(node("span","empty-mark","R"),node("h3","","Your brief will appear here."),node("p","","Save an account and add source notes. The brief uses only the content you enter and labels each item by its source ID."));host.append(empty);$("report-date").textContent=tr("NOT CREATED");return;}
  const {signals,risks,unknown}=reportSections();
  host.append(node("h3","",lead.name),node("div","report-company-url",lead.url));
  if(lead.segment)host.append(node("p","report-footer",lead.segment));
  if(lead.question){const block=node("div");block.append(node("div","report-section-label","Research question"));const row=node("div","report-item");row.append(node("span","report-ref","Q"),node("span","",lead.question));block.append(row);host.append(block);}
  const confidence=(value)=>language==="de"?{high:"hohe Sicherheit",medium:"mittlere Sicherheit",low:"niedrige Sicherheit"}[value]:`${value} confidence`;
  const display=(value)=>lead.fictional?tr(value):value;
  const put=(title,items,emptyText)=>{const section=node("section");section.append(node("div","report-section-label",title));if(!items.length)section.append(node("p","report-footer",emptyText));items.forEach(item=>{const i=data.evidence.indexOf(item);const row=node("div","report-item");row.append(node("span","report-ref",`E-${String(i+1).padStart(2,"0")}`),node("span","",`${display(item.observation)} (${confidence(item.confidence)}; ${tr("user-classified")})`));section.append(row);});host.append(section);};
  put("Potential signals",signals,"No potential signals recorded.");put("Constraints and risks",risks,"No constraints or risks recorded.");put("Unknowns",unknown,"No source-related unknowns recorded.");
  const q=node("section");q.append(node("div","report-section-label","Open questions"));if(data.questions.length){data.questions.forEach(question=>{const row=node("div","report-item");row.append(node("span","report-ref","?"),node("span","",display(question)));q.append(row);});}else q.append(node("p","report-footer","No additional questions recorded."));host.append(q);
  const tasks=data.tasks.filter(t=>!t.done);const next=node("section");next.append(node("div","report-section-label","Next steps"));if(tasks.length){tasks.forEach(task=>{const row=node("div","report-item");row.append(node("span","report-ref","→"),node("span","",`${display(task.text)}${task.due?` (${tr("Due")} ${task.due})`:""}`));next.append(row);});}else next.append(node("p","report-footer","No open next steps recorded."));host.append(next);
  host.append(node("p","report-footer","Generated from user-entered notes. Source content was not fetched or independently verified. This brief is a working aid, not a validated account assessment."));
  $("report-date").textContent=`${tr("Updated")} ${new Date(data.updatedAt).toLocaleDateString(language==="de"?"de-DE":"en-US")}`;
}
function renderDraftOptions() {
  const select=$("draft-evidence"), prior=data.draftEvidenceId;select.replaceChildren();
  const options=data.evidence.filter(x=>x.kind==="signal");
  const blank=document.createElement("option");blank.value="";blank.textContent=tr(options.length?"Choose a signal":"Add a potential signal first");select.append(blank);
  options.forEach(item=>{const option=document.createElement("option");option.value=item.id;option.textContent=tr(item.title);select.append(option);});
  select.disabled=!data.lead||!options.length;
  if(options.some(x=>x.id===prior))select.value=prior;
  $("generate-draft").disabled=!select.value;
  $("draft-text").value=data.draft||"";
  $("save-draft").disabled=!data.lead||!data.draft.trim();
}
function renderActivity() {
  const list=$("activity-list"); if(!list)return; list.replaceChildren(); $("activity-count").textContent=pluralLabel(data.activity.length,"EVENT","EREIGNIS","EREIGNISSE");
  if(!data.activity.length){list.append(node("li","empty-inline","Your edits appear here for this browser session."));return;}
  data.activity.forEach(item=>{const li=node("li","activity-item");const date=node("time","activity-time",new Date(item.at).toLocaleTimeString(language==="de"?"de-DE":"en-US", {hour:"2-digit",minute:"2-digit"}));li.append(date,node("span","",item.message));list.append(li);});
}
function render() {
  const lead=data.lead;
  $("company-name").value=lead?.name||"";$("company-url").value=lead?.url||"";$("company-segment").value=lead?(lead.fictional?tr(lead.segment):lead.segment):"";$("research-question").value=lead?(lead.fictional?tr(lead.question):lead.question):"";
  $("lead-badge").textContent=tr(lead?(lead.fictional?"FICTIONAL SAMPLE":"WORKING ACCOUNT"):"NO ACCOUNT");$("lead-badge").className=`badge ${lead?"active":"muted"}`;
  $("add-evidence").disabled=!lead;$("add-question").disabled=!lead;$("add-task").disabled=!lead;
  $("lead-message").textContent=tr(lead?"Context is in this browser workspace.":"");$("evidence-message").textContent=tr(lead?"No external lookup or upload occurs.":"Save an account first.");
  const total=data.evidence.length;$("coverage-total").textContent=String(total);$("signal-count").textContent=String(data.evidence.filter(x=>x.kind==="signal").length);$("constraint-count").textContent=String(data.evidence.filter(x=>x.kind==="constraint").length);$("coverage-unknown").textContent=String(data.evidence.filter(x=>x.kind==="unknown").length+data.questions.length);
  $("export-md").disabled=!lead;$("export-json").disabled=!lead;$("mark-reviewed").disabled=!lead;$("mark-reviewed").textContent=tr(data.reviewed?"Reviewed ✓":"Mark reviewed");
  $("review-status").textContent=tr(data.reviewed?"REVIEWED BY YOU · NO EXTERNAL ACTION":"NOT REVIEWED · DRAFT");$("review-status").classList.toggle("reviewed",data.reviewed);
  renderEvidence();renderQuestions();renderTasks();renderReport();renderDraftOptions();renderActivity();
}
function markdownBrief() {
  const lead=data.lead,{signals,risks,unknown}=reportSections();
  const display=(value)=>lead.fictional?tr(value):value;
  const heading=(english)=>tr(english);
  const confidence=(value)=>language==="de"?{high:"hohe Sicherheit",medium:"mittlere Sicherheit",low:"niedrige Sicherheit"}[value]:`${value} confidence`;
  const section=(title,items)=>`## ${heading(title)}\n\n${items.length?items.map(x=>`- ${display(x.observation)} ([${display(x.title)}](${x.url}); ${confidence(x.confidence)}; ${tr("user-classified")})`).join("\n"):"- "+tr("None recorded.")}\n`;
  const questions=data.questions.length?data.questions.map(q=>`- ${display(q)}`).join("\n"):"- "+tr("None recorded.");
  const tasks=data.tasks.filter(t=>!t.done);
  const nextSteps=tasks.length?tasks.map(t=>`- ${display(t.text)}${t.due?` (${tr("Due")} ${t.due})`:""}`).join("\n"):"- "+tr("None recorded.");
  const disclaimer=language==="de"?"Aus deinen Notizen erstellt. Quellen wurden weder abgerufen noch unabhängig geprüft. Dieses Briefing ist eine Arbeitshilfe und keine bestätigte Unternehmensbewertung.":"Generated from user-entered notes. Source pages were not fetched or independently verified. This is a working aid, not a validated account assessment.";
  const review=data.reviewed?tr("Marked reviewed by the user in this browser workspace."):tr("Draft; not reviewed.");
  return `# ${heading("Account research brief")}: ${lead.name}\n\n- ${heading("Website")}: ${lead.url}\n- ${heading("Segment/context")}: ${display(lead.segment)||tr("Not recorded")}\n- ${heading("Research question")}: ${display(lead.question)||tr("Not recorded")}\n- ${heading("Updated")}: ${new Date(data.updatedAt).toLocaleString(language==="de"?"de-DE":"en-US")}\n\n${disclaimer}\n\n${section("Potential signals",signals)}\n${section("Constraints and risks",risks)}\n${section("Unknowns",unknown)}\n## ${heading("Open questions")}\n\n${questions}\n\n## ${heading("Next steps")}\n\n${nextSteps}\n\n## ${heading("Review status")}\n\n${review}\n\n${tr("No outreach was sent.")}\n`;
}
function download(filename,mime,content) {
  const blob=new Blob([content],{type:mime});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function slug(value){return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,60)||"account";}

$("lead-form").addEventListener("submit",(event)=>{event.preventDefault();const name=$("company-name").value.trim(),url=safeUrl($("company-url").value);if(!name||!url){showToast("Enter a company name and a valid public HTTPS URL.");return;}const previous=data.lead;data.lead={id:previous?.id||makeId(),name,url,segment:$("company-segment").value.trim(),question:$("research-question").value.trim(),fictional:false,createdAt:previous?.createdAt||new Date().toISOString()};touch(previous?"Updated account context.":"Created account context.");showToast("Account context saved in the current workspace.");});
$("evidence-form").addEventListener("submit",(event)=>{event.preventDefault();if(!data.lead)return;const title=$("source-title").value.trim(),url=safeUrl($("source-url").value),observation=$("source-note").value.trim();if(!title||!url||!observation){showToast("Add a title, HTTPS source URL, and direct observation.");return;}const id=makeId();data.evidence.push({id,title,url,observation,kind:$("source-kind").value,confidence:$("source-confidence").value,addedAt:new Date().toISOString()});event.target.reset();touch(`Added evidence note ${title}.`);showToast("Source note added. It was not independently verified.");});
$("question-form").addEventListener("submit",(event)=>{event.preventDefault();const q=$("new-question").value.trim();if(!q||!data.lead)return;data.questions.push(q);$("new-question").value="";touch("Added an open question.");});
$("task-form").addEventListener("submit",(event)=>{event.preventDefault();const text=$("new-task").value.trim();if(!text||!data.lead)return;data.tasks.push({id:makeId(),text,due:$("task-date").value,done:false});$("new-task").value="";$("task-date").value="";touch("Added a next step.");});
$("draft-evidence").addEventListener("change",()=>{$("generate-draft").disabled=!$("draft-evidence").value;});
$("generate-draft").addEventListener("click",()=>{const item=data.evidence.find(x=>x.id===$("draft-evidence").value);if(!item||!data.lead)return;data.draftEvidenceId=item.id;const draftTitle=data.lead.fictional?tr(item.title):item.title;const draftObservation=data.lead.fictional?tr(item.observation):item.observation;data.draft=language==="de"?`Hallo ${data.lead.name}-Team,\n\nauf Ihrer öffentlich zugänglichen Seite „${draftTitle}“ ist mir Folgendes aufgefallen: „${draftObservation}“\n\nIst das ein Thema, mit dem sich Ihr Team gerade beschäftigt? Falls es relevant ist, kann ich gern einige kurze Vergleichsfragen zusammenstellen.\n\nFreundliche Grüße\n[Dein Name]\n\nQuelle vor der Verwendung prüfen: ${item.url}`:`Hello ${data.lead.name} team,\n\nI noticed this public information on your ${draftTitle}: “${draftObservation}”\n\nIs this an area your team is currently reviewing? If it is relevant, I can share a short set of questions for comparing approaches.\n\nBest,\n[Your name]\n\nSource to verify before use: ${item.url}`;data.reviewed=false;persist();render();showToast("Draft created from one selected note. Review and edit it before reuse.");});
$("draft-text").addEventListener("input",()=>{$("save-draft").disabled=!data.lead||!$("draft-text").value.trim();});
$("save-draft").addEventListener("click",()=>{data.draft=$("draft-text").value.trim();data.draftEvidenceId=$("draft-evidence").value||data.draftEvidenceId;touch("Saved an internal outreach draft.");showToast("Draft saved in the current project. Nothing was sent.");});
$("mark-reviewed").addEventListener("click",()=>{if(!data.lead)return;data.reviewed=!data.reviewed;if(data.reviewed)addActivity("Marked the brief reviewed in this browser workspace.");else addActivity("Reopened the brief for review.");persist();render();showToast(data.reviewed?"Review marker recorded. No message was sent.":"Review marker removed.");});
$("remember-data").addEventListener("change",()=>{if($("remember-data").checked){persist();showToast("Opted in: this workspace is saved in this browser only.");}else{localStorage.removeItem(STORAGE_KEY);showToast("Local copy removed. Export a backup first if you need one.");}render();});
$("load-sample").addEventListener("click",loadSample);
$("clear-workspace").addEventListener("click",()=>{if(!confirm(tr("Clear this workspace from the page and this browser's saved copy? Export a backup first if needed.")))return;data=freshWorkspace();localStorage.removeItem(STORAGE_KEY);$("remember-data").checked=false;render();showToast("Workspace cleared from this page and local storage.");});
$("export-md").addEventListener("click",()=>{if(!data.lead)return;download(`${slug(data.lead.name)}-research-brief.md`,"text/markdown;charset=utf-8",markdownBrief());addActivity("Exported a Markdown brief.");persist();});
$("export-json").addEventListener("click",()=>{if(!data.lead)return;download(`${slug(data.lead.name)}-research-project.json`,"application/json;charset=utf-8",JSON.stringify({...data,exportedAt:new Date().toISOString()},null,2));addActivity("Exported project JSON.");persist();});
$("import-json").addEventListener("change",(event)=>{const file=event.target.files?.[0];if(!file)return;if(file.size>1_000_000){showToast("Project file exceeds the 1 MB import limit.");event.target.value="";return;}const reader=new FileReader();reader.onload=()=>{try{const parsed=JSON.parse(String(reader.result));if(parsed.version!==APP_VERSION||!parsed.lead||!Array.isArray(parsed.evidence))throw new Error("Unsupported project format");data=normalizeWorkspace(parsed);addActivity("Imported a project file into this browser.");persist();render();showToast("Project imported locally. Check all source notes before use.");}catch{showToast("That file is not a valid Codex Sales Research Studio project export.");}event.target.value="";};reader.onerror=()=>showToast("The selected file could not be read.");reader.readAsText(file);});

$("language-toggle").addEventListener("click",()=>{language=language==="de"?"en":"de";try{localStorage.setItem(LANGUAGE_KEY,language);}catch{}applyLanguage();render();});
applyLanguage();
readStorage();render();
