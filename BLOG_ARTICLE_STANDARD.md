# Basketball Orbit Blog Article Standard

Version: 1.0  
Status: Verbindliche Arbeitsgrundlage fuer neue Blog-Artikel  
Geltungsbereich: `src/blog/`, `src/data/blogArticles.ts` und zugehoerige Assets

## 1. Zweck

Dieses Dokument ist die verbindliche Spezifikation fuer die Planung, Recherche, Erstellung, technische Integration und Qualitaetssicherung eines vollstaendigen Basketball-Orbit-Blogartikels.

Wenn ein neuer Artikel beauftragt wird, soll Codex anhand dieses Standards moeglichst selbststaendig einen veroeffentlichungsfertigen Stand erzeugen. Dazu gehoeren:

- Themen- und Suchintention
- Recherche und Faktenpruefung
- englischer Artikeltext im Basketball-Orbit-Stil
- Metadaten und Registrierung im Blog
- interne und externe Links
- CTA- und Funnel-Integration
- sinnvolle Visuals beziehungsweise klar markierte Asset-Platzhalter
- technische, visuelle, inhaltliche, SEO- und Accessibility-Pruefung

Ein Artikel gilt erst dann als fertig, wenn die Definition of Done in Abschnitt 15 erfuellt ist.

## 2. Verbindlicher Kontext vor Arbeitsbeginn

Vor jedem neuen Artikel:

1. Dieses Dokument vollstaendig lesen.
2. `src/data/blogArticles.ts`, `src/pages/BlogArticle.tsx` und `src/utils/blogHelpers.ts` pruefen, da sich Datenmodell oder Renderer geaendert haben koennen.
3. Alle bestehenden Dateien in `src/blog/article-data/` und die thematisch naechsten Artikel in `src/blog/content/` pruefen.
4. Bestehende Kategorien, Tags, interne URLs, CTA-Ziele und Assets inventarisieren. Keine Route, kein Download und kein Angebot erfinden.
5. Wenn aktuelle, wissenschaftliche, statistische oder anderweitig ueberpruefbare Aussagen verwendet werden, primaere beziehungsweise belastbare Quellen recherchieren und Links pruefen.
6. Arbeitsbaum und bestehende Aenderungen respektieren. Keine fremden Aenderungen ueberschreiben.

Der aktuelle Bestand ist Referenz fuer Markenstimme und technische Muster, aber kein Grund, offensichtliche Inkonsistenzen oder Fehler zu kopieren.

## 3. Erwartete Eingaben und sinnvolle Annahmen

Idealer Input fuer einen neuen Artikel:

- Thema oder Arbeitstitel
- Zielgruppe und konkretes Coaching-Problem
- Primaerziel: standardmaessig qualifizierte Leser zum Practice Planner fuehren; bei Bedarf Freebie, Video oder Ressource als sinnvoller Zwischenschritt
- vorhandene eigene Videos, PDFs, Drills, Bilder und Ziel-URLs
- gewuenschtes Veroeffentlichungsdatum
- persoenliche Erfahrungen oder Positionen von Chris, die enthalten sein sollen

Fehlende, risikoarme Details darf Codex sinnvoll ableiten. Bei nicht belegbaren persoenlichen Erfahrungen, Testimonials, Ergebnissen, Angeboten oder URLs darf nichts erfunden werden. Solche Punkte als klaren Platzhalter beziehungsweise offene Entscheidung ausweisen.

## 4. Zielgruppe, Sprache und Markenstimme

### Zielgruppe

Primaer Basketball-Coaches, Trainer und Player-Development-Verantwortliche, besonders im Jugend- und Amateurbereich. Sie suchen umsetzbare Loesungen fuer reale Trainings- und Spielsituationen.

### Sprache

- Der veroeffentlichte Artikel ist standardmaessig in natuerlichem US English verfasst, sofern der Auftrag nichts anderes festlegt.
- Dateinamen, Slugs und technische Bezeichner sind englisch und ASCII-kompatibel.
- Markenname immer `Basketball Orbit`.
- Fachbegriffe konsistent schreiben, zum Beispiel `constraints-led approach (CLA)`, `small-sided games (SSGs)` und `decision-making`.

### Stimme

