# DSGVO-/Datenschutz-Audit — Viktor Builds

Stand: 09.10.2026 · geprüfter Commit: `7256c6f` (Standard-Branch `claude/project-thread-ftwihf`)
Art der Prüfung: technische Prüfung, keine Rechtsberatung. Es wurde nichts am Code geändert.

---

## Kann die Website aus technischer Datenschutzsicht im aktuellen Zustand veröffentlicht werden?

**NEIN.**

Die technische Basis ist sehr sauber: kein einziger externer Request, keine Cookies, kein Local/Session Storage, kein Tracking, Fonts und Bilder liegen lokal. Es fehlen aber Pflichtangaben, ohne die ein öffentlicher Launch in Deutschland nicht vertretbar ist: **Impressum** und **Datenschutzerklärung** sind nicht vorhanden (Footer zeigt nur unverlinkten Text), und das Anfrageformular hat **keinen Empfänger** (`mailto:` ohne Adresse). Sind diese drei Punkte behoben und Hosting/E-Mail-Anbieter geklärt, lautet die Antwort voraussichtlich **JA, ABER** (Restpunkte siehe Checkliste).

---

## Methodik und Prüfumfang

**A — im Repository technisch geprüft**

| Bereich | Wie geprüft |
|---|---|
| Quellcode | alle Dateien unter `src/` (JSX, JS, CSS), `index.html`, `vite.config.js`, `package.json`, `package-lock.json`, `.gitignore`, `public/` |
| Suche | Volltextsuche nach externen URLs, `fetch`, `XMLHttpRequest`, `sendBeacon`, `WebSocket`, `localStorage`, `sessionStorage`, `document.cookie`, `indexedDB`, `iframe`, `gtag`, `dataLayer`, `@import`, `url(` |
| Build | `npm run build` (Vite) und Suche im fertigen Bundle `dist/` nach URLs und Storage-Zugriffen |
| Browser | Playwright/Chromium gegen den lokalen Produktions-Build (`vite preview`): Desktop 1440×900, Mobil 390×844, Reduced Motion. Je Lauf: erster Aufruf, komplettes Durchscrollen, Formular ausfüllen und absenden. Mitgeschnitten: alle Requests mit Ziel-Host, Cookies, Local/Session Storage, Console, Navigationen |
| Bilder | alle 18 WebP-Dateien auf EXIF-/XMP-Metadaten geprüft (RIFF-Chunks) |
| Fonts | alle 5 `.woff2`-Dateien auf Echtheit und lokale Auslieferung geprüft |

**B — nicht aus dem Repository prüfbar** (siehe Abschnitt 13): Hosting, Server-Logs, CDN, Domain/DNS, E-Mail-Anbieter, Verträge, echte Unternehmensdaten, Inhalt von Impressum und Datenschutzerklärung (existieren noch nicht).

**Nicht geprüft:** die Live-Vorschau auf claude.ai. Sie ist eine private Vorschau auf Anthropic-Infrastruktur und nicht das spätere Hosting; ihre Datenflüsse sagen über den Launch nichts aus (siehe F-11).

**Kennzeichnung der Rechtsgebiete:** Jeder Fund trägt ein Kürzel. **[DSGVO]** = Datenschutz-Grundverordnung. Getrennt davon: **[TDDDG]** = Zugriff auf Endgeräte (§ 25 TDDDG), **[DDG]** = Impressum/Anbieterkennzeichnung (§ 5 DDG), **[UWG]** = Werbeaussagen, **[KUG]** = Recht am eigenen Bild.

---

## 1. Executive Summary

| Ergebnis | Befund |
|---|---|
| Externe Requests | **0** — in allen drei Browser-Läufen gingen sämtliche Requests (16 je Lauf: HTML, JS, CSS, 5 Fonts, Bilder) an den eigenen Host |
| Cookies | **0** |
| Local / Session Storage | **leer**, kein Zugriff im Code oder im Bundle |
| Tracking / Analytics | **keins** vorhanden |
| Drittanbieter-Skripte, Embeds, Maps, Videos, Social | **keine** |
| Fonts | **alle lokal** (5 × WOFF2, selbst gehostet), keine Google-Fonts-Verbindung |
| Bilder | **alle lokal**, ohne Metadaten; Pexels-Links nur als Text im Bundle, kein Request |
| Formular | kein Backend, kein Drittanbieter; Absenden öffnet das E-Mail-Programm des Besuchers (`mailto:`) — **aber ohne Empfänger** |
| Console | keine Fehler, keine Warnungen |
| Consent-Banner | **nicht erforderlich** (Begründung in Abschnitt 5) |
| Impressum | **fehlt** |
| Datenschutzerklärung | **fehlt** |
| Hosting / Server-Logs | **nicht aus Code prüfbar**, keine Deploy-Konfiguration im Repo |

**Bewertung in einem Satz:** Datenschutz durch Technikgestaltung ist vorbildlich umgesetzt; die Lücken liegen ausschließlich bei Pflichtinformationen, einer fehlenden Konfiguration (Empfänger-Adresse) und bei Punkten außerhalb des Codes (Hosting, E-Mail, Verträge).

Eine Aussage wie „die Website ist vollständig DSGVO-konform“ ist auf Basis des Codes **nicht** möglich, weil Hosting, Server-Logs, E-Mail-Verarbeitung und die Rechtstexte außerhalb des Repositorys liegen bzw. noch fehlen.

### Übersicht aller Funde

