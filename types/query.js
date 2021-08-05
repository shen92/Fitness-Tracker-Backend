const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const { UserType } = require("./user");
const { ActivityType } = require("./activity");
const { MealType } = require("./meal");
const { FoodType } = require("./food");

const {
  validateUserAuthorizaton,
  getAllUsers,
  getUser,
} = require("../resolvers/userResolver");
const {
  getAllActivities,
  getActivity,
} = require("../resolvers/activityResolver");
const { getAllMeals, getMeal } = require("../resolvers/mealResolver");
const { getAllFoods, getFood } = require("../resolvers/mealResolver");

const RootQueryType = new GraphQLObjectType({
  name: "RootQuery",
  description: "Root Query",
  fields: () => ({
    token: {
      description: "This type signs in a user.",
      type: GraphQLNonNull(GraphQLString),
      args: {
        authorization: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (parent, args) => validateUserAuthorizaton(args),
    },
    user: {
      description: "This type returns a users.",
      type: UserType,
      args: {
        token: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (parent, args) => getUser(args.token),
    },
    users: {
      description: "This type returns all users.",
      type: new GraphQLList(UserType),
      args: {
        token: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (parent, args) => getAllUsers(args),
    },
    activities: {
      description: "This type returns all activities of a user.",
      type: new GraphQLList(ActivityType),
      args: {
        token: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (parent, args) => getAllActivities(args),
    },
    activity: {
      description: "This type returns an activity.",
      type: ActivityType,
      args: {
        token: {
          type: GraphQLNonNull(GraphQLString),
        },
        activityId: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (parent, args) => getActivity(args),
    },
    meals: {
      description: "This type returns all meals of a user.",
      type: new GraphQLList(MealType),
      args: {
        token: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (parent, args) => getAllMeals(args),
    },
    meal: {
      description: "This type returns an meal.",
      type: MealType,
      args: {
        token: {
          type: GraphQLNonNull(GraphQLString),
        },
        mealId: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (parent, args) => getMeal(args),
    },
    foods: {
      description: "This type returns all foods of a meal.",
      type: new GraphQLList(FoodType),
      args: {
        token: {
          type: GraphQLNonNull(GraphQLString),
        },
        mealId: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (parent, args) => getAllFoods(args),
    },
    food: {
      description: "This type returns a food.",
      type: FoodType,
      args: {
        token: {
          type: GraphQLNonNull(GraphQLString),
        },
        mealId: {
          type: GraphQLNonNull(GraphQLString),
        },
        foodId: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (parent, args) => getFood(args),
    },
  }),
});

module.exports = {
  RootQueryType: RootQueryType,
};
