import { Inject, Injectable } from "graphql-modules";
import fetch from "node-fetch";
import { ProductModule } from "../generated/module-types";
import { REST_API_URL } from "../../../providers/rest-api-url.token";
import { ApiProduct, Pagination } from "../../../types/rest-api.types";
import { CommonModule } from "../../common/generated/module-types";

@Injectable()
export class ProductService {
  constructor(@Inject(REST_API_URL) private restApiUrl: string) {}

  async get({ page, size }: CommonModule.PaginationParams): Promise<{
    results: ProductModule.Product[];
    paginationInfo: CommonModule.PaginationInfo;
  }> {
    const res = await fetch(
      `${this.restApiUrl}/products?page=${page}&size=${size}`
    );
    const { results, ...paginationInfo }: Pagination<ApiProduct> =
      await res.json();
    return {
      paginationInfo,
      results,
    };
  }

  async getById(id: string): Promise<ProductModule.Product | undefined> {
    const res = await fetch(`${this.restApiUrl}/products/${id}`);
    if (res.status === 404) {
      return undefined;
    }
    return await res.json();
  }
  // async getByIds(ids: readonly string[]): Promise<Product[]> {
  //   const res = await fetch(
  //     `http://localhost:8080/products?ids=${ids.join(",")}`
  //   );
  //   const { results } = await res.json();
  //   return results;
  // }
}
