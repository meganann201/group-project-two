const sequelize = require('../config/connection');
const { Category, User, Recipe, Comment } = require('../models');

const userSeedData = require('./userSeedData.json');
const recipeSeedData = require('./recipeSeedData.json');
const categorySeedData = require('./categorySeedData.json');
const commentSeedData = require('./commentSeedData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userSeedData, {
    individualHooks: true,
    returning: true,
  });

  const recipes = await Recipe.bulkCreate(recipeSeedData, {
    individualHooks: true,
    returning: true,
  });

  const categories = await Category.bulkCreate(categorySeedData, {
    individualHooks: true,
    returning: true,
  });

  const comments = await Comment.bulkCreate(commentSeedData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
