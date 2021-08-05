const { v4: uuidv4 } = require("uuid");

const { Food } = require("../models/food");

const { getUser } = require("./userResolver");

const getAllFoods = async (args) => {
  const user = await getUser(args.token);
  const meals = user.meals;
  const meal = meals.find((meal) => meal.id === args.mealId);
  return meal.foods;
};

const getFood = async (args) => {
  const user = await getUser(args.token);
  const meals = user.meals;
  const meal = meals.find((meal) => meal.id === args.mealId);
  const foods = meal.foods;
  const food = foods.find((food) => food.id === args.foodId);
  return food;
};

const createFood = async (args) => {
  const user = await getUser(args.token);
  const meals = user.meals;
  const meal = meals.find((meal) => meal.id === args.mealId);
  const foods = meal.foods;
  const food = new Food({
    id: uuidv4(),
    name: args.name,
    calories: args.calories,
    protein: args.protein,
    carbohydrates: args.carbohydrates,
    fat: args.fat,
  });
  foods.push(food);
  const targetMealIndex = user.meals.findIndex(
    (meal) => meal.id === args.mealId
  );
  user.meals[targetMealIndex].foods = foods;
  await user.save();
  return "Food created.";
};

const updateFood = async (args) => {
  const user = await getUser(args.token);
  const meals = user.meals;
  const meal = meals.find((meal) => meal.id === args.mealId);
  const foods = meal.foods;
  const targetFood = foods.find((food) => food.id === args.foodId);
  for (const field of Object.entries({
    name: args.name,
    calories: args.calories,
    protein: args.protein,
    carbohydrates: args.carbohydrates,
    fat: args.fat,
  })) {
    targetFood[field[0]] = field[1];
  }
  const targetMealIndex = user.meals.findIndex(
    (meal) => meal.id === args.mealId
  );
  user.meals[targetMealIndex].foods = foods;
  await user.save();
  return "Food updated.";
};

const deleteFood = async (args) => {
  const user = await getUser(args.token);
  const meals = user.meals;
  const meal = meals.find((meal) => meal.id === args.mealId);
  const foods = meal.foods;
  const targeFoodIndex = foods.findIndex((food) => food.id === args.foodId);
  foods.splice(targeFoodIndex, 1);
  const targetMealIndex = user.meals.findIndex(
    (meal) => meal.id === args.mealId
  );
  user.meals[targetMealIndex].foods = foods;
  await user.save();
  return "Food deleted.";
};

module.exports = {
  getAllFoods: getAllFoods,
  getFood: getFood,
  createFood: createFood,
  updateFood: updateFood,
  deleteFood: deleteFood,
};
