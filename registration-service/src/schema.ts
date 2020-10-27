import { gql } from "apollo-server";

export const typeDefs = gql`
    type Team @key(fields: "id") {
        id: ID!
        name: String
        club: Club
    }

    type Club @key(fields: "id") {
        id: ID!
        name: String
        teams: [Team]!
        organization: Organization
    }

    type Organization @key(fields: "id") {
        id: ID!
        name: String
        clubs: [Club]!
    }

    extend type Query {
        helloWorld: String!
        teams: [Team]
        team(id: ID!): Team
        clubs: [Club]
        club(id: ID!): Club
        organizations: [Organization]
        organization(id: ID!): Organization
    }

    extend type Mutation {
        createTeam(name: String, club: String): Team
        createClub(name: String, organization: String): Club
        createOrganization(name: String!): Organization
    }
`;