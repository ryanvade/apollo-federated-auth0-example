import { GraphQLResolverMap } from "apollo-graphql";
import * as uuid from "uuid";

let teams: any[] = [];
let clubs: any[] = [];
let organizations: any[] = [];

const resolverMap: GraphQLResolverMap = {
    Query: {
        helloWorld(): string {
            return "Hello World";
        },
        teams: async () => {
            return teams;
        },
        team: async (id: String) => {
            return teams.find(team => team.id == id);
        },
        clubs: async () => {
            return clubs;
        },
        club: async (id: String) => {
            return clubs.find(club => club.id == id);
        },
        organizations: async () => {
            return organizations;
        },
        organization: async (id: String) => {
            return organizations.find(organization => organization.id == id);
        }
    },
    Mutation: {
        createTeam: async (parent, { name, club }) => {
            const id = uuid.v4();
            const team = { id, name, club };
            teams.push(team);
            return team;
        },
        createClub: async (parent, { name, organization }) => {
            const id = uuid.v4();
            const club = { id, name, organization };
            clubs.push(club)
            return club;
        },
        createOrganization: async (parent, { name }) => {
            const id = uuid.v4();
            const organization = { id, name };
            organizations.push(organization);
            return organization;
        }
    },
    Club: {
        organization: parent => organizations.find(({ id }) => parent.organization == id),
        teams: parent => teams.filter(team => team.club == parent.id)
    },
    Organization: {
        clubs: parent => clubs.filter(club => club.organization == parent.id)
    },
    Team: {
        club: parent => clubs.find(({ id }) => parent.club == id)
    }
};

export default resolverMap;