- Coach spricht zu Coach: klar, aktiv, modern und kollegial.
- Praktisch und fachlich praezise, aber nicht akademisch oder aufgeblasen.
- Selbstbewusst, ohne absolute Versprechen oder kuenstliche Uebertreibung.
- Storytelling nur, wenn es den Coaching-Punkt traegt.
- Kurze bis mittlere Absaetze, konkrete Verben und hoher Nutzwert pro Abschnitt.
- Konkrete Spielsituationen verwenden: `Imagine your wing gets denied...`.
- Reale Probleme von Jugendteams beruecksichtigen: begrenzte Trainingszeit, unterschiedliche Leistungsstaende, Entscheidungsdruck und Transfer ins Spiel.
- Prinzipien, Wahrnehmung, Entscheidungen, representative learning design, SSGs und Constraints passend einbinden; CLA nicht kuenstlich in jedes Thema pressen.

### Vermeiden

- generische KI-Einstiege und Floskeln wie `In today's fast-paced world`
- Clickbait, nicht belegte Superlative und Erfolgsgarantien
- unnoetige Wiederholungen, lange Vorreden und Keyword-Stuffing
- herablassende Gegenueberstellungen von `old-school` und `modern`
- erfundene Zitate, Quellen, Statistiken, persoenliche Geschichten oder Produktaussagen
- uebermaessige Emojis; sie nur gezielt in CTA- oder Hinweisboxen einsetzen
- Em-Dash-Uebergebrauch; normale, gut lesbare Interpunktion bevorzugen

## 5. Suchintention und redaktionelle Planung

Vor dem Schreiben intern einen kompakten Article Brief erstellen:

- primaeres Keyword beziehungsweise Thema
- konkrete Suchintention
- Leserproblem und versprochener Nutzen
- einzigartiger Basketball-Orbit-Blickwinkel
- eine zentrale These
- drei bis fuenf unterstuetzende Kernpunkte
- passende praktische Beispiele oder SSGs
- primaerer CTA und ein bis zwei sekundaere CTAs
- zwei bis vier passende interne Links
- notwendige Quellen
- geplante Visuals und ihr jeweiliger Erkenntniszweck

Titel und Inhalt muessen dieselbe Erwartung erfuellen. Der Artikel soll eine Suchanfrage vollstaendig beantworten, aber nicht nach einer starren Wortzahl aufgeblasen werden. Als Orientierung gelten etwa 1.500 bis 2.500 Woerter; komplexe Pillar-Artikel duerfen laenger, fokussierte taktische Artikel kuerzer sein.

## 6. Standardstruktur des Artikels

Die Struktur wird dem Thema angepasst, folgt aber in der Regel diesem Spannungsbogen:

1. **Hook und Problem:** emotional konkret, sofort beim Coaching-Alltag beginnen.
2. **Outcome:** frueh klaeren, was der Coach nach dem Artikel versteht oder anwenden kann.
3. **Kontext:** warum das Problem im echten Spiel und Training wichtig ist.
4. **Konzept oder Loesung:** klar, schrittweise und praxisnah erklaeren.
5. **Anwendung:** Reads, Prinzipien, Coaching Cues, SSGs, Constraints, Progressionen oder Varianten.
6. **Fehler und Anpassungen:** typische Fehlinterpretationen, Trade-offs und passende Korrekturen.
7. **Key Takeaways:** fuenf bis sieben kurze, handlungsorientierte Punkte.
8. **Next Step / CTA:** eine logische naechste Handlung, kollegial statt werblich.

Nicht jeder Artikel braucht jeden Unterpunkt. Die Leserlogik ist wichtiger als eine Schablone.

### Markdown-Hierarchie

- Kein `# H1` im Content-Markdown: Der Seitentitel wird bereits aus `article.title` gerendert.
- Hauptabschnitte mit `##`, Unterabschnitte mit `###`, nur bei Bedarf `####`.
- Hierarchie nicht ueberspringen.
- Ueberschriften konkret und aussagekraeftig formulieren.
- Inhaltsverzeichnis-taugliche Ueberschriften verwenden; keine doppelten Abschnittstitel.
- Kurze Absaetze, Listen fuer echte Aufzaehlungen und Tabellen nur fuer klare Vergleiche.
- `---` sparsam und nur fuer sinnvolle visuelle Trennung einsetzen.

