import { createModule } from "graphql-modules";
import { ProductService } from "./providers/product.service";
import { loadFilesSync } from "@graphql-tools/load-files";
import { join } from "path";

export const productModule = createModule({
  id: "product-module",
  dirname: __dirname,
  providers: [ProductService],
  typeDefs: loadFilesSync(join(__dirname, "./typeDefs/*.graphql")),
  resolvers: loadFilesSync(join(__dirname, "./resolvers/*.ts")),
});
