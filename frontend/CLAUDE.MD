# CLAUDE.md – Frontend (/frontend)

Vollständig statische Marketing-Website, gebaut mit Astro, deployed über
Cloudflare Pages (automatischer Build bei Push auf GitHub).

## Verantwortlichkeiten

- Marketing-/Produktseite für HumanShield
- Preisübersicht der Lizenz-Tiers (Community/Open Core, Business, Enterprise)
- Checkout: **Paddle.js-Overlay** direkt im Browser öffnen – kein eigener
  Server-Call nötig, Paddle übernimmt den kompletten Zahlungsvorgang
- Link zum **Paddle-Kundenportal** für Rechnungen/Abo-Verwaltung (von Paddle
  bereitgestellte URL, kein eigener Code)
- Community/Open-Core-Version: Link zum GitHub-Repository, keine Lizenz nötig

## Konventionen

- Astro mit minimalem JS (Islands-Architektur), kein SPA-Framework nötig
- Paddle.js wird nur auf der Preis-/Checkout-Seite geladen (kein Bundle-Bloat
  auf allen Seiten)
- Umgebungsvariable `PUBLIC_PADDLE_CLIENT_TOKEN` für Paddle-Einbindung,
  kein Hardcoding
- Farben: Primär `#ff570a` (Orange), Sekundär `#6B7281` (Grau)
- Deploy: automatisch über Cloudflare Pages bei Push auf `main`

## Nicht tun

- Keinen eigenen Checkout-Code schreiben – Paddle.js übernimmt das vollständig
- Kein Login/Kundenkonto-UI bauen – es gibt keins, Paddle-Portal übernimmt das
- Keine sensiblen Daten (Secret-Keys) im Frontend-Code oder Build – nur der
  öffentliche Paddle Client-Token gehört hierher
- Kein Server-Side Rendering, das einen eigenen Node-Prozess braucht – Ziel
  bleibt eine rein statische Ausgabe für Cloudflare Pages