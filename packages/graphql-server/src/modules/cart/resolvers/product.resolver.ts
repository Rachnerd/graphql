import { CartModule } from "../generated/module-types";
import { CartService } from "../providers/cart.service";

export const Product: CartModule.Resolvers["Product"] = {
  inCart: async ({ id }, __, { injector }) => {
    const cart = await injector.get(CartService).get();
    return cart.entries.find(({ id: productId }) => productId === id)
      ? true
      : false;
  },
};
