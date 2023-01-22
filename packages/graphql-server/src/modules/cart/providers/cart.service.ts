import { Inject, Injectable } from "graphql-modules";
import fetch from "node-fetch";
import { REST_API_URL } from "../../../providers/rest-api-url.token";
import { CommonModule } from "../../common/generated/module-types";
import { CartModule } from "../generated/module-types";

@Injectable()
export class CartService {
  constructor(@Inject(REST_API_URL) private restApiUrl: string) {}

  async get(
    pagination?: CommonModule.PaginationParams | null
  ): Promise<CartModule.Cart> {
    const res = await fetch(
      `${this.restApiUrl}/cart${
        pagination ? `?page=${pagination.page}&size=${pagination.size}` : ``
      }`
    );
    const {
      total,
      products: { results, ...paginationInfo },
    } = await res.json();

    return {
      id: "0",
      entries: results,
      paginationInfo,
      total,
    };
  }

  async post(
    product: Pick<CartModule.CartEntry, "id" | "quantity">
  ): Promise<boolean> {
    const res = await fetch(`${this.restApiUrl}/cart`, {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return res.status === 204;
  }

  async put(
    product: Pick<CartModule.CartEntry, "id" | "quantity">
  ): Promise<boolean> {
    const res = await fetch(`${this.restApiUrl}/cart`, {
      method: "PUT",
      body: JSON.stringify(product),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return res.status === 204;
  }

  async delete(id: string): Promise<boolean> {
    const res = await fetch(`${this.restApiUrl}/cart/${id}`, {
      method: "delete",
    });
    return res.status === 204;
  }
}
