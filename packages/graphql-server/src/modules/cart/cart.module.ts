import { createModule, Scope } from "graphql-modules";
import { loadFilesSync } from "@graphql-tools/load-files";
import { join } from "path";
import { CartService } from "./providers/cart.service";
import {
  inCartDataloader,
  IN_CART_DATALOADER,
} from "./providers/in-cart.dataloader";

export const cartModule = createModule({
  id: "cart-module",
  dirname: __dirname,
  providers: [
    CartService,
    {
      scope: Scope.Operation,
      provide: IN_CART_DATALOADER,
      useFactory: inCartDataloader,
      deps: [CartService],
    },
  ],
  typeDefs: loadFilesSync(join(__dirname, "./typeDefs/*.graphql")),
  resolvers: loadFilesSync(join(__dirname, "./resolvers/*.ts")),
});