## 7. Basketball-Fachlichkeit und Praxiswert

Jeder zentrale Ratschlag beantwortet moeglichst:

- Welches Problem loest er?
- Was sollen Spieler wahrnehmen?
- Welche Entscheidung oder welches Verhalten soll entstehen?
- Wie sieht die Spielsituation konkret aus?
- Wie kann ein Coach sie im Training hervorrufen?
- Welche Constraint-, SSG- oder Progressionsvariante passt?
- Woran erkennt der Coach Erfolg oder einen notwendigen Eingriff?

Drill- oder SSG-Beschreibungen enthalten, soweit relevant:

- Spielerzahl und Startaufstellung
- Ziel und zu trainierendes Verhalten
- Ablauf und Scoring
- wichtigste Constraints
- Coaching Cues oder Fragen
- Progression und Regression
- typische Fehler
- Verbindung zur Spielsituation

Taktische Behauptungen als kontextabhaengig formulieren. Nicht so tun, als gaebe es unabhaengig von Alter, Niveau, Spacing oder gegnerischer Coverage nur eine richtige Loesung.

## 8. Recherche, Quellen und Vertrauen

- Zeitkritische Fakten, Studien, Regeln, Statistiken, Zitate und konkrete fremde Konzepte vor Verwendung pruefen.
- Primaerquellen bevorzugen: Originalstudie, Verband, Regelwerk, Originalvideo, Podcast-Episode oder Autorenseite.
- Sekundaerquellen nur nutzen, wenn sie einen echten erklaerenden Mehrwert bieten.
- Quellen direkt an der relevanten Aussage natuerlich verlinken; keine unstrukturierte Linkhalde.
- Direkte Zitate nur kurz und exakt, mit Urheber und Quelle. Paraphrasen bevorzugen.
- Bei wissenschaftlichen Aussagen Grenzen und Kontext nennen. Korrelation nicht als Kausalitaet ausgeben.
- Keine Quelle nur fuer SEO aufnehmen.
- Externe Links auf Seriositaet, Erreichbarkeit und Relevanz pruefen.
- Eigene Beobachtungen eindeutig als Erfahrung oder Meinung von Chris kennzeichnen und nur verwenden, wenn sie vom Auftrag beziehungsweise vorhandenem Material gedeckt sind.

## 9. SEO und Metadaten

SEO folgt Leserwert und Suchintention, nicht einer mechanischen Keyword-Dichte.

### Titel

- konkret, nutzenorientiert und deckungsgleich mit dem Inhalt
- primaeres Thema moeglichst frueh
- in der Regel etwa 50 bis 65 Zeichen, aber Klarheit geht vor
- keine unbelegbaren Versprechen

### Slug

- kurz, dauerhaft und sprechend
- lowercase ASCII, Woerter mit Bindestrichen
- keine Jahreszahl, sofern sie nicht inhaltlich zwingend ist
- muss Dateiname und `slug` entsprechen

### Excerpt / Meta Description

- eigenstaendiger, konkreter Nutzen statt Wiederholung des Titels
- primaeres Thema natuerlich enthalten
- idealerweise etwa 140 bis 160 Zeichen; keine abgeschnittene Aussage

### Inhalt

- Thema im Einstieg natuerlich bestaetigen.
- Semantisch verwandte Begriffe und echte Fragen von Coaches abdecken.
- Aussagekraeftige H2/H3, Listen und Beispiele fuer Scanbarkeit verwenden.
- Interne Links mit beschreibendem Anchor Text statt `click here`.
- Bestehende Artikel nicht kannibalisieren: neuen Blickwinkel oder klar abgegrenzte Suchintention festlegen.

### Bild- und Social-Metadaten

- `heroImageAlt` beschreibt das sichtbare Motiv beziehungsweise den funktionalen Informationsgehalt, nicht eine Keyword-Liste.
- Hero-Bild muss auch als Open-Graph-Bild funktionieren; wichtige Motive nicht an den Rand legen.
- Dateinamen beschreibend, lowercase und mit Bindestrichen.

## 10. Interne Links und Funnel

