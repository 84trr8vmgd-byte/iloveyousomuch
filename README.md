# For you — Version 2

Statische Website mit HTML, CSS und JavaScript, ohne Installation oder Build.

## Auf GitHub übernehmen

ZIP entpacken und den **Inhalt** von `what-if-letters` in dein Repository hochladen. `index.html` liegt direkt im Hauptverzeichnis. Vorhandene Dateien gleicher Namen ersetzen. Den ganzen Ordner `assets` mit hochladen. Die alte `detail.html` wird nicht mehr benötigt.

## Deine Inhalte einfügen

Alle Pfade und Brieftexte stehen in **content.js**. Dort sind Beispiele bereits eingetragen. PNG-Dateien in `assets/` hochladen, dann den passenden Pfad eintragen. Groß- und Kleinschreibung beachten. Keine führenden Schrägstriche verwenden.

| Inhalt | Einstellung in content.js |
| --- | --- |
| Quadratischer Stempel mittig auf jedem Brief | `seal` |
| Webtoon-Cover | `covers.webtoon` |
| Gutschein, auch auf der Unterseite | `covers.giftcard` |
| Sketchbook-Cover | `covers.sketchbook` |
| Plattenhülle | `covers.vinyl` |
| Comic-Panels in Leserichtung | `comic` |
| Zeichnungen pro Buchseite | `sketchPages` |
| Bonbon-Rückseiten | `treats` |
| Namen und Texte der 25 Briefe | `letters` |

Cover-Platzhalter sind echte PNG-Dateien. Du kannst sie auch einfach durch eigene PNGs mit identischen Dateinamen ersetzen. Buchcover passen am besten im Hochformat, Gutschein im Querformat und Plattencover quadratisch. Cover füllen ihre Fläche und können dabei beschnitten werden. Comic-Panels und Zeichnungen behalten ihr Seitenverhältnis.

### Eigene Briefe

Ersetze den kompletten bisherigen `letters:`-Eintrag inklusive `.map(...)` zum Beispiel durch:

```js
letters: [
  { title: "Open if you're sad…", text: `Dein erster Absatz.

Dein zweiter Absatz.`, image: '' },
  { title: 'Open if you miss me…', text: 'Dein Text', image: 'assets/brief-02.png' }
]
```

Texte erscheinen als Text, nicht als HTML. Mit `image` kannst du optional einen gezeichneten Brief hinzufügen. Auf großen Bildschirmen stehen fünf Briefe pro Reihe, auf kleineren drei oder zwei.

### Comic

```js
comic: ['assets/panel-01.png', 'assets/panel-02.png', 'assets/panel-03.png'],
```

Panels werden ohne Abstand untereinander angezeigt.

### Sketchbook

Eine innere Liste entspricht einer Seite. Am besten eine gerade Seitenzahl verwenden:

```js
sketchPages: [
  ['assets/zeichnung-01.png', 'assets/zeichnung-02.png'],
  ['assets/zeichnung-03.png', 'assets/zeichnung-04.png'],
  ['assets/zeichnung-05.png'],
  ['assets/zeichnung-06.png', 'assets/zeichnung-07.png']
],
```

Zwei bis drei Zeichnungen pro Seite passen am besten. Die Pfeile blättern eine Doppelseite weiter oder zurück.

### Bonbons

```js
treats: [
  {title: 'Überraschung 1', image: 'assets/treat-01.png'},
  {title: 'Überraschung 2', image: 'assets/treat-02.png'}
],
```

Das Layout ist für bis zu sechs Bonbons angelegt. Nochmals klicken dreht sie zurück. Beim Fokussieren oder Darüberfahren stoppt das einzelne Bonbon, damit du es gut anklicken kannst. Die Bewegung der ganzen Gruppe lässt sich pausieren.

## Seiten

- `index.html`: sechs Objekte mit Öffnungsanimationen
- `letters.html`: Briefsammlung
- `letter.html?id=0`: erster Brief; die Nummer beginnt bei 0
- `webtoon.html`: vertikaler Comic
- `giftcard.html`: schwebender, leuchtender Gutschein
- `sketchbook.html`: animiertes Skizzenbuch
- `treats.html`: schwebende und umdrehbare Bonbons
- `vinyl.html`: rotierende Platte mit Hülle

Animationen berücksichtigen die Systemeinstellung „Bewegung reduzieren“. Eine Veröffentlichung dieser Dateien wurde hier nicht vorgenommen.
