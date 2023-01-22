import { Resolvers } from "../../../generated/schema-types";

export const ProductResult: Resolvers["ProductResult"] = {
  __resolveType: (productOrUndefined) => {
    if ("reason" in productOrUndefined) {
      return "NotFound";
    }
    return "Product";
  },
};
