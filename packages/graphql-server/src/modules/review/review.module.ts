import { createModule } from "graphql-modules";
import { loadFilesSync } from "@graphql-tools/load-files";
import { join } from "path";

export const reviewModule = createModule({
  id: "review-module",
  dirname: __dirname,
  providers: [],
  typeDefs: loadFilesSync(join(__dirname, "./typeDefs/*.graphql")),
  resolvers: loadFilesSync(join(__dirname, "./resolvers/*.ts")),
});
