export interface ExchangeRate {
  lastUpdated: Date | null;
  rate: number;
  currency: Currency;
  url: string | null;
}


export interface Exchange {
  name: string;
  domain: string;
  rates: ExchangeRate[];
}


export const Currency = {
  USD: "USD",
  VES: "VES",
  EUR: "EUR",
} as const;

export type Currency = (typeof Currency)[keyof typeof Currency];