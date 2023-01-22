import type { Product } from "../../../generated/schema-types";
import type { ProductModule } from "../generated/module-types";
import { PRODUCT_DATALOADER } from "../providers/product.dataloader";

export const CartEntry: ProductModule.Resolvers["CartEntry"] = {
  product: ({ id }, __, { injector }) =>
    injector.get(PRODUCT_DATALOADER).load(id) as Promise<Product>,
};