Der Basketball Orbit Practice Planner ist das bevorzugte uebergeordnete Conversion-Ziel des Blogs. Der Artikel soll dem Leser zuerst echten, eigenstaendigen Nutzen liefern und danach zeigen, wie die App die praktische Umsetzung erleichtert. Die Verbindung muss thematisch konkret sein: nicht nur die App nennen, sondern erklaeren, welche gerade behandelte Aufgabe ein Coach damit schneller oder besser erledigen kann, zum Beispiel Drills erstellen, Constraints und Coaching Notes festhalten, eine komplette Practice strukturieren oder eine Session mit Orbit AI verfeinern.

Freebies, PDFs, Videos, Drill Library und weitere Artikel koennen als niedrigschwellige Zwischenziele dienen. Wenn sie fuer die aktuelle Leserintention besser passen, duerfen sie der unmittelbare CTA eines Abschnitts sein. Der finale CTA soll jedoch in der Regel zum Practice Planner fuehren oder eine nachvollziehbare Bruecke dorthin schlagen.

Interne Links werden nach Lesernutzen gesetzt:

- ein relevanter Link im oberen Drittel, wenn er den Einstieg sinnvoll vertieft
- ein bis zwei kontextuelle Links im Mittelteil
- ein klarer naechster Schritt am Ende
- nur existierende, gepruefte Routen und Artikel verwenden
- nicht mehrfach mit demselben Anchor auf dasselbe Ziel verlinken, wenn es keinen Mehrwert bringt

Moegliche Ziele, jeweils vor Verwendung verifizieren:

- relevante Blog-Artikel
- passende Videos
- `/resources`
- `/drills`
- `/ssg-playbook`
- passende Freebie- beziehungsweise Guide-Landingpages
- Basketball Orbit Practice Planner unter `https://app.bballorbit.com/`

### CTA-Regeln

- Pro Artikel einen primaeren Conversion-Pfad bestimmen; standardmaessig endet dieser beim Practice Planner unter `https://app.bballorbit.com/`.
- Der Practice-Planner-CTA ist im Regelfall der finale Haupt-CTA. Nur wenn die Verbindung zum Artikelthema unnatuerlich, sachlich unpassend oder ein anderes Kampagnenziel ausdruecklich vorgegeben ist, wird davon abgewichen.
- Den App-Nutzen an das konkrete Artikelthema koppeln. Beispiel: Nach einem SSG-Artikel auf das Erstellen und Organisieren spielnaher Drills eingehen; nach einem Taktikartikel auf Practice Planning, Visuals, Constraints und Coaching Notes.
- Bevorzugte CTA-Logik: hilfreicher Artikelinhalt -> passende Ressource oder Vertiefung (optional) -> konkrete Umsetzung im Practice Planner.
- Sekundaere CTAs duerfen Videos oder verwandte Inhalte anbieten.
- CTA immer aus dem gerade vermittelten Nutzen ableiten.
- Ton: hilfreicher naechster Schritt, nicht Verkaufsdruck.
- App-CTA nicht wortgleich mehrfach wiederholen. Ein frueher, dezenter Kontextlink und ein staerkerer finaler CTA sind moeglich, wenn beide einen eigenen Zweck haben.
- Keine pauschalen oder unbelegten Produktversprechen. Nur Funktionen nennen, die im aktuellen Produkt beziehungsweise vorhandenen Marketingmaterial verifiziert wurden.
- Keine nicht vorhandenen PDFs, Modals oder Downloads behaupten.
- Wenn ein Asset oder Ziel noch fehlt, einen eindeutigen `TODO`-Platzhalter liefern und den Artikel nicht als vollstaendig veroeffentlichungsfertig bezeichnen.

## 11. Visuals, Diagramme, Bilder und Videos

Visuals sind optional, aber empfohlen, wenn sie Verstaendnis, Vergleich oder Umsetzung sichtbar verbessern. Kein dekoratives Bild nur zur Auflockerung einfuegen.

### Geeignete Visuals

- Uebersichts- oder Prozessdiagramm
- Vergleich wie traditional approach vs. CLA
- Flowchart fuer Reads und Entscheidungen
- Court-Diagramm mit Spielern, Laufwegen, Screens und Passlinien
- SSG-Aufbau oder Progression
- kompakte Framework- oder Takeaway-Grafik