| ID | Fund | Schweregrad | Gebiet | A/B |
|---|---|---|---|---|
| F-01 | Impressum fehlt | **BLOCKER** | [DDG] | A + B |
| F-02 | Datenschutzerklärung fehlt | **BLOCKER** | [DSGVO] | A + B |
| F-03 | Anfrageformular ohne Empfänger-Adresse | **BLOCKER** | [DSGVO] / Funktion | A |
| F-04 | Hosting, Server-Logs, CDN unbekannt | **HOCH** | [DSGVO] | B |
| F-05 | E-Mail-Anbieter für Anfragen unbekannt | **HOCH** | [DSGVO] | B |
| F-06 | Kein Link zur Datenschutzerklärung am Formular | MITTEL | [DSGVO] | A |
| F-07 | Hinweis „Gespeichert wird nichts.“ ist zu weit gefasst | MITTEL | [DSGVO] | A |
| F-08 | Rechtliche Links erst nach ~23 Bildschirmhöhen | MITTEL | [DDG] / [DSGVO] | A |
| F-09 | Werbeaussage „DSGVO-gerecht“ ohne eigene Datenschutzerklärung | MITTEL | [UWG] | A |
| F-10 | Keine Sicherheits-Header / kein HTTPS-Zwang im Repo | NIEDRIG | [DSGVO] Art. 32 | A + B |
| F-11 | Live-Vorschau auf claude.ai ist kein Launch-Ort | NIEDRIG | [DDG] / [DSGVO] | B |
| F-12 | Erkennbare Personen auf Stockfotos | NIEDRIG | [KUG] / [DSGVO] | B |
| F-13 | Externe Requests, Cookies, Storage, Tracking | OK | [DSGVO] / [TDDDG] | A |
| F-14 | Fonts | OK | [DSGVO] | A |
| F-15 | Bilder und Medien | OK | [DSGVO] | A |
| F-16 | Formular: Felder, Datenminimierung, keine Checkbox nötig | OK | [DSGVO] | A |
| F-17 | Abhängigkeiten (npm) | OK | [DSGVO] | A |

---

## 2. Launch Blocker

Vor dem Launch zwingend zu beheben:

1. **F-01 Impressum fehlt** — `src/site/content.js:229` (`imprintUrl: ''`), Anzeige `src/scenes/SceneResult.jsx:5` + `:92`.
2. **F-02 Datenschutzerklärung fehlt** — `src/site/content.js:230` (`privacyUrl: ''`), gleiche Anzeige.
3. **F-03 Formular ohne Empfänger** — `src/site/content.js:225` (`email: ''`) → `src/components/ProjectRequest.jsx:17` erzeugt `mailto:?subject=…`.

Zusätzlich vor dem Launch zu **klären** (nicht im Code lösbar, aber Voraussetzung für eine korrekte Datenschutzerklärung): **F-04 Hosting** und **F-05 E-Mail-Anbieter**.

---

## 3. Kritische Findings

### F-01 — Impressum fehlt

1. **Problem:** Es gibt kein Impressum. Der Footer zeigt „Impressum“ nur als unverlinkten Text.
2. **Schweregrad:** BLOCKER · **[DDG]** (nicht DSGVO)
3. **Datei/Zeile:** `src/site/content.js:229` (`imprintUrl: ''`); `src/scenes/SceneResult.jsx:5` rendert ohne URL ein `<span>` statt eines Links; Footer `src/scenes/SceneResult.jsx:92`.
4. **Technischer Befund:** Browser-Prüfung: `.footer__legal` enthält `SPAN:Impressum:null`. Es existiert keine Impressum-Seite oder -Sektion im Projekt (`public/` enthält nur Fonts).
5. **Warum relevant:** Viktor Builds bietet geschäftsmäßig Leistungen gegen Entgelt an. Damit gilt die Anbieterkennzeichnung nach § 5 DDG (seit 14.05.2024, ersetzt § 5 TMG). Fehlt sie, drohen Abmahnungen und Bußgelder. Zudem braucht die Datenschutzerklärung einen benannten Verantwortlichen; das Impressum ist der übliche Ort für dieselben Kontaktdaten.
6. **Betroffene Daten:** keine Besucherdaten; es fehlen Viktors Pflichtangaben.
7. **Empfohlene Lösung:** Eigene Impressum-Seite (z. B. statische Seite `impressum.html` in `public/` oder eine eigene Route) mit mindestens: vollständiger Name, ladungsfähige Anschrift (kein Postfach), E-Mail-Adresse, ein weiterer schneller Kontaktweg (in der Praxis Telefon), ggf. USt-IdNr. oder Wirtschafts-IdNr., ggf. Handelsregister. Dann `imprintUrl` setzen. Hinweis: Die EU-OS-Plattform wurde zum 20.07.2025 eingestellt; ein Link darauf aus alten Mustern sollte **nicht** übernommen werden. Ob ein Hinweis zur Verbraucherschlichtung (§ 36 VSBG) nötig ist, hängt von Betriebsgröße und Kundenkreis ab (B).
8. **Technisch im Repo möglich:** Ja (Seite + Link).
9. **Externe Prüfung nötig:** Ja — die Angaben selbst (Rechtsform, Anschrift, Steuer-IDs) kann nur Viktor liefern; Wortlaut ggf. rechtlich prüfen lassen.

### F-02 — Datenschutzerklärung fehlt

