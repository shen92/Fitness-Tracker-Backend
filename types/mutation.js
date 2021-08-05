const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLNonNull,
} = require("graphql");

const {
  createUser,
  updateUser,
  deleteUser,
} = require("../resolvers/userResolver");
const {
  createActivity,
  updateActivity,
  deleteActivity,
} = require("../resolvers/activityResolver");
const {
  createMeal,
  updateMeal,
  deleteMeal,
} = require("../resolvers/mealResolver");
const {
  createFood,
  updateFood,
  deleteFood,
} = require("../resolvers/foodResolver");

const RootMutationType = new GraphQLObjectType({
  name: "RootMutation",
  description: "Root Mutation",
  fields: () => ({
    createUser: {
      description: "This type creates a user.",
      type: GraphQLNonNull(GraphQLString),
      args: {
        username: {
          type: GraphQLNonNull(GraphQLString),
        },
        password: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (parent, args) => await createUser(args),
    },
    updateUser: {
      description: "This type updates a user.",
      type: GraphQLNonNull(GraphQLString),
      args: {
        token: {
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
      },
      resolve: async (parent, args) => updateUser(args),
    },
    deleteUser: {
      description: "This type deletes a user.",
      type: GraphQLNonNull(GraphQLString),
      args: {
        token: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (parent, args) => await deleteUser(args),
    },
    createActivity: {
      description: "This type creates an activity.",
      type: GraphQLNonNull(GraphQLString),
      args: {
        token: {
          type: GraphQLNonNull(GraphQLString),
        },
        name: {
          type: GraphQLNonNull(GraphQLString),
        },
        duration: {
          type: GraphQLNonNull(GraphQLFloat),
        },
        calories: {
          type: GraphQLNonNull(GraphQLFloat),
        },
      },
      resolve: async (parent, args) => await createActivity(args),
    },
    updateActivity: {
      description: "This type updates an activity.",
      type: GraphQLNonNull(GraphQLString),
      args: {
        token: {
          type: GraphQLNonNull(GraphQLString),
        },
        activityId: {
          type: GraphQLNonNull(GraphQLString),
        },
        name: {
          type: GraphQLNonNull(GraphQLString),
        },
        duration: {
          type: GraphQLNonNull(GraphQLFloat),
        },
        calories: {
          type: GraphQLNonNull(GraphQLFloat),
        },
      },
      resolve: async (parent, args) => updateActivity(args),
    },
    deleteActivity: {
      description: "This type deletes an activity.",
      type: GraphQLNonNull(GraphQLString),
      args: {
        token: {
          type: GraphQLNonNull(GraphQLString),
        },
        activityId: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (parent, args) => await deleteActivity(args),
    },
    createMeal: {
      description: "This type creates a meal.",
      type: GraphQLNonNull(GraphQLString),
      args: {
        token: {
          type: GraphQLNonNull(GraphQLString),
        },
        name: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (parent, args) => await createMeal(args),
    },
    updateMeal: {
      description: "This type updates a meal.",
      type: GraphQLNonNull(GraphQLString),
      args: {
        token: {
          type: GraphQLNonNull(GraphQLString),
        },
        mealId: {
          type: GraphQLNonNull(GraphQLString),
        },
        name: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (parent, args) => updateMeal(args),
    },
    deleteMeal: {
      description: "This type deletes a meal.",
      type: GraphQLNonNull(GraphQLString),
      args: {
        token: {
          type: GraphQLNonNull(GraphQLString),
        },
        mealId: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (parent, args) => await deleteMeal(args),
    },
    createFood: {
      description: "This type creates a food.",
      type: GraphQLNonNull(GraphQLString),
      args: {
        token: {
          type: GraphQLNonNull(GraphQLString),
        },
        mealId: {
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
      },
      resolve: async (parent, args) => await createFood(args),
    },
    updateFood: {
      description: "This type updates a food.",
      type: GraphQLNonNull(GraphQLString),
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
      },
      resolve: async (parent, args) => updateFood(args),
    },
    deleteFood: {
      description: "This type deletes a food.",
      type: GraphQLNonNull(GraphQLString),
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
      resolve: async (parent, args) => await deleteFood(args),
    },
  }),
});

module.exports = {
  RootMutationType: RootMutationType,
};
