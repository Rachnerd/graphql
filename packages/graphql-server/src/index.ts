import { ApolloServer, gql } from "apollo-server";
import { readFileSync } from "fs";
import path from "path";
import { createContext } from "./context";
import { Resolvers } from "./generated/graphql";

const schemaPath = path.resolve(process.cwd(), "src", "schema.graphql");

const typeDefs = gql`
  ${readFileSync(schemaPath)}
`;

const resolvers: Resolvers = {
  Query: {
    products: (_obj, { pagination }, { dataloaders: { products } }, _info) =>
      products.load(`${pagination.page}:${pagination.size}`),
    cart: async (_obj, { pagination }, { dataloaders: { cart } }, _info) =>
      await cart.load(
        pagination ? `${pagination.page}:${pagination.size}` : ``
      ),
    product: async (_obj, { id }, { services: { products } }) =>
      (await products.getById(id)) ?? {
        id,
        reason: "Product does not exist",
      },
  },
  CartProduct: {
    product: async ({ id }, _, { dataloaders: { product } }) =>
      product.load(id),
  },
  Product: {
    __isTypeOf: (product) => product.title !== undefined,
    price: ({ id }, _args, { dataloaders: { price } }, _info) => price.load(id),
    inCart: async ({ id }, _args, { dataloaders: { cart: cartLoader } }) => {
      const cart = await cartLoader.load(`1:20`);
      return cart.products.some((product) => product.id === id);
    },
  },
  NotFound: {
    __isTypeOf: (notFound) => notFound.reason !== undefined,
  },
  Mutation: {
    addToCart: (_obj, args, { services: { cart } }) => cart.post(args),
    removeFromCart: (_obj, args, { services: { cart } }) =>
      cart.delete(args.id),
    updateCart: (_obj, args, { services: { cart } }) => cart.put(args),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
  context: createContext,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