1. **Problem:** Es gibt keine Datenschutzerklärung. „Datenschutz“ im Footer ist unverlinkter Text.
2. **Schweregrad:** BLOCKER · **[DSGVO]**
3. **Datei/Zeile:** `src/site/content.js:230` (`privacyUrl: ''`); `src/scenes/SceneResult.jsx:5`, `:92`.
4. **Technischer Befund:** Browser: `SPAN:Datenschutz:null`. Keine Seite vorhanden. Auch ohne Cookies und Tracking werden personenbezogene Daten verarbeitet: mindestens die **IP-Adresse** und Zugriffsdaten beim Abruf durch den Hoster (Server-Logs) sowie die **Anfragedaten** per E-Mail.
5. **Warum relevant:** Art. 13 DSGVO verlangt bei jeder Erhebung personenbezogener Daten Informationen an die Betroffenen. Eine Website ohne Datenschutzerklärung ist in Deutschland ein typischer Abmahn- und Beschwerdegrund.
6. **Betroffene Daten:** IP-Adresse, Zeitpunkt, aufgerufene URL, Browser-Kennung, Referrer (Server-Logs, B); Name, E-Mail oder Telefonnummer, Unternehmensbeschreibung, Ziele, Zeitrahmen (Anfrage per E-Mail).
7. **Empfohlene Lösung:** Eine **zur tatsächlichen Website passende** Datenschutzerklärung (Inhalt siehe Abschnitt 10). Kein generisches Muster mit Diensten, die gar nicht eingesetzt werden (kein Google Analytics, keine Google Fonts, keine Cookies, kein Newsletter, keine Social Plugins). Als eigene Seite, `privacyUrl` setzen.
8. **Technisch im Repo möglich:** Ja (Seite + Link). Inhalt hängt von F-04 und F-05 ab.
9. **Externe Prüfung nötig:** Ja — Hoster, E-Mail-Anbieter, Speicherfristen und Verantwortlicher müssen feststehen.

### F-03 — Anfrageformular ohne Empfänger-Adresse

1. **Problem:** Beim Absenden öffnet sich das E-Mail-Programm mit **leerem Empfänger**.
2. **Schweregrad:** BLOCKER · **[DSGVO]** (Empfänger unbestimmt) und Funktionsfehler
3. **Datei/Zeile:** `src/site/content.js:225` (`email: ''`); `src/components/ProjectRequest.jsx:17` (`` `mailto:${contact.email}?${query}` ``).
4. **Technischer Befund:** Browser-Test erzeugte `mailto:?subject=Projektanfrage&body=…` mit allen Formularangaben im Text, aber ohne Adresse. Die Bestätigung „Danke. Ihre Anfrage ist fertig.“ erscheint trotzdem (`ProjectRequest.jsx:62–74`).
5. **Warum relevant:** Die Anfrage erreicht Viktor nicht. Besucher müssen selbst eine Adresse eintragen; dabei können ihre Angaben an einen falschen Empfänger gehen. Gleichzeitig suggeriert die Bestätigung einen Erfolg, der nicht eingetreten ist.
6. **Betroffene Daten:** Name, E-Mail oder Telefon, Angaben zum Unternehmen.
7. **Empfohlene Lösung:** Echte geschäftliche E-Mail-Adresse in `contact.email` eintragen. Optional als Absicherung: Formular nicht anzeigen bzw. Absenden sperren, solange `contact.email` leer ist.
8. **Technisch im Repo möglich:** Ja.
9. **Externe Prüfung nötig:** Ja — welcher E-Mail-Anbieter dahintersteht (F-05).

### F-04 — Hosting, Server-Logs und CDN unbekannt

1. **Problem:** Wo und bei wem die Seite gehostet wird, ist nicht festgelegt.
2. **Schweregrad:** HOCH · **[DSGVO]**
3. **Datei/Zeile:** keine — im Repo gibt es **keine** Deploy-Konfiguration (kein `netlify.toml`, `vercel.json`, `wrangler.toml`, `_headers`, `_redirects`, kein `.github/workflows`).
4. **Technischer Befund:** `NICHT AUS CODE PRÜFBAR – HOSTING/VERTRAG PRÜFEN`. Die Seite ist ein statischer Vite-Build (`dist/`), sie braucht keinen Server-Code.
5. **Warum relevant:** Jeder Hoster verarbeitet beim Abruf die IP-Adresse der Besucher und protokolliert sie meist (Server-Logs). Das ist eine Auftragsverarbeitung (Art. 28 DSGVO). Bei Anbietern mit Sitz oder Infrastruktur außerhalb der EU/des EWR kommt ein Drittlandtransfer hinzu (Art. 44 ff. DSGVO). Manche CDNs setzen eigene Cookies (z. B. Bot-Schutz), die der Code nicht zeigt.
6. **Betroffene Daten:** IP-Adresse, Zeitstempel, URL, User-Agent, Referrer, ggf. Geodaten aus der IP.
7. **Empfohlene Lösung:** Hoster wählen und dokumentieren; bevorzugt mit Sitz und Rechenzentrum in der EU. AV-Vertrag abschließen. Log-Umfang und Aufbewahrungsdauer (üblich: wenige Tage bis max. ~30 Tage) beim Anbieter klären. Nach dem Deployment den Live-Test aus diesem Bericht auf der echten Domain wiederholen (Cookies, Requests).
8. **Technisch im Repo möglich:** Teilweise (Header-Konfiguration, siehe F-10). Die eigentliche Klärung nicht.
9. **Externe Prüfung nötig:** Ja — Vertrag, AVV, Serverstandort, Log-Retention, ggf. DPF-Zertifizierung bzw. Standardvertragsklauseln.

### F-05 — E-Mail-Anbieter für Anfragen unbekannt

