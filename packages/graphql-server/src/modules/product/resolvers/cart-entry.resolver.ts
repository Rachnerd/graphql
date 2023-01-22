import type { Product } from "../../../generated/schema-types";
import type { ProductModule } from "../generated/module-types";
import { ProductService } from "../providers/product.service";

export const CartEntry: ProductModule.Resolvers["CartEntry"] = {
  product: ({ id }, __, { injector }) =>
    injector.get(ProductService).getById(id) as Promise<Product>,
};
