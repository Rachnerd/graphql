import { createModule } from "graphql-modules";
import { loadFilesSync } from "@graphql-tools/load-files";
import { join } from "path";
import { PriceService } from "./providers/price.service";

export const priceModule = createModule({
  id: "price-module",
  dirname: __dirname,
  providers: [PriceService],
  typeDefs: loadFilesSync(join(__dirname, "./typeDefs/*.graphql")),
  resolvers: loadFilesSync(join(__dirname, "./resolvers/*.ts")),
});
