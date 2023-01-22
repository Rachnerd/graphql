import { CartModule } from "../generated/module-types";
import { IN_CART_DATALOADER } from "../providers/in-cart.dataloader";

export const Product: CartModule.Resolvers["Product"] = {
  inCart: async ({ id }, __, { injector }) =>
    injector.get(IN_CART_DATALOADER).load(id),
};
