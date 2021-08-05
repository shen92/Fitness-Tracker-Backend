const expressGraphQL = require("express-graphql").graphqlHTTP;
const { GraphQLSchema } = require("graphql");

const { RootQueryType } = require("../types/query");
const { RootMutationType } = require("../types/mutation");

const route = new expressGraphQL({
  graphiql: true,
  schema: new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType,
  }),
});

module.exports = route;
