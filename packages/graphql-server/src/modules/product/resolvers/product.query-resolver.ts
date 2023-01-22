import { Product } from "../../../generated/schema-types";
import { ProductModule } from "../generated/module-types";
import { ProductService } from "../providers/product.service";

export const Query: ProductModule.Resolvers["Query"] = {
  product: async (_, { id }, { injector }) =>
    ((await injector.get(ProductService).getById(id)) as Product) ?? {
      id,
      reason: `Product with id ${id} does not exist`,
    },
};
