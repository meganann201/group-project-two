const { Recipe, Comment, User, Category } = require('../models');

const router = require('express').Router();

router.get('/', (req, res) => {  
    res.render('homepage');
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
        attributes: ["id", "comment_text", "recipe_id", "user_id", "created_at"],
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

router.get('/favorites', (req, res) => {  
  res.render('favorites');
});

router.get('/categories', (req, res) => {  
  res.render('categories');
});

router.get('/category/:category_name', (req, res) => {  
  Category.findOne({
    where: {
      category_name: req.params.category_name,
    },
    attributes: 
      [ "id",
        "category_name"
      ],
      include: [
        {
          model: Recipe,
          attributes: ["id", "recipe_name", "description", "user_id", "image"],
          include: {
            model: User,
            attributes: ["user_name"],
          },
        }
      ]
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(404).json({ message: "No category found with this name" });
        return;
      }

      // serialize the data
      const category = dbCategoryData.get({ plain: true });
       
      // pass data to template
      res.render("single-category", {
        category,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/dashboard', (req, res) => {  
  res.render('dashboard');
});

module.exports = router;