1. **Problem:** Anfragen kommen per E-Mail; über welchen Anbieter sie empfangen und gespeichert werden, ist offen.
2. **Schweregrad:** HOCH · **[DSGVO]**
3. **Datei/Zeile:** `src/site/content.js:225` (Adresse fehlt noch).
4. **Technischer Befund:** `NICHT AUS CODE PRÜFBAR – E-MAIL-ANBIETER/VERTRAG PRÜFEN`. Die Website selbst überträgt nichts; die Nachricht läuft vom E-Mail-Anbieter des Besuchers zu Viktors E-Mail-Anbieter.
5. **Warum relevant:** Viktors E-Mail-Anbieter speichert die Anfragen in seinem Auftrag (Art. 28 DSGVO). Je nach Anbieter (z. B. US-Dienste) liegt ein Drittlandtransfer vor. Die Datenschutzerklärung muss Empfänger, Rechtsgrundlage und Speicherdauer nennen.
6. **Betroffene Daten:** alle Formularangaben plus E-Mail-Metadaten (Absenderadresse, Zeitpunkt, IP in Mail-Headern).
7. **Empfohlene Lösung:** Geschäftliche Adresse bei einem Anbieter mit AV-Vertrag, möglichst EU. Speicherdauer festlegen (z. B. Löschung, wenn kein Auftrag zustande kommt, nach einer definierten Frist; bei Auftrag gesetzliche Aufbewahrungsfristen prüfen, soweit einschlägig). TLS-Verschlüsselung beim Anbieter sicherstellen.
8. **Technisch im Repo möglich:** Nein (nur die Adresse eintragen).
9. **Externe Prüfung nötig:** Ja.

### F-08 — Rechtliche Links erst am Ende einer sehr langen Seite

1. **Problem:** Impressum und Datenschutz stehen nur im Footer.
2. **Schweregrad:** MITTEL
3. **Datei/Zeile:** `src/scenes/SceneResult.jsx:87–98`, eingebunden in `src/App.jsx`.
4. **Befund:** Gemessen: Footer beginnt bei ca. 21 100 px von 21 200 px (Desktop, ≈ 23,6 Bildschirmhöhen); mobil bei ca. 17 000 px (≈ 20 Bildschirmhöhen). Ein großer Teil davon ist gepinnte Scroll-Animation. Per Tastatur sind es wenige Tab-Schritte (13 fokussierbare Elemente insgesamt).
5. **Warum relevant:** Das Impressum muss „leicht erkennbar, unmittelbar erreichbar und ständig verfügbar“ sein (§ 5 DDG); Datenschutzinformationen müssen leicht zugänglich sein (Art. 12 DSGVO). Ein Footer-Link ist üblich und meist ausreichend, bei über 20 Bildschirmhöhen Scrollytelling aber angreifbar.
6. **Betroffene Daten:** keine.
7. **Lösung:** Die beiden Links zusätzlich früh erreichbar machen, z. B. dezent in der ersten Ansicht (Scene 01) oder als kleine feste Ecke; gestalterisch zurückhaltend, passend zum Konzept.
8. **Im Repo möglich:** Ja.
9. **Externe Prüfung:** Optional rechtliche Einschätzung.

---

## 4. Externe Requests

**Ergebnis: Es gibt keine externen Requests.**

Browser-Mitschnitt (Produktions-Build, Chromium):

| Lauf | Erster Aufruf | Nach komplettem Scrollen | Nach Formular | Externe Hosts |
|---|---|---|---|---|
| Desktop 1440×900 | 4 (Rest lädt beim Scrollen) | 16 gesamt | +1 `mailto:` (lokal, kein HTTP) | **keine** |
| Mobil 390×844 | 16 | 16 | +1 `mailto:` | **keine** |
| Reduced Motion | 16 | 16 | +1 `mailto:` | **keine** |

Ressourcentypen: `document`, `script`, `stylesheet`, `font`, `image` — alle vom eigenen Host.

Geprüfte Dienste — **keiner im Einsatz:** Google Fonts, Google APIs, Google Analytics, Google Tag Manager, Meta/Facebook, Instagram, YouTube, Vimeo, Google Maps/andere Karten, Calendly, reCAPTCHA, Cloudflare (Skripte/Turnstile/Insights), externe CDNs (jsDelivr, unpkg, cdnjs), externe Bildhoster, externe Font-CDNs, Form-/Mail-Dienste (Formspree, EmailJS u. ä.), sonstige SaaS.

URLs im ausgelieferten Bundle (`dist/assets/index-*.js`), die **keine** Requests auslösen:

| String | Herkunft | Request? |
|---|---|---|
| `http://www.w3.org/...` | XML-/SVG-Namespaces von React | nein |
| `https://react.dev/errors/` | Fehlertext von React | nein |
| `https://gsap.com` | Text einer GSAP-Konsolenwarnung („target not found“) | nein |
| `https://www.pexels.com/photo/…` (8×) | Bildnachweis-Metadaten aus `src/site/media.js:54` ff., werden nicht gerendert | nein |

Links zu Drittanbietern auf der Seite: **keine**. Alle Links sind `#kontakt` oder `mailto:`. `target="_blank"` kommt nicht vor.

Favicon: `index.html:8` nutzt `data:,` — kein Request auf `/favicon.ico`.

Bewertung: **OK (F-13)**.

---

## 5. Cookies & Storage

| Technik | Befund (Code + Browser) | Klassifizierung |
|---|---|---|
| Cookies | keine gesetzt (`context.cookies()` leer, `document.cookie` leer) | — |
| Local Storage | leer, kein Zugriff in Code oder Bundle | — |
| Session Storage | leer, kein Zugriff | — |
| IndexedDB, Cache API, Service Worker | nicht verwendet | — |
| Tracking-IDs | keine | — |
| Fingerprinting | keins (kein Canvas-/WebGL-/Audio-Auslesen, kein `navigator.*`, kein `userAgent`, keine Übertragung von Geräteeigenschaften) | — |
| `matchMedia` (GSAP, `src/scenes/IntroStage.jsx:17`) | liest Bildschirmbreite und „Bewegung reduzieren“ im Browser, um die Animation anzupassen; nichts wird gespeichert oder übertragen | technisch notwendig |
| Browser-Cache für Fonts/Bilder/JS | normales Laden der Seite | technisch notwendig |