### Verantwortungsaufteilung

- Codex kann allgemeine Illustrationen, Infografiken, Flowcharts, Court-Diagramme und Bildvarianten selbst erstellen.
- Fuer das Hero-Bild liefert Codex standardmaessig ein visuelles Konzept plus konkreten Image-Generation-Prompt. Auf ausdruecklichen Wunsch erstellt Codex auch das Bild.
- Drill-spezifische Fotos oder Videos liefert Chris standardmaessig selbst. Codex integriert sie, sobald Pfad, Datei und Kontext vorliegen.
- Personen oder Spielszenen nicht als reale Ereignisse oder echte Personen darstellen, wenn sie KI-generiert sind.

### Design- und Exportregeln

- Visual an das dunkle Basketball-Orbit-Design und die vorhandene orange Akzentfarbe anpassen.
- Auf Mobilgeraeten lesbar: grosse Beschriftung, hoher Kontrast, wenige Elemente.
- Diagrammtext in fehlerfreiem Englisch und so knapp wie moeglich.
- Informationsgrafiken vorzugsweise als sauberes SVG oder hochaufloesendes WebP; fotografische/illustrative Assets als optimiertes WebP.
- Transparenz nur verwenden, wenn sie im Seitenkontext getestet wurde.
- Zielgroesse fuer Rasterbilder in der Regel unter 300 KB, bei komplexen Hero-Bildern unter 500 KB, ohne sichtbaren Qualitaetsverlust.
- Hero grundsaetzlich im Querformat, bevorzugt nahe 16:9 oder 1.91:1 und mindestens 1200 px breit.
- Content-Visuals in ausreichender Breite exportieren, in der Regel 1200 bis 1600 px.
- Asset unter `public/lovable-uploads/` ablegen, Videos unter `public/videos-blog/`, sofern die bestehende Architektur nicht geaendert wurde.
- Pfade im Artikel beginnen mit `/`, beispielsweise `/lovable-uploads/example.webp`.
- Jedes informative Bild braucht einen praezisen Alttext. Rein dekorative Bilder brauchen leeren Alttext.
- Bild unmittelbar nach der Erklaerung platzieren, die es verdeutlicht.

### Einbettung

Einzelbild bevorzugt in normalem Markdown:

```md
![Decision flow for attacking a closeout](/lovable-uploads/closeout-decision-flow.webp)
```

HTML nur verwenden, wenn ein responsives Grid, Video, CTA-Layout oder zusaetzliche Attribute es wirklich erfordern. Der aktuelle Renderer unterstuetzt GitHub-Flavored Markdown und eingebettetes HTML. Keine ungetesteten Skripte oder interaktiven Fremd-Widgets einbauen.

Videos erhalten Controls, sinnvolle Poster, `preload="metadata"` und bei stummen Loops `muted playsinline`. YouTube als responsives `iframe` mit praezisem `title` einbetten.

## 12. Technische Dateistruktur

Fuer den Slug `<slug>` entstehen mindestens:

```text
src/blog/article-data/<slug>.ts
src/blog/content/<slug>.md
```

Assets liegen je nach Typ in:

```text
public/lovable-uploads/<descriptive-name>.webp
public/videos-blog/<descriptive-name>.mp4
```

Danach den Artikel in `src/data/blogArticles.ts` importieren und in `blogArticles` aufnehmen. Die Liste wird nach `publishDate` sortiert.

### Article-data-Template

Exportname in camelCase bilden und bestehende Typ-/Renderer-Konventionen erneut pruefen:

```ts
import { calculateReadTime } from '../../utils/blogHelpers';
import articleContent from '../content/<slug>.md?raw';

export const articleExportName = {
  slug: "<slug>",
  title: "<title>",
  excerpt: "<140-160 character description>",
  author: "Chris Bernhard",
  category: "<existing category where possible>",
  tags: ["<specific tag>", "<supporting tag>"],
  heroImage: "/lovable-uploads/<slug>-hero.webp",
  heroImageAlt: "<accurate visual description>",
  readTimeMinutes: calculateReadTime(articleContent),
  content: articleContent,
  publishDate: "YYYY-MM-DD",
  featured: true,
  youtubeUrl: "",
  related: [
    {
      title: "<verified resource title>",
      link: "<verified URL>",
    },
  ],
};
```

