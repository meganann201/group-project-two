const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class RecipeCategory extends Model {}

RecipeCategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    recipe_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "recipe",
        key: "id",
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "category",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "recipecategory",
  }
);

module.exports = RecipeCategory;
