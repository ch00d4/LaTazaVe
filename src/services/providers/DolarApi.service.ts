import { Currency, type Exchange } from "../../models/exchange-rate.model";
import { ExchangeRateServiceBase } from "../ExchangeRate.service";

export class DolarApiService extends ExchangeRateServiceBase {
  readonly name = "DolarApi";
  readonly domain = "dolarapi.com";
  readonly url = "https://ve.dolarapi.com/v1/dolares/oficial";

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
            rate: data.promedio,
            currency: Currency.USD,
            lastUpdated: new Date(data.fechaActualizacion),
            url: this.url,
          },
          {
            rate: -1,
            currency: Currency.EUR,
            lastUpdated: new Date(data.fechaActualizacion),
            url: null,
          },
        ],
      };
    } catch (error) {
      console.error("Failed to fetch from DolarApi:", error);
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
            url: null,
          },
        ],
      };
    }
  }
}
