import { Currency, type Exchange } from "../../models/exchange-rate.model";
import { ExchangeRateServiceBase } from "../ExchangeRate.service";

export class DolarVzlaService extends ExchangeRateServiceBase {
  readonly name = "DolarVzla";
  readonly domain = "dolarvzla.com";
  readonly url = "https://api.dolarvzla.com/public/exchange-rate";

  async getInfo(): Promise<Exchange> {
    try {
      const response = await fetch(this.url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      return {
        name: this.name,
        domain: this.domain,
        rates: [
          {
            rate: data.current.usd,
            currency: Currency.USD,
            lastUpdated: new Date(data.current.date),
            url: this.url,
          },
          {
            rate: data.current.eur,
            currency: Currency.EUR,
            lastUpdated: new Date(data.current.date),
            url: this.url,
          },
        ],
      };
    } catch (error) {
      console.error("Failed to fetch from DolarVzla:", error);
      return {
        name: this.name,
        domain: this.domain,
        rates: [
          {
            rate: -1,
            currency: Currency.USD,
            lastUpdated: null,
            url: this.url,
          },
          {
            rate: -1,
            currency: Currency.EUR,
            lastUpdated: null,
            url: this.url,
          },
        ],
      };
    }
  }
}
