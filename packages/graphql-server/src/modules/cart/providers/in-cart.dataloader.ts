import DataLoader from "dataloader";
import { InjectionToken } from "graphql-modules";
import { CartModule } from "../generated/module-types";
import { CartService } from "./cart.service";

export const IN_CART_DATALOADER = new InjectionToken<
  ReturnType<typeof inCartDataloader>
>("Price Dataloader");

export const inCartDataloader = (cartService: CartService) =>
  new DataLoader<string, boolean>(async (ids) => {
    const cart = await cartService.get();
    const normalizedEntries = cart.entries.reduce(
      (acc, entry) => ({
        ...acc,
        [entry.id]: entry,
      }),
      {} as Record<string, CartModule.CartEntry>
    );
    return ids.map((id) => normalizedEntries[id] !== undefined);
  });
