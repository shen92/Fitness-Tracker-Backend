const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
  GraphQLNonNull,
} = require("graphql");

const FoodType = new GraphQLObjectType({
  name: "Food",
  description: "This type represents a food",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLString),
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
    },
    calories: {
      type: GraphQLNonNull(GraphQLFloat),
    },
    protein: {
      type: GraphQLNonNull(GraphQLFloat),
    },
    carbohydrates: {
      type: GraphQLNonNull(GraphQLFloat),
    },
    fat: {
      type: GraphQLNonNull(GraphQLFloat),
    },
  }),
});

module.exports = {
  FoodType: FoodType,
};
