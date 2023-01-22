import { createModule } from "graphql-modules";
import { loadFilesSync } from "@graphql-tools/load-files";
import { join } from "path";
import { CartService } from "./providers/cart.service";

export const cartModule = createModule({
  id: "cart-module",
  dirname: __dirname,
  providers: [CartService],
  typeDefs: loadFilesSync(join(__dirname, "./typeDefs/*.graphql")),
  resolvers: loadFilesSync(join(__dirname, "./resolvers/*.ts")),
});