**Consent-Banner: aktuell NICHT erforderlich.** Begründung:
- § 25 Abs. 1 TDDDG verlangt Einwilligung nur für das Speichern von bzw. den Zugriff auf Informationen im Endgerät, wenn dies **nicht unbedingt erforderlich** ist. Die Seite setzt keine Cookies und nutzt keinen Storage. Das Auslesen von Bildschirmgröße und Bewegungseinstellung dient allein der Darstellung des vom Besucher aufgerufenen Dienstes und bleibt im Browser (§ 25 Abs. 2 Nr. 2 TDDDG). **[TDDDG]**
- Es gibt keine Datenübermittlung an Dritte (keine externen Requests), für die eine Einwilligung nach DSGVO als Rechtsgrundlage nötig wäre. **[DSGVO]**
- Ein Banner ohne Anlass wäre sogar nachteilig: er suggeriert Tracking, kostet Nutzerfreundlichkeit und passt nicht zu „DSGVO-gerecht“.

**Vorbehalt (B):** Das gilt für den Code. Setzt der spätere Hoster/CDN eigene Cookies oder Skripte ein, muss neu bewertet werden → Live-Test nach Deployment (Checkliste).

Bewertung: **OK (F-13)**.

---

## 6. Fonts

| Font | Datei | Lokal? | Echt WOFF2? | Lizenz |
|---|---|---|---|---|
| Geist | `public/fonts/geist-latin-wght.woff2` | ja | ja (29 KB) | OFL, Lizenzdatei liegt bei |
| Geist (nur ẞ) | `public/fonts/geist-sharp-s-wght.woff2` | ja | ja (1 KB) | OFL, aus dem latin-ext-Subset |
| Schibsted Grotesk | `public/fonts/schibsted-grotesk-latin-wght.woff2` | ja | ja (47 KB) | OFL |
| Literata | `public/fonts/literata-latin-wght.woff2` | ja | ja (57 KB) | OFL |
| Archivo | `public/fonts/archivo-latin-wdth-wght.woff2` | ja | ja (60 KB) | OFL |
| Atkinson Hyperlegible Next | `public/fonts/atkinson-hyperlegible-next-latin-wght.woff2` | ja | ja (34 KB) | OFL |

- Eingebunden ausschließlich über `@font-face` mit relativen Pfaden: `src/styles/base.css:1–43`.
- Preload: `index.html:10` lädt Geist vom eigenen Host (`crossorigin` ist hier nur für das Font-Caching nötig, kein Fremdzugriff).
- Fallback-Stacks (`src/styles/tokens.css:13, 47, 65, 80, 97`) nennen nur Systemschriften — kein Nachladen.
- Kein `@import`, kein `<link>` zu `fonts.googleapis.com` / `fonts.gstatic.com` oder anderen Font-Diensten. Browser bestätigt: alle Font-Requests gehen an den eigenen Host.
- Alle benötigten Font-Dateien sind vorhanden und landen im Build unter `dist/fonts/`.

Bewertung: **OK (F-14)**. Keine extern geladenen Fonts.

---

## 7. Formulare

Einziges Formular: **„Projekt anfragen“**, `src/components/ProjectRequest.jsx`, Texte `src/site/content.js:190–221`.

### Erhobene Daten

| Feld | Name | Pflicht? | Nötig? | Bewertung |
|---|---|---|---|---|
| Was macht Ihr Unternehmen? | `company` | ja | ja, Kern der Anfrage | OK. Freitext; bei Einzelunternehmern kann er personenbezogen sein, das ist für die Anfrage aber erforderlich |
| Was soll die Website erreichen? | `goal` (Checkboxen) | nein | hilfreich | OK, freiwillig |
| Wann soll es losgehen? | `start` (Radio) | nein | hilfreich | OK, freiwillig |
| Ihr Name | `name` | **nein** | für Anrede hilfreich | OK — gut, dass er freiwillig ist |
| E-Mail oder Telefon | `contact` | ja | ja, für die Antwort | OK — ein Kontaktweg nach Wahl ist Datenminimierung |

Keine Adresse, kein Geburtsdatum, keine Budgetangabe, keine besonderen Kategorien (Art. 9 DSGVO), keine versteckten Felder, keine Honeypots, keine Tracking-Parameter.

### Datenfluss

- `<form>` hat **kein** `action`, **keine** `method` (Browser-Prüfung). Absenden wird abgefangen (`ProjectRequest.jsx:54–60`) und baut eine `mailto:`-URL (`ProjectRequest.jsx:7–18`).
- **Kein Backend, kein Drittanbieter, kein Request an einen Server.** Die Daten verlassen den Browser erst, wenn der Besucher die E-Mail in seinem eigenen E-Mail-Programm abschickt.
- **Personenbezogene Daten in URLs:** Die Formulardaten stehen in der `mailto:`-URL. Diese geht nicht an einen Webserver und erscheint daher nicht in Server-Logs. Hat der Besucher einen Webmail-Dienst als `mailto:`-Handler eingerichtet, öffnet dessen Seite die Nachricht — das liegt in seiner eigenen Wahl. Bewertung: OK.
- **Drittland:** über die Website keiner. Über Viktors E-Mail-Anbieter möglich → F-05 (B).
- **HTTPS:** Für das Formular technisch nicht zwingend, da kein HTTP-Versand; für die Seite insgesamt aber Pflicht (F-10, B).

### Checkbox / Rechtsgrundlage

