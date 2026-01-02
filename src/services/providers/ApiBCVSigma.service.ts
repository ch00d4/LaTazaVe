import { Currency, type Exchange } from "../../models/exchange-rate.model";
import { ExchangeRateServiceBase } from "../ExchangeRate.service";

export class ApiBCVSigmaService extends ExchangeRateServiceBase {
  readonly name = "API BCV Sigma";
  readonly domain = "api-bcv-sigma.vercel.app";
  readonly url = "https://api-bcv-sigma.vercel.app/api/tasas";

  async getInfo(): Promise<Exchange> {
    try {
      const response = await fetch(
        this.url
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      return {
        name: this.name,
        domain: this.domain,
        rates: [
          {
            rate: data.datos.monedas.USD,
            currency: Currency.USD,
            lastUpdated: new Date(data.current.date),
            url: this.url,
          },
          {
            rate: data.datos.monedas.EUR,
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
