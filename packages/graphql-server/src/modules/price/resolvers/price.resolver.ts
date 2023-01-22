import { PriceModule } from "../generated/module-types";
import { PRICE_DATALOADER } from "../providers/price.dataloader";

export const Product: PriceModule.Resolvers["Product"] = {
  price: ({ id }, __, { injector }) => injector.get(PRICE_DATALOADER).load(id),
};
