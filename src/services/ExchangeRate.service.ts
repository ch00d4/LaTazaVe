import type { Exchange } from "../models/exchange-rate.model";

export abstract class ExchangeRateServiceBase {
  abstract readonly name: string;
  abstract readonly domain: string;

  abstract getInfo(): Promise<Exchange>;
}
