const { Recipe, Comment, User, Category } = require('../models');

const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
      const dbRecipeData = await Recipe.findAll({
        attributes: [
          "id",
          "recipe_name",
          "image",
          "user_id"
        ],
        include: [
          {
            model: User,
            attributes: ["user_name"]
          },
          {
           model: Category,
           attributes: ["category_name"] 
          }
        ]
      }) 

      const dbCategoryData = await Category.findAll({
        attributes: [
          "category_name"
        ]
      })

      const categories = dbCategoryData.map((category) =>
        category.get({plain: true})
        );
      const recipes = dbRecipeData.map((recipe) =>
        recipe.get({ plain: true})
        );
      res.render('homepage', {
        recipes,
        categories,
      });
      
    }  catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/login', (req, res) => {  
    res.render('login');
  });

//router.get('/recipe', (req,res) => {
  //  res.render('single-recipe');
// })

router.get('/recipe/:id', (req, res) => {
  Recipe.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "recipe_name",
      "description",
      "user_id",
      "steps",
      "ingredients",
      "time",
      "servings",
      "image"

    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment", "recipe_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["user_name"],
        },
      },
      {
        model: User,
        attributes: ["user_name"],
      },
      {
        model: Category,
        attributes: ['category_name']
      }
    ],
  })
    .then((dbRecipeData) => {
      if (!dbRecipeData) {
        res.status(404).json({ message: "No recipe found with this id" });
        return;
      }

      // serialize the data
      const recipe = dbRecipeData.get({ plain: true });

      // pass data to template
      res.render("single-recipe", {
        recipe,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