- **Keine Einwilligungs-Checkbox nötig — und auch keine einbauen.** Wer ein Projekt anfragt, bittet um ein Angebot. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen auf Anfrage der betroffenen Person), hilfsweise lit. f (berechtigtes Interesse an der Beantwortung). Eine Pflicht-Checkbox „Ich willige ein…“ würde fälschlich Einwilligung (lit. a) als Grundlage nahelegen, die jederzeit widerrufbar wäre — das ist hier weder nötig noch sinnvoll.
- Erforderlich ist stattdessen eine **Information** (Art. 13 DSGVO): kurzer Hinweis am Formular mit Link zur Datenschutzerklärung → F-06.

### Funde zum Formular

- **F-03 BLOCKER** — kein Empfänger (Abschnitt 3).
- **F-06 MITTEL — Kein Link zur Datenschutzerklärung am Formular.** `ProjectRequest.jsx:119` zeigt nur `request.note`. Lösung: Satz ergänzen wie „Ihre Angaben verwende ich nur zur Beantwortung Ihrer Anfrage. Mehr dazu in der [Datenschutzerklärung].“ Im Repo lösbar, sobald F-02 erledigt ist.
- **F-07 MITTEL — „Gespeichert wird nichts.“ ist zu weit gefasst.** `src/site/content.js:214`. Für die Website stimmt das, aber die abgeschickte E-Mail wird bei Viktor (und seinem E-Mail-Anbieter) gespeichert. Ein Datenschutzversprechen, das so nicht stimmt, ist angreifbar. Lösung: z. B. „Die Website selbst speichert keine Daten.“ Im Repo lösbar.

Bewertung der Formularstruktur insgesamt: **OK (F-16)**, abgesehen von F-03, F-06, F-07.

---

## 8. Tracking / Analytics

**Es ist aktuell kein Tracking und keine Analytics vorhanden.**

Geprüft im Code, im Bundle und im Browser: kein Google Analytics, kein GA4/`gtag`, kein Tag Manager/`dataLayer`, kein Meta Pixel, kein Matomo/Plausible/Umami, keine Hotjar/Clarity, kein `sendBeacon`, keine Session-Recorder, keine A/B-Testing-Skripte, keine Conversion-Pixel.

Daher entfallen: Einwilligung vor Aktivierung, IP-Kürzung, Consent Mode, AVV und Drittlandprüfung für Analytics.

**Hinweis für später:** Wird Analytics ergänzt, vorher neu bewerten. Datenschutzfreundliche Varianten (cookielos, selbst gehostet bzw. EU) können je nach Ausgestaltung ohne Banner auskommen, jede Lösung mit Cookies/IDs oder US-Anbieter braucht Einwilligung, AVV und Eintrag in der Datenschutzerklärung.

---

## 9. Drittanbieter

### Im Browser des Besuchers

**Keine.** Alle Inhalte werden vom eigenen Host ausgeliefert.

### Bilder und Medien

| Prüfpunkt | Befund |
|---|---|
| Externe Bildquellen / Hotlinking | keine. 18 WebP-Dateien in `src/assets/site/`, beim Build gebündelt nach `dist/assets/` |
| Metadaten (EXIF/XMP, z. B. GPS) | keine — jede Datei enthält nur den Bild-Chunk `VP8` |
| Video-Embeds (YouTube, Vimeo) | keine |
| Social-Media-Embeds | keine |
| Karten (Google Maps, OSM-Embeds) | keine |
| `iframe`, `embed`, `object`, `video`, `audio` | 0 im DOM |
| Bildnachweise | Pexels-URLs als Metadaten in `src/site/media.js:54` ff., nicht gerendert, kein Request |

Lokale Bilder lösen keine Datenübermittlung an Dritte aus; datenschutzrechtlich sind sie damit grundlegend anders zu bewerten als externe Einbindungen. Bewertung: **OK (F-15)**.

**F-12 NIEDRIG — erkennbare Personen auf Stockfotos [KUG]/[DSGVO].** Mehrere Fotos zeigen erkennbare Personen (u. a. Empfangsszene mit Mitarbeiterin und „Patient“ in der Zahnarztpraxis, Koch beim Anrichten). Das betrifft nicht die Besucherdaten, sondern das Recht am eigenen Bild der Abgebildeten. Die Pexels-Lizenz erlaubt kommerzielle Nutzung, verbietet aber eine Darstellung, die Personen in ein schlechtes Licht rückt oder eine Billigung vortäuscht. Die Darstellung hier ist neutral und als Designstudie gekennzeichnet (`footer.note`). Lösung: im geplanten Asset-/Lizenz-Audit vor dem Launch die Pexels-Bedingungen je Bild bestätigen. Nicht aus Code abschließend bewertbar (B).

### Build-Abhängigkeiten (`package.json`, `package-lock.json`)

| Paket | Ausgeliefert? | Netzwerk im Browser? |
|---|---|---|
| `react`, `react-dom` | ja | nein |
| `gsap`, `@gsap/react` | ja | nein (keine Telemetrie, keine Lizenzabfrage) |
| `vite`, `@vitejs/plugin-react` | nein, nur Build | — |

Lockfile: alle 46 Pakete aus `registry.npmjs.org` — betrifft nur den Build-Rechner, nicht die Besucher. Keine Source Maps im Build. Bewertung: **OK (F-17)**.

### Drittlandtransfers

