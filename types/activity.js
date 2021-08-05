const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLNonNull,
} = require("graphql");

const ActivityType = new GraphQLObjectType({
  name: "Activity",
  description: "This type represents an activity",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLString),
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
    },
    duration: {
      type: GraphQLNonNull(GraphQLFloat),
    },
    date: {
      type: GraphQLNonNull(GraphQLString),
    },
    calories: {
      type: GraphQLNonNull(GraphQLFloat),
    },
  }),
});

module.exports = {
  ActivityType: ActivityType,
};
