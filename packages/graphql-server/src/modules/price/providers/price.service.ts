import { Inject, Injectable } from "graphql-modules";
import fetch from "node-fetch";
import { REST_API_URL } from "../../../providers/rest-api-url.token";

@Injectable()
export class PriceService {
  constructor(@Inject(REST_API_URL) private restApiUrl: string) {}

  async getById(id: string): Promise<number> {
    const res = await fetch(`${this.restApiUrl}/price/${id}`);
    return res.json();
  }

  async getByIds(ids: readonly string[]): Promise<number[]> {
    const res = await fetch(`${this.restApiUrl}/price?ids=${ids.join(",")}`);
    return res.json();
  }
}
