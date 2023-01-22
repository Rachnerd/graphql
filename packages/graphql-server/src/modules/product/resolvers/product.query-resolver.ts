import { Product } from "../../../generated/schema-types";
import { ProductModule } from "../generated/module-types";
import { PRODUCT_DATALOADER } from "../providers/product.dataloader";
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
  product: async (_, { id }, { injector }) =>
    ((await injector.get(PRODUCT_DATALOADER).load(id)) as Product) ?? {
      id,
      reason: `Product with id ${id} does not exist`,
    },
};
