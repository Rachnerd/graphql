import { createModule, Scope } from "graphql-modules";
import { loadFilesSync } from "@graphql-tools/load-files";
import { join } from "path";
import { PriceService } from "./providers/price.service";
import {
  priceDataLoader,
  PRICE_DATALOADER,
} from "./providers/price.dataloader";

export const priceModule = createModule({
  id: "price-module",
  dirname: __dirname,
  providers: [
    PriceService,
    {
      scope: Scope.Operation,
      provide: PRICE_DATALOADER,
      useFactory: priceDataLoader,
      deps: [PriceService],
    },
  ],
  typeDefs: loadFilesSync(join(__dirname, "./typeDefs/*.graphql")),
  resolvers: loadFilesSync(join(__dirname, "./resolvers/*.ts")),
});
