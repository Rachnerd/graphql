import { Product } from "../../../generated/schema-types";
import { ProductModule } from "../generated/module-types";
import { ProductService } from "../providers/product.service";

export const Query: ProductModule.Resolvers["Query"] = {
  products: async (_, { pagination }, { injector }) => {
    const { paginationInfo, results } = await injector
      .get(ProductService)
      .get(pagination);
    return {
      results: results as Product[],
      paginationInfo,
    };
  },
};