| Anbieter | Daten | Zweck | Möglicher Transfer | Nötige Absicherung | Aus Code bewertbar? |
|---|---|---|---|---|---|
| Hoster / CDN (noch offen) | IP, Zugriffsdaten | Auslieferung der Seite | ja, wenn Anbieter oder Infrastruktur außerhalb EU/EWR (häufig USA) | AVV (Art. 28); bei USA: Zertifizierung unter dem EU-US Data Privacy Framework oder Standardvertragsklauseln; Nennung in der Datenschutzerklärung | **nein** |
| E-Mail-Anbieter Viktor (noch offen) | Inhalt der Anfrage, Absender | Empfang und Speicherung | ja, je nach Anbieter | wie oben | **nein** |
| E-Mail-Anbieter des Besuchers | dieselben | Versand | liegt in der Verantwortung des Besuchers | keine durch Viktor | — |
| Domain/DNS-Anbieter (noch offen) | in der Regel keine Besucherdaten (Auflösung läuft über den Resolver des Besuchers) | Namensauflösung | gering | prüfen, ob zugleich Proxy/CDN (dann wie Hoster) | **nein** |

Über den Code selbst findet **kein** Drittlandtransfer statt.

---

## 10. Datenschutzerklärung

**Status: nicht vorhanden (F-02, BLOCKER).** Ein Abgleich mit den eingesetzten Technologien ist daher nicht möglich. Damit fehlen derzeit alle Pflichtangaben:

| Pflichtinhalt | Status | Was für diese Website hineingehört |
|---|---|---|
| Verantwortlicher (Art. 13 Abs. 1 lit. a) | fehlt | Viktors Name, Anschrift, E-Mail (B) |
| Hosting + Server-Logs | fehlt | Hoster, erfasste Daten (IP, Zeit, URL, User-Agent, Referrer), Zweck (Auslieferung, Sicherheit), Rechtsgrundlage Art. 6 Abs. 1 lit. f, Speicherdauer laut Hoster (B) |
| Projektanfrage per E-Mail | fehlt | erhobene Felder, Ablauf über das E-Mail-Programm, Rechtsgrundlage Art. 6 Abs. 1 lit. b (hilfsweise f), Empfänger (E-Mail-Anbieter), Speicherdauer (B) |
| Kontakt per E-Mail/Telefon allgemein | fehlt | sobald `contact.email` / `contact.phone` gesetzt sind |
| Empfänger / Auftragsverarbeiter | fehlt | Hoster, E-Mail-Anbieter (B) |
| Drittlandtransfer | fehlt | nur falls Hoster/E-Mail-Anbieter außerhalb EU/EWR; dann Grundlage (DPF/SCC) nennen (B) |
| Speicherdauer | fehlt | je Verarbeitung (B) |
| Betroffenenrechte (Art. 15–21) | fehlt | Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerspruch (Art. 21 bei lit. f ausdrücklich hervorheben) |
| Beschwerderecht (Art. 77) | fehlt | zuständige Landesdatenschutzbehörde |
| Pflicht zur Bereitstellung | fehlt | Hinweis, dass ohne Kontaktangabe keine Antwort möglich ist |
| Keine Cookies / kein Tracking / lokale Fonts | fehlt | kurz und ausdrücklich erwähnen — das ist ein Vorteil und belegt „DSGVO-gerecht“ |

**Nicht hineingehören** (typische Fehler aus Mustern): Google Analytics, Google Fonts, Cookie-Abschnitte für nicht vorhandene Cookies, Newsletter, Social-Media-Plugins, YouTube, Google Maps, reCAPTCHA, Kontaktformular-Server/Datenbank.

**F-09 MITTEL [UWG] — Werbeaussage „DSGVO-gerecht“.** `src/site/content.js:183` („DSGVO-gerecht — Datenschutz von Anfang an mitgedacht.“). Die Aussage ist zurückhaltend formuliert und technisch gut gedeckt, steht aber auf einer Seite ohne Impressum und Datenschutzerklärung. Wer mit Datenschutz wirbt, wird daran gemessen. Lösung: Aussage erst mit F-01/F-02 live gehen lassen. Keine Codeänderung nötig, wenn die Blocker vorher behoben sind.

---

## 11. Hosting / Server

`NICHT AUS CODE PRÜFBAR – HOSTING/VERTRAG PRÜFEN`

| Punkt | Befund |
|---|---|
| Hosting-Anbieter | nicht festgelegt; keine Konfiguration im Repo |
| Deployment-Plattform | keine Pipeline, kein Workflow im Repo |
| CDN | nicht feststellbar |
| Server-Logs / IP-Adressen | entstehen bei praktisch jedem Hoster; Umfang unbekannt |
| Log-Retention | unbekannt |
| HTTPS / HSTS | nicht im Repo konfigurierbar ohne Hoster-Konfiguration; muss vom Hoster erzwungen werden |
| Sicherheits-Header | keine (F-10) |

**F-10 NIEDRIG — keine Sicherheits-Header / kein HTTPS-Zwang im Repo [DSGVO Art. 32].** Weil die Seite keine Fremdquellen nutzt, ließe sich eine strenge Content Security Policy setzen (`default-src 'self'`; für GSAP-Inline-Styles `style-src 'self' 'unsafe-inline'`; `img-src 'self' data:`). Sie würde versehentlich eingebaute Drittanbieter später sofort blockieren — Datenschutz durch Technikgestaltung. Dazu `Strict-Transport-Security`, `Referrer-Policy: strict-origin-when-cross-origin` (oder `no-referrer`), `X-Content-Type-Options: nosniff`, `Permissions-Policy` (Kamera, Mikrofon, Standort aus). Umsetzung je nach Hoster über eine Header-Datei im Repo (A), HTTPS-Erzwingung beim Hoster (B).

