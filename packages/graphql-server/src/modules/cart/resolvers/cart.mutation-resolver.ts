import { CartModule } from "../generated/module-types";
import { CartService } from "../providers/cart.service";

export const Mutation: CartModule.Resolvers["Mutation"] = {
  addToCart: (_obj, args, { injector }) => injector.get(CartService).post(args),
  removeFromCart: (_obj, args, { injector }) =>
    injector.get(CartService).delete(args.id),
  updateCart: (_obj, args, { injector }) => injector.get(CartService).put(args),
};
