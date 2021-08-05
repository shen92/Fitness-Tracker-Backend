const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
  GraphQLNonNull,
} = require("graphql");

const { ActivityType } = require("./activity");
const { MealType } = require("./meal");

const UserType = new GraphQLObjectType({
  name: "User",
  description: "This type represents a user",
  fields: () => ({
    username: {
      type: GraphQLNonNull(GraphQLString),
    },
    password: {
      type: GraphQLNonNull(GraphQLString),
    },
    firstName: {
      type: GraphQLNonNull(GraphQLString),
    },
    lastName: {
      type: GraphQLNonNull(GraphQLString),
    },
    goalDailyCalories: {
      type: GraphQLNonNull(GraphQLFloat),
    },
    goalDailyProtein: {
      type: GraphQLNonNull(GraphQLFloat),
    },
    goalDailyCarbohydrates: {
      type: GraphQLNonNull(GraphQLFloat),
    },
    goalDailyFat: {
      type: GraphQLNonNull(GraphQLFloat),
    },
    goalDailyActivity: {
      type: GraphQLNonNull(GraphQLFloat),
    },
    activities: {
      type: new GraphQLList(ActivityType),
    },
    meals: {
      type: new GraphQLList(MealType),
    },
  }),
});

module.exports = {
  UserType: UserType,
};
