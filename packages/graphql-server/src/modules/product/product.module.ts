import { createModule, Scope } from "graphql-modules";
import { ProductService } from "./providers/product.service";
import { loadFilesSync } from "@graphql-tools/load-files";
import { join } from "path";
import {
  productDataLoader,
  PRODUCT_DATALOADER,
} from "./providers/product.dataloader";

export const productModule = createModule({
  id: "product-module",
  dirname: __dirname,
  providers: [
    ProductService,
    {
      scope: Scope.Operation,
      provide: PRODUCT_DATALOADER,
      useFactory: productDataLoader,
      deps: [ProductService],
    },
  ],
  typeDefs: loadFilesSync(join(__dirname, "./typeDefs/*.graphql")),
  resolvers: loadFilesSync(join(__dirname, "./resolvers/*.ts")),
});
