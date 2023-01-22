import { PriceModule } from "../generated/module-types";
import { PriceService } from "../providers/price.service";

export const Product: PriceModule.Resolvers["Product"] = {
  price: ({ id }, __, { injector }) => injector.get(PriceService).getById(id),
};
