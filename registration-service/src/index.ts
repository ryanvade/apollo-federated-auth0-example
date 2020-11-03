import { ApolloServer } from "apollo-server";
import { applyMiddleware } from "graphql-middleware";
import { buildFederatedSchema } from "@apollo/federation";
import { typeDefs } from "./schema";
import resolvers from "./resolverMap";

const port = Number(process.env.PORT || "3001");

const server = new ApolloServer({
    schema: applyMiddleware(buildFederatedSchema({ typeDefs, resolvers }))
});

server.listen({ port }).then(({ url }) => {
    let location = url;
    if (process.env.COPILOT_SERVICE_NAME) {
        location = `${process.env.COPILOT_SERVICE_NAME}.${process.env.COPILOT_SERVICE_DISCOVERY_ENDPOINT}`;
    }
    console.log(`Registration service setup at ${location}`);
});