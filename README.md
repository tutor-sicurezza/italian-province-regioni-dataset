# italian-province-regioni-dataset

[![License: MIT + CC BY 4.0](https://img.shields.io/badge/license-MIT%20%2B%20CC%20BY%204.0-blue.svg)](./LICENSE)
[![GitHub release](https://img.shields.io/github/v/release/tutor-sicurezza/italian-province-regioni-dataset)](https://github.com/tutor-sicurezza/italian-province-regioni-dataset/releases)
[![GitHub stars](https://img.shields.io/github/stars/tutor-sicurezza/italian-province-regioni-dataset?style=social)](https://github.com/tutor-sicurezza/italian-province-regioni-dataset/stargazers)
[![CI](https://github.com/tutor-sicurezza/italian-province-regioni-dataset/actions/workflows/ci.yml/badge.svg)](https://github.com/tutor-sicurezza/italian-province-regioni-dataset/actions/workflows/ci.yml)
[![Part of the tutor-sicurezza open-data ecosystem](https://img.shields.io/badge/ecosystem-tutor--sicurezza-blue.svg)](https://github.com/tutor-sicurezza)

Dataset open delle **110 province italiane** e delle **20 regioni**, con metadati utili a chi sviluppa siti, dashboard, generatori di contenuti local-SEO e knowledge base per chatbot di settore in Italia.

Per ogni provincia: nome ufficiale, slug stabile, sigla automobilistica, regione di appartenenza, flag *capoluogo di regione*, codice ISTAT e primi codici **ATECO 2007** prevalenti sul territorio. Per ogni regione: codice ISTAT, capoluogo, tipo di statuto (ordinario / speciale) e un paragrafo descrittivo del **tessuto economico-produttivo** (distretti industriali, filiere prevalenti, fabbisogno formativo).

JSON puri + tipi TypeScript strict per consumo immediato in Next.js, Astro, SvelteKit, Node, Python, ETL.

---

## Installazione

```bash
npm install italian-province-regioni-dataset
# oppure scarica direttamente i JSON dalla cartella /data
```

## Uso TypeScript

```ts
import {
  PROVINCE,
  REGIONI,
  getProvinciaBySlug,
  getProvinciaBySigla,
  getProvinceByRegione,
} from 'italian-province-regioni-dataset';

PROVINCE.length;                          // 110
getProvinciaBySigla('RM')?.nome;          // 'Roma'
getProvinciaBySlug('reggio-emilia')?.regione; // 'Emilia-Romagna'
getProvinceByRegione('Lombardia').length; // 12
```

## Uso JSON puro

```bash
curl -O https://raw.githubusercontent.com/tutor-sicurezza/italian-province-regioni-dataset/master/data/province-italiane.json
curl -O https://raw.githubusercontent.com/tutor-sicurezza/italian-province-regioni-dataset/master/data/regioni-italiane.json
```

## Schema dati

### Provincia

| Campo            | Tipo       | Note                                       |
| ---------------- | ---------- | ------------------------------------------ |
| `slug`           | `string`   | kebab-case stabile, es. `monza-brianza`    |
| `nome`           | `string`   | Apostrofo tipografico (es. `L’Aquila`)     |
| `sigla`          | `string`   | Sigla automobilistica 2 lettere (es. `MI`) |
| `regione`        | `string`   | Nome regione                               |
| `capoluogo`      | `boolean`  | `true` se capoluogo di regione             |
| `codiceIstat`    | `string`   | 3 cifre zero-padded                        |
| `atecoPrevalenti`| `string[]` | Primi 3 codici ATECO 2007 a 2 cifre        |

### Regione

| Campo               | Tipo                       | Note                          |
| ------------------- | -------------------------- | ----------------------------- |
| `nome`              | `string`                   | Nome ufficiale                |
| `slug`              | `string`                   | kebab-case                    |
| `codiceIstat`       | `string`                   | 2 cifre                       |
| `capoluogo`         | `string`                   | Nome capoluogo                |
| `statuto`           | `'ordinario' \| 'speciale'`| Statuto regionale             |
| `contestoEconomico` | `string`                   | Paragrafo descrittivo (~1.5 K)|

## Le 20 regioni in tabella

| Regione               | Capoluogo  | ISTAT | Statuto    |
| --------------------- | ---------- | ----- | ---------- |
| Piemonte              | Torino     | 01    | ordinario  |
| Valle d’Aosta         | Aosta      | 02    | speciale   |
| Lombardia             | Milano     | 03    | ordinario  |
| Trentino-Alto Adige   | Trento     | 04    | speciale   |
| Veneto                | Venezia    | 05    | ordinario  |
| Friuli-Venezia Giulia | Trieste    | 06    | speciale   |
| Liguria               | Genova     | 07    | ordinario  |
| Emilia-Romagna        | Bologna    | 08    | ordinario  |
| Toscana               | Firenze    | 09    | ordinario  |
| Umbria                | Perugia    | 10    | ordinario  |
| Marche                | Ancona     | 11    | ordinario  |
| Lazio                 | Roma       | 12    | ordinario  |
| Abruzzo               | L’Aquila   | 13    | ordinario  |
| Molise                | Campobasso | 14    | ordinario  |
| Campania              | Napoli     | 15    | ordinario  |
| Puglia                | Bari       | 16    | ordinario  |
| Basilicata            | Potenza    | 17    | ordinario  |
| Calabria              | Catanzaro  | 18    | ordinario  |
| Sicilia               | Palermo    | 19    | speciale   |
| Sardegna              | Cagliari   | 20    | speciale   |

## Use case

Questo dataset alimenta le pagine [/provincia](https://123formazione.com/provincia) di **123Formazione** per offrire copertura formativa local-SEO in tutte le province italiane: ogni pagina eredita dalla regione un blocco di contesto economico-produttivo unico (riducendo il rischio di *thin content* tipico dei template territoriali generati in serie), e dai codici ATECO prevalenti la selezione dei corsi obbligatori di sicurezza sul lavoro più pertinenti per il tessuto locale.

Lo stesso schema è riutilizzabile per:

- generatori di landing local-SEO (ristorazione, servizi B2B, e-commerce con consegna provinciale);
- knowledge base per chatbot di assistenza territoriale;
- selettori provincia in form di onboarding (fatturazione elettronica, anagrafiche clienti);
- analisi merceologica per dashboard BI con dimensione geografica.

## Fonti

- Province e codici: **ISTAT**, *Codici statistici delle unità amministrative territoriali*, gennaio 2025 (snapshot stabile delle 110 province esistenti, comprese quelle in fase di riordino in Sardegna).
- Sigle automobilistiche: **Motorizzazione Civile** (DM 27/04/2006 e successivi).
- Classificazione **ATECO 2007** aggiornamento 2022: ISTAT.
- Contesto economico: elaborazione su dati **Unioncamere**, **Istat**, **INAIL** e rapporti regionali sui distretti industriali.

## Note

- I dati delle province della Sardegna riflettono l’assetto pre-LR 7/2021 (Carbonia-Iglesias, Olbia-Tempio, Ogliastra, Medio Campidano sono mantenute per retrocompatibilità con codici ISTAT e database storici).
- I codici ATECO prevalenti sono indicativi del tessuto produttivo dominante a livello provinciale e non sostituiscono le statistiche ufficiali ASIA-Istat per analisi puntuali.

## English summary

Open dataset of all **110 Italian provinces** and **20 regions** with: name, stable slug, automotive plate code, region of belonging, *regional capital* flag, ISTAT code and top ATECO 2007 economic activity codes. Each region also includes a descriptive paragraph of its economic fabric, industrial districts and key sectors — useful for local-SEO generators, RAG knowledge bases, BI dashboards and onboarding forms. Source code MIT, data files CC-BY 4.0.

## Related repositories

Open dataset / tooling ecosystem for Italian workplace safety (D.Lgs 81/08) maintained by [@tutor-sicurezza](https://github.com/tutor-sicurezza):

**Datasets**
- [italian-ateco-database](https://github.com/tutor-sicurezza/italian-ateco-database) — ATECO 2007 codes + workplace-safety risk
- [comuni-italiani-istat](https://github.com/tutor-sicurezza/comuni-italiani-istat) — Italian municipalities with ISTAT codes
- [dlgs-81-08-glossario](https://github.com/tutor-sicurezza/dlgs-81-08-glossario) — 218 D.Lgs 81/08 glossary terms
- [dlgs-81-08-testo-unico](https://github.com/tutor-sicurezza/dlgs-81-08-testo-unico) — D.Lgs 81/08 structured by Title + key articles index
- [haccp-italia-normativa-regionale](https://github.com/tutor-sicurezza/haccp-italia-normativa-regionale) — HACCP regional regulations (20 Italian regions)
- [verifiche-periodiche-inail-attrezzature](https://github.com/tutor-sicurezza/verifiche-periodiche-inail-attrezzature) — Equipment subject to INAIL periodic verification
- [accordi-stato-regioni-sicurezza-lavoro](https://github.com/tutor-sicurezza/accordi-stato-regioni-sicurezza-lavoro) — Stato-Regioni training agreements

**Libraries / tools**
- [scadenze-formazione-calculator](https://github.com/tutor-sicurezza/scadenze-formazione-calculator) — Training renewal schedule calculator
- [next-seo-italian-helpers](https://github.com/tutor-sicurezza/next-seo-italian-helpers) — Next.js SEO helpers for Italian B2B
- [mcp-italian-workplace-safety](https://github.com/tutor-sicurezza/mcp-italian-workplace-safety) — MCP server for Claude Desktop / Cursor / Cline

**Online services**
- [Public REST API + OpenAPI 3.1 + DCAT-AP-IT](https://123formazione.com/api/public/docs) — Free open data API
- [Live documentation site (GitHub Pages)](https://tutor-sicurezza.github.io/accordi-stato-regioni-sicurezza-lavoro/) — Accordi Stato-Regioni

All resources are MIT or CC-BY licensed and maintained as production-quality open data.

## Licenza

- **Codice (src/, index.ts, helpers):** MIT
- **Dati (data/*.json):** CC-BY 4.0

Vedi [LICENSE](./LICENSE).
