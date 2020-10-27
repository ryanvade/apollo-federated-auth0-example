import { ApolloGateway, RemoteGraphQLDataSource } from "@apollo/gateway";
import { ApolloServer } from "apollo-server-express";
import express from "express";

const port = Number(process.env.PORT || "3000");

const app = express();

const gateway = new ApolloGateway({
    serviceList: [{ name: "registration", url: "http://localhost:3001" }]
});

const server = new ApolloServer({
    gateway,
    subscriptions: false
});

server.applyMiddleware({ app });

app.listen({ port }, () => {
    console.log(`Gateway ready at http://localhost:${port}${server.graphqlPath}`);
});