**F-11 NIEDRIG — Live-Vorschau auf claude.ai ist kein Launch-Ort.** Die Vorschau (claude.ai-Artifact) läuft auf Anthropic-Infrastruktur. Sie ist für die interne Abstimmung gedacht. Wird der Link öffentlich verbreitet, wäre das faktisch eine Veröffentlichung ohne Impressum und Datenschutzerklärung, mit einem Anbieter, den die Datenschutzerklärung nicht nennt. Lösung: Link nicht öffentlich teilen; Launch nur über den eigenen Hoster. (B)

---

## 12. Verträge / AVV

Diese Punkte sind **nicht durch Code lösbar**:

| Dienst | Vertrag | Warum | Status |
|---|---|---|---|
| Hoster (inkl. CDN) | AV-Vertrag nach Art. 28 DSGVO | verarbeitet IP-Adressen und Logs im Auftrag | offen (B) |
| E-Mail-Anbieter | AV-Vertrag nach Art. 28 DSGVO | speichert Anfragen im Auftrag | offen (B) |
| Hoster/E-Mail mit US-Bezug | zusätzlich DPF-Zertifizierung prüfen oder Standardvertragsklauseln | Drittlandtransfer Art. 44 ff. | offen (B) |
| Domain-Registrar / DNS | in der Regel kein AVV nötig, sofern kein Proxy/CDN | verarbeitet keine Besucherdaten | prüfen (B) |
| Pexels | kein AVV (keine Personendaten der Besucher); Lizenzbedingungen sichern | Bildlizenz, F-12 | im Asset-Audit (B) |
| Font-Anbieter | keiner — Fonts sind selbst gehostet, OFL | — | OK |
| GSAP / React | keiner — Bibliotheken ohne Datenverarbeitung | — | OK |

Zusätzlich empfehlenswert: **Verzeichnis von Verarbeitungstätigkeiten** (Art. 30 DSGVO) mit den zwei Verarbeitungen „Website-Bereitstellung“ und „Projektanfragen“. Für Kleinstunternehmen gilt eine Ausnahme nur eingeschränkt; da Anfragen regelmäßig verarbeitet werden, ist ein kurzes Verzeichnis ratsam.

---

## 13. Nicht aus dem Code prüfbare Punkte

**B — außerhalb des Repositorys zu verifizieren:**

| Punkt | Was zu klären ist |
|---|---|
| Hostingvertrag | Anbieter, Sitz, Rechenzentrum, AVV |
| Server-Logs | welche Daten, wie lange, wer Zugriff hat |
| CDN / Proxy | ob vorgeschaltet, ob Cookies gesetzt werden |
| HTTPS | Zertifikat, Weiterleitung http→https, HSTS |
| E-Mail-Provider | Anbieter, AVV, Standort, TLS, Speicherdauer im Postfach |
| Domain / DNS | Registrar, DNS-Anbieter, ob Proxy |
| Unternehmensdaten | Name, Anschrift, Rechtsform, Steuer-IDs fürs Impressum |
| Impressum | Inhalt (noch nicht vorhanden) |
| Datenschutzerklärung | Inhalt (noch nicht vorhanden), passend zu Hoster und E-Mail |
| Speicherfristen | Löschkonzept für Anfragen ohne Auftrag, Aufbewahrung bei Auftrag |
| Externe Dienstleister | falls später Buchhaltung, CRM o. ä. Anfragen erhalten |
| Bildrechte | Pexels-Bedingungen je Bild (F-12) |
| Live-Verhalten | Requests/Cookies auf der echten Domain nach Deployment |

---

## 14. Vor-Launch-Checkliste

**Blocker (A — im Repo):**
- [ ] F-03 Geschäftliche E-Mail-Adresse in `src/site/content.js` → `contact.email` eintragen.
- [ ] F-01 Impressum-Seite anlegen, `contact.imprintUrl` setzen.
- [ ] F-02 Datenschutzerklärung anlegen (passend zu dieser Website, Abschnitt 10), `contact.privacyUrl` setzen.

**Vorher klären (B — außerhalb):**
- [ ] F-04 Hoster wählen (bevorzugt EU), AVV abschließen, Log-Retention erfragen.
- [ ] F-05 E-Mail-Anbieter festlegen, AVV, Speicherdauer.
- [ ] Impressumsangaben und ggf. rechtliche Prüfung der Texte.

**Vor oder kurz nach Launch (A):**
- [ ] F-06 Hinweis + Link zur Datenschutzerklärung direkt am Formular.
- [ ] F-07 „Gespeichert wird nichts.“ präzisieren („Die Website selbst speichert keine Daten.“).
- [ ] F-08 Impressum/Datenschutz früher erreichbar machen (unten).
- [ ] F-10 Sicherheits-Header inkl. strenger CSP über den Hoster.

**Nach dem Deployment (B):**
- [ ] Live-Test auf der echten Domain: Network (nur eigene Domain?), Cookies (keine?), Storage (leer?), Console.
- [ ] HTTPS-Weiterleitung und Zertifikat prüfen.
- [ ] F-11 Vorschau-Link nicht öffentlich verwenden.
- [ ] F-12 Bildrechte im Asset-Audit bestätigen.

**Dauerhaft (sichere Defaults):**
- [ ] Neue Dienste (Karte, Kalender-Buchung, Video, Analytics, Formular-Backend, Chat) vor dem Einbau datenschutzrechtlich prüfen; jede externe Einbindung braucht ggf. Einwilligung, AVV und Eintrag in der Datenschutzerklärung.
- [ ] Fonts und Bilder weiterhin nur lokal einbinden.

---

*Dieser Bericht beschreibt den technischen Stand des Codes und ersetzt keine Rechtsberatung. Aussagen zu Hosting, Verträgen und Rechtstexten sind als offene Punkte markiert, nicht als erfüllt.*
