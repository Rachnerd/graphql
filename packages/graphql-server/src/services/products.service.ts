import fetch from "node-fetch";
import { PaginationParams, Product, Products } from "../generated/graphql";

export class ProductsService {
  async get({ page, size }: PaginationParams): Promise<Products> {
    const res = await fetch(
      `http://localhost:8080/products?page=${page}&size=${size}`
    );
    const { results, ...paginationInfo }: Pagination<ApiProduct> =
      await res.json();

    return {
      paginationInfo,
      results: results as Product[],
    };
  }

  async getById(id: string): Promise<Product | undefined> {
    const res = await fetch(`http://localhost:8080/products/${id}`);
    if (res.status === 404) {
      return undefined;
    }
    return await res.json();
  }

  async getByIds(ids: readonly string[]): Promise<Product[]> {
    const res = await fetch(
      `http://localhost:8080/products?ids=${ids.join(",")}`
    );
    const { results } = await res.json();
    return results;
  }
}

export interface Pagination<T> {
  page: number;
  size: number;
  totalResults: number;
  totalPages: number;
  results: T[];
}

interface ApiProduct {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ApiRating;
  quantity?: ApiQuantity;
  replacement?: ApiProduct;
}

interface ApiRating {
  rate: number;
  count: number;
}

interface ApiQuantity {
  min: number;
  step: number;
  max: number;
}
