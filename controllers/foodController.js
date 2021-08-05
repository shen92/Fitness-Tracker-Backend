const { v4: uuidv4 } = require("uuid");

const { Food } = require("../models/food");

const getAllFoods = async (req, res, next) => {
  try {
    res.foods = res.meal.foods;
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  next();
};

const createFood = async (req, res, next) => {
  try {
    let user = res.user;
    let foods = res.meal.foods;
    const food = new Food({
      id: uuidv4(),
      name: req.body.name,
      calories: req.body.calories,
      protein: req.body.protein,
      carbohydrates: req.body.carbohydrates,
      fat: req.body.fat,
    });
    foods.push(food);
    const targetMealIndex = user.meals.findIndex(
      (meal) => meal.id === res.meal.id
    );
    user.meals[targetMealIndex].foods = foods;
    await user.save();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  next();
};

const updateFood = async (req, res, next) => {
  try {
    let user = res.user;
    let foods = res.meal.foods;
    const targetFood = foods.find((food) => food.id === req.params.foodId);
    for (const field of Object.entries(req.body)) {
      targetFood[field[0]] = field[1];
    }
    const targetMealIndex = user.meals.findIndex(
      (meal) => meal.id === res.meal.id
    );
    user.meals[targetMealIndex].foods = foods;
    await user.save();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  next();
};

const deleteFood = async (req, res, next) => {
  try {
    let user = res.user;
    let foods = res.meal.foods;
    const targeFoodIndex = foods.findIndex(
      (food) => food.id === req.params.foodId
    );
    foods.splice(targeFoodIndex, 1);
    const targetMealIndex = user.meals.findIndex(
      (meal) => meal.id === res.meal.id
    );
    user.meals[targetMealIndex].foods = foods;
    await user.save();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  next();
};

module.exports = {
  getAllFoods: getAllFoods,
  createFood: createFood,
  updateFood: updateFood,
  deleteFood: deleteFood,
};
