const { v4: uuidv4 } = require("uuid");

const { Meal } = require("../models/meal");

const { getUser } = require("./userResolver");

const getAllMeals = async (args) => {
  const user = await getUser(args.token);
  const meals = user.meals;
  return meals;
};

const getMeal = async (args) => {
  const user = await getUser(args.token);
  const meals = user.meals;
  const meal = meals.find((meal) => meal.id === args.mealId);
  return meal;
};

const createMeal = async (args) => {
  const user = await getUser(args.token);
  const meals = user.meals;
  const date = new Date();
  meals.push(
    new Meal({
      id: uuidv4(),
      name: args.name,
      date: date.toISOString(),
      foods: [],
    })
  );
  user.meals = meals;
  await user.save();
  return "Meal created.";
};

const updateMeal = async (args) => {
  const user = await getUser(args.token);
  const meals = user.meals;
  const targetMeal = meals.find((meal) => meal.id === args.mealId);
  for (const field of Object.entries({ name: args.name })) {
    targetMeal[field[0]] = field[1];
  }
  user.meals = meals;
  await user.save();
  return "Meal updated.";
};

const deleteMeal = async (args) => {
  const user = await getUser(args.token);
  const meals = user.meals;
  const targettargetMealIndex = meals.findIndex(
    (meal) => meal.id === args.mealId
  );
  meals.splice(targettargetMealIndex, 1);
  user.meals = meals;
  await user.save();
  return "Meal deleted.";
};

module.exports = {
  getAllMeals: getAllMeals,
  getMeal: getMeal,
  createMeal: createMeal,
  updateMeal: updateMeal,
  deleteMeal: deleteMeal,
};
