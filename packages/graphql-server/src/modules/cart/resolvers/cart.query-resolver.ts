import { CartModule } from "../generated/module-types";
import { CartService } from "../providers/cart.service";

export const Query: CartModule.Resolvers["Query"] = {
  cart: (_, { pagination }, { injector }) =>
    injector.get(CartService).get(pagination),
};
