# What if Letters

Eine statische Website aus reinem HTML, CSS und JavaScript. Sie kann direkt auf GitHub Pages veröffentlicht werden und braucht keinen Build-Schritt.

## Dateien

- `index.html` – zentrale Sammlung der Briefe und Bücher
- `detail.html` – gemeinsame Platzhalterseite nach dem Öffnen
- `styles.css` – Layout, Farben und Öffnungsanimationen
- `script.js` – Klicklogik, Animation und Seitenwechsel

## Eigene Stempel-PNGs einsetzen

Ersetze in `index.html` jeweils:

```html
<span class="stamp-placeholder">PNG</span>
```

durch zum Beispiel:

```html
<img class="stamp-image" src="assets/stamp-01.png" alt="" />
```

und ergänze in `styles.css`:

```css
.stamp-image {
  position: absolute;
  z-index: 6;
  top: 16px;
  right: 17px;
  width: 50px;
  height: 58px;
  object-fit: contain;
}
```

## GitHub Pages

1. Lade den Inhalt dieses Ordners in ein GitHub-Repository.
2. Öffne im Repository `Settings → Pages`.
3. Wähle unter `Build and deployment` den Branch `main` und den Ordner `/ (root)`.
4. Speichere die Einstellung.

Neue Inhalte kannst du in `script.js` im Objekt `content` ergänzen. Weitere Karten kopierst du in `index.html` und gibst ihnen über `data-page` denselben Schlüssel.
