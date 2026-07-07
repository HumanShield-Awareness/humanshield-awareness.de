# CLAUDE.md – HumanShield Awareness Website

Dieses Repository enthält die Marketing-Website und den Lizenzserver für
**humanshield-awareness.de** / **humanshield.app**.

**Alle Commits und PR werden nur im Namen Marcel Dellmann gemacht und nicht von von Claude**

## Projektüberblick

- **Ziel:** vollständig statische Marketing-/Kaufseite. Checkout, Steuern und
  Rechnungsstellung laufen komplett über **Paddle** (Merchant of Record) via
  Paddle.js-Overlay direkt im Frontend.
- **Kundenkonto:** gibt es NICHT selbst gebaut – Kunden verwalten Rechnungen
  und Abos über **Paddles eigenes Kundenportal**.
- **Lizenzserver (VPS):** einziger eigener Backend-Baustein. Empfängt
  Paddle-Webhooks, erzeugt JWT/RS256-Lizenzen für die Business- und
  Enterprise-Add-Ons und versendet sie per Mail. Keine Online-Validierung
  ("phone home") der Lizenzen zur Laufzeit.
- **Bewusst einfach gehalten:** kein Checkout-Backend, kein eigenes
  Kundenkonto, kein Redis, keine Queues, kein Kubernetes, kein
  Authentik/OIDC.

## Repository-Struktur

```
/frontend        Astro-Projekt, statische Seite + Paddle.js, Deploy auf Cloudflare Pages
/license-server  FastAPI-Projekt, Paddle-Webhook, JWT-Lizenzerstellung, Mailversand
/docs            Installationsanleitungen (.md), Architektur-Diagramme (Mermaid)
```

Jedes Unterverzeichnis hat eine eigene `CLAUDE.md` mit spezifischem Kontext.

## Tech-Stack (final)

| Bereich | Wahl |
|---|---|
| Frontend | Astro, statisch, Deploy via Cloudflare Pages (GitHub-Integration) |
| Zahlungsanbieter | **Paddle** (Merchant of Record, übernimmt VAT/Invoicing) |
| Kundenportal | Paddle-eigenes Portal – kein eigener Code |
| Lizenzserver | FastAPI (Python 3.12), reiner Webhook-Empfänger |
| Datenbank | SQLite (Standard, nur ausgestellte Lizenzen) |
| Lizenzformat | JWT, RS256-signiert |
| Reverse Proxy | Caddy (standalone, **nicht** OPNsense-Plugin – kein Kao & Baumann System) |
| Secrets | `.env`-Datei auf dem VPS (kein BWS – eigenständiges Projekt) |
| Hosting Lizenzserver | IONOS VPS (1–2 vCPU, 2 GB RAM genügt) |
| Hosting Frontend | Cloudflare Pages |

## Dokumentations-Konventionen (verbindlich)

- Alle Installations-/Betriebsanleitungen als `.md`-Dateien.
- Alle Diagramme als **Mermaid**-Syntax, kompatibel mit Wiki.js 8.8.2.
- Antworten und Code-Kommentare in Deutsch, wenn der Kontext deutschsprachig ist.

## Sicherheitsprinzipien

- Keine Kartendaten und keine Zahlungsdaten werden jemals lokal gespeichert –
  Paddle übernimmt PCI-Scope und Compliance vollständig.
- Paddle-Webhook-Signatur (`PADDLE_WEBHOOK_SECRET`) muss bei jedem Request
  verifiziert werden – ungeprüfte Webhooks dürfen niemals Lizenzen auslösen.
- Lizenz-Private-Key (`license_private.pem`) verlässt nie den Server, `chmod 600`.

## Was Claude Code hier NICHT tun soll

- Kein eigener Checkout-Code – Paddle.js übernimmt das im Frontend vollständig.
- Kein eigenes Kundenkonto/Login bauen – das übernimmt Paddles Kundenportal.
- Keine Vorschläge für OPNsense/Zoraxy – eigenständiger IONOS VPS mit
  standalone Caddy.
- Keine Einführung von Redis/Queues oder PostgreSQL ohne expliziten Bedarf –
  SQLite reicht für dieses Volumen.