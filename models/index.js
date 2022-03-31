const User = require("./User");
const Recipe = require("./Recipe");
const Favorite = require("./Favorite");
const Category = require("./Category");
const RecipeCategory = require("./RecipeCategory");

Favorite.belongsTo(User, {
  foreignKey: "user_id",
});

Favorite.belongsTo(Recipe, {
  foreignKey: "recipe_id",
});

User.hasMany(Favorite, {
  foreignKey: "user_id",
});

Recipe.hasMany(Favorite, {
  foreignKey: "recipe_id",
});

Recipe.belongsTo(Category, {
  foreignKey: "category_id",
});

Category.hasMany(Recipe, {
  foreignKey: "category_id",
});

Recipe.belongsToMany(Category, {
  through: RecipeCategory,
  foreignKey: "recipe_id",
});

Category.belongsToMany(Recipe, {
  through: RecipeCategory,
  foreignKey: "category_id",
});

module.exports = {
  Favorite,
  User,
  Category,
  Recipe,
  RecipeCategory,
};