Hinweis: Der aktuell deklarierte `BlogArticle`-Typ bildet nicht alle historisch verwendeten Zusatzfelder ab. Vor Erstellung pruefen, ob `author`, `featured`, `youtubeUrl` und `related` tatsaechlich von UI oder anderen Prozessen verwendet werden. Bestehende Konventionen beibehalten, aber ungenutzte Felder nicht ungeprueft vermehren.

### Registrierung

In `src/data/blogArticles.ts`:

```ts
import { articleExportName } from '../blog/article-data/<slug>';

export const blogArticles: BlogArticle[] = [
  articleExportName,
  // existing articles...
];
```

## 13. Content-Komponenten und Gestaltung

Die Seite stellt Titel, Kategorie, Autorzeile, Datum, Lesezeit, Tags, Hero, Inhaltsverzeichnis, Sharing, Author Bio sowie Related Articles bereits ausserhalb des Markdown-Inhalts dar. Diese Elemente im Markdown nicht duplizieren.

Bevorzugte Content-Bausteine:

- Standard-Markdown fuer Text, Links, Listen, Bilder, Tabellen und Blockquotes
- bestehendes responsives Grid-Muster fuer Bild/Video plus Erklaerung
- vorhandene `infobox`-Gestaltung fuer den finalen Practice-Planner-CTA, sofern sie weiterhin im CSS definiert und visuell passend ist

Raw HTML sparsam verwenden. Alle Tags schliessen, valide Attribute nutzen und Darstellung in Mobile sowie Desktop pruefen. Niemals eigene Inline-Skripte einfuegen.

## 14. Arbeitsablauf fuer einen neuen Artikel

### Phase A: Analyse

1. Auftrag und vorhandene Assets erfassen.
2. Repo-Konventionen und aktuelle interne Ziele pruefen.
3. Search Intent, Content Gap und moegliche Kannibalisierung bestimmen.
4. Notwendige Fakten recherchieren und Quellenliste anlegen.
5. Article Brief und Outline erstellen.

### Phase B: Entwurf

1. Hook und klares Nutzenversprechen schreiben.
2. Vollstaendigen Artikel entlang der Leserlogik verfassen.
3. Praxisbeispiele, SSGs, Constraints und Coaching Cues ergaenzen.
4. Interne Links und Quellen kontextuell einbauen.
5. Takeaways und CTA erstellen.
6. Hero-Konzept und Visual-Liste mit Zweck, Alttext, Dateiname und Einfuegeposition definieren.

### Phase C: Integration

1. Content-Markdown erstellen.
2. Metadaten-Datei erstellen.
3. Freigegebene beziehungsweise erstellte Assets optimieren und ablegen.
4. Artikel registrieren.
5. Relative Pfade, Exporte und URLs pruefen.

### Phase D: QA

1. Rechtschreibung, Fachlichkeit, Konsistenz und Markenstimme pruefen.
2. Alle internen und externen Links pruefen.
3. Build und Lint ausfuehren; nur durch eigene Aenderungen verursachte Fehler beheben.
4. Artikel lokal auf Desktop und Mobile rendern und visuell pruefen.
5. Inhaltsverzeichnis, Ueberschriften, Tabellen, CTA, Bilder, Lightbox und Videos testen.
6. Browser-Konsole auf relevante Fehler pruefen.
7. SEO-Metadaten, Canonical URL, Social Image und strukturierte Daten stichprobenartig kontrollieren.
8. Git-Diff pruefen und nur beabsichtigte Dateien anfassen.

## 15. Definition of Done

Ein Artikel ist veroeffentlichungsfertig, wenn alle zutreffenden Punkte erfuellt sind:

### Inhalt

- Suchintention, Leserproblem und Nutzen sind klar.
- Der Text klingt nach Basketball Orbit und nicht nach generischem Marketingtext.
- Basketball-Aussagen sind fachlich plausibel, kontextualisiert und praktisch nutzbar.
- Keine Fakten, Erfahrungen, Quellen, Angebote oder URLs sind erfunden.
- Einstieg, Hauptteil, praktische Anwendung, Takeaways und CTA ergeben einen logischen Bogen.
- Keine unnoetigen Wiederholungen oder leeren Abschnitte.

