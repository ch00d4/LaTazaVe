import { Currency, type Exchange } from "../../models/exchange-rate.model";
import { ExchangeRateServiceBase } from "../ExchangeRate.service";

export class ExchangeDyn extends ExchangeRateServiceBase {
  readonly name = "ExchangeDyn";
  readonly domain = "exchangedyn.com";
  readonly url = "https://api.exchangedyn.com/markets/quotes/usdves/bcv";

  async getInfo(): Promise<Exchange> {
    try {
      const response = await fetch(this.url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data)

      return {
        name: this.name,
        domain: this.domain,
        rates: [
          {
            rate: parseFloat(data.sources.BCV.quote),
            currency: Currency.USD,
            lastUpdated: new Date(data.sources.BCV.last_retrieved),
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
