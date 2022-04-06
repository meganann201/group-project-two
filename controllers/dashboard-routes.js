const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Recipe } = require('../models');
const withAuth = require('../utils/auth');

/*---------------------------------------------------------------
-                     GET ALL RECIPES for specific user
---------------------------------------------------------------*/

router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  Recipe.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'recipe_name',
      'description',
      'user_id',
      'steps',
      'ingredients',
      'time',
      'servings',
      'image',
      [sequelize.literal('SELECT * FROM recipe WHERE user_id = 1')], // ???
    ],
    include: [
      {
      model: User,
      attributes: ['user_name']
      }
    ]
  })
  .then(dbRecipeData => {
    const recipes = dbRecipeData.map(recipe => recipe.get({ plain: true}));
    res.render('dashboard', {recipes, loggedIn: true });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

/*---------------------------------------------------------------
-                     EDIT a Recipe
---------------------------------------------------------------*/

router.get('/edit/:id', withAuth, (req, res) => {
  Recipe.findByPk(req.params.id, {
    attributes: [
      'id',
      'recipe_name',
      'description',
      'user_id',
      'steps',
      'ingredients',
      'time',
      'servings',
      'image',
      [sequelize.literal('SELECT * FROM recipe WHERE recipe.user_id = user_id)')]
    ]
  })
    .then(dbRecipeData => {
      if (dbRecipeData) {
        const recipe = dbRecipeData.get({ plain: true });
        
        res.render('single-recipe', {
          post,
          loggedIn: true
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});


module.exports = router;