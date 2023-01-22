import { ApolloServer } from "apollo-server";
import "reflect-metadata";
import { createApplication } from "graphql-modules";
import { REST_API_URL } from "./providers/rest-api-url.token";
import {
  commonModule,
  priceModule,
  productModule,
  cartModule,
} from "./modules";

const application = createApplication({
  modules: [commonModule, productModule, priceModule, cartModule],
  providers: [
    {
      provide: REST_API_URL,
      useValue: "http://localhost:8080",
    },
  ],
});

const executor = application.createApolloExecutor();

const server = new ApolloServer({ schema: application.schema, executor });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