### Struktur und SEO

- Titel, Slug, Excerpt, Kategorie, Tags, Datum und Alttext sind vollstaendig.
- Kein doppeltes H1 im Markdown.
- Ueberschriftenhierarchie und Inhaltsverzeichnis funktionieren.
- Primaeres Thema ist natuerlich in Titel, Einstieg und relevanten Ueberschriften vertreten.
- Interne Links sind hilfreich, verteilt und erreichbar.
- Externe Quellen sind belastbar und korrekt zugeordnet.
- Der primaere CTA ist relevant und fuehrt zu einem existierenden Ziel.

### Visual und Accessibility

- Jedes Visual hat einen konkreten Zweck und eine passende Position.
- Bilder sind optimiert, responsiv und mit korrektem Alttext versehen.
- Diagrammtext ist auf Mobilgeraeten lesbar.
- Videos haben Titel beziehungsweise Poster und sinnvolle Ladeattribute.
- Keine Layout-Ueberlaeufe, abgeschnittenen Inhalte oder kontrastarmen Texte.

### Technik

- `<slug>.md` und `<slug>.ts` stimmen mit dem Slug ueberein.
- Import und Registrierung in `src/data/blogArticles.ts` sind vorhanden.
- Alle Asset-Pfade und Dateinamen stimmen exakt.
- Build ist erfolgreich.
- Lint enthaelt keine durch den Artikel neu verursachten Fehler.
- Desktop- und Mobile-Ansicht wurden visuell geprueft.
- Artikelroute, Related Articles, Previous/Next Navigation, Sharing und Lightbox funktionieren.

### Uebergabe

- Geaenderte Dateien sind knapp aufgelistet.
- Offene Punkte oder vom Nutzer noch zu liefernde Assets sind klar markiert.
- Hero-Vorschlag enthaelt Konzept, Komposition, Format, Alttext, Dateiname und fertigen Generierungs-Prompt.
- Wenn offene Pflicht-Assets oder ungepruefte Links bestehen, wird der Stand als Entwurf und nicht als veroeffentlichungsfertig bezeichnet.

## 16. Standardformat fuer den Hero-Vorschlag

Wenn Chris das Hero-Bild selbst erstellt, liefert Codex:

```text
Concept:
Visual story:
Composition and focal point:
Basketball Orbit color direction:
Aspect ratio / minimum size:
Text on image: none (unless explicitly requested)
Suggested filename:
Alt text:
Image-generation prompt:
Negative constraints:
```

Der Prompt soll Motiv, Aktion, Kamera, Licht, Stimmung, Farbwelt, Platz fuer sicheren Crop und auszuschliessende Fehler konkret beschreiben. Keine Logos, Trikotmarken, unleserlichen Textfragmente, unnatuerlichen Haende oder anatomischen Fehler zulassen.

## 17. Auftragsschablone fuer kuenftige Artikel

Diese Kurzform kann fuer neue Auftraege verwendet werden:

```text
Erstelle und integriere einen neuen Basketball-Orbit-Blogartikel nach
BLOG_ARTICLE_STANDARD.md.

Thema:
Zielgruppe / Problem:
Primaerziel / CTA:
Vorhandene eigene Quellen oder Aussagen:
Vorhandene Videos, PDFs und Bilder:
Veroeffentlichungsdatum:
Besondere Vorgaben:

Arbeite bis zum lokal geprueften, veroeffentlichungsfertigen Stand. Erfinde keine
fehlenden persoenlichen Erfahrungen, Assets, Angebote oder URLs. Liefere fuer das
Hero-Bild einen Vorschlag und erstelle allgemeine Diagramme selbst, wenn sie den
Artikel substanziell verbessern.
```

## 18. Pflege dieses Standards

Dieser Standard ist versionskontrolliert und wird angepasst, wenn sich Blog-Datenmodell, Renderer, Designsystem, Funnel-Ziele oder Produktionsworkflow aendern. Nach groesseren neuen Artikeln kurz pruefen, ob eine wiederkehrende gute Loesung oder ein wiederkehrender Fehler hier dokumentiert werden sollte.
