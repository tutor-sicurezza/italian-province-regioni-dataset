// ============================================================
// italian-province-regioni-dataset
// 110 province italiane + 20 regioni con metadati e contesto economico.
// ============================================================

import provinceJson from '../data/province-italiane.json';
import regioniJson from '../data/regioni-italiane.json';

export interface Provincia {
  /** Slug stabile in kebab-case (es. "reggio-emilia"). */
  slug: string;
  /** Nome ufficiale con apostrofo tipografico (es. "L’Aquila"). */
  nome: string;
  /** Sigla automobilistica a 2 lettere (es. "RM"). */
  sigla: string;
  /** Regione di appartenenza. */
  regione: string;
  /** True se la provincia coincide col capoluogo di regione. */
  capoluogo: boolean;
  /** Codice ISTAT della provincia (3 cifre, zero-padded). */
  codiceIstat: string;
  /** Primi 3 codici ATECO a 2 cifre prevalenti sul territorio. */
  atecoPrevalenti: string[];
}

export interface Regione {
  /** Nome ufficiale (es. "Emilia-Romagna", "Valle d’Aosta"). */
  nome: string;
  /** Slug kebab-case senza apostrofi (es. "valle-daosta"). */
  slug: string;
  /** Codice ISTAT della regione (2 cifre, zero-padded). */
  codiceIstat: string;
  /** Nome del capoluogo di regione. */
  capoluogo: string;
  /** Tipo di statuto: "ordinario" o "speciale". */
  statuto: 'ordinario' | 'speciale';
  /**
   * Paragrafo descrittivo del tessuto economico-produttivo, dei distretti
   * industriali e del fabbisogno formativo regionale. Pensato per fornire
   * contesto a generatori di contenuti, RAG, chatbot di settore.
   */
  contestoEconomico: string;
}

export const PROVINCE: ReadonlyArray<Provincia> = provinceJson as Provincia[];
export const REGIONI: ReadonlyArray<Regione> = regioniJson as Regione[];

export function getProvinciaBySlug(slug: string): Provincia | undefined {
  return PROVINCE.find((p) => p.slug === slug);
}

export function getProvinciaBySigla(sigla: string): Provincia | undefined {
  const s = sigla.toUpperCase();
  return PROVINCE.find((p) => p.sigla === s);
}

export function getRegioneByNome(nome: string): Regione | undefined {
  return REGIONI.find((r) => r.nome === nome);
}

export function getProvinceByRegione(regione: string): Provincia[] {
  return PROVINCE.filter((p) => p.regione === regione);
}
