import { ApolloGateway, RemoteGraphQLDataSource } from "@apollo/gateway";
import { ApolloServer } from "apollo-server-express";
import express from "express";

const port = Number(process.env.PORT || "3000");

const app = express();

const serviceDiscoveryEndpoint = process.env.COPILOT_SERVICE_DISCOVERY_ENDPOINT;

const gateway = new ApolloGateway({
    serviceList: [{ name: "registration", url: `http://registration.${serviceDiscoveryEndpoint}:3001` }]
});

const server = new ApolloServer({
    gateway,
    subscriptions: false
});

server.applyMiddleware({ app });

app.listen({ port }, () => {
    let location = "http://localhost";
    if (process.env.COPILOT_LB_DNS) {
        location = process.env.COPILOT_LB_DNS;
    }
    console.log(`Gateway ready at ${location}:${port}${server.graphqlPath}`);
});
