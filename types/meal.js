const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const { FoodType } = require("./food");

const MealType = new GraphQLObjectType({
  name: "Meal",
  description: "This type represents a meal",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLString),
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
    },
    date: {
      type: GraphQLNonNull(GraphQLString),
    },
    foods: {
      type: new GraphQLList(FoodType),
    },
  }),
});

module.exports = {
  MealType: MealType,
};
