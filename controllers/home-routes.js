const { Recipe, Comment, User, Category, RecipeCategory, Favorite } = require('../models');

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
      },
      {
        model: Favorite,
        attributes: ["id"],
        where:{
          // user_id: req.session.user_id || 0
          user_id: 1
        },
        required: false 
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
  Category.findAll({
    attributes: 
    [
      "id"
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
.then((dbFavoriteData) => {
  if (!dbFavoriteData) {
    res.status(404).json({ message: "No favorites found with this name" });
    return;
  }

  // serialize the data
  const favorites = dbFavoriteData.map(favorites => favorites.get({ plain: true }));
   
  // pass data to template
  res.render("favorites", {
    favorites,
  });
})
.catch((err) => {
  console.log(err);
  res.status(500).json(err);
});
});

router.get('/categories', (req, res) => {  
  Category.findAll({
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
      const category = dbCategoryData.map(category => category.get({ plain: true }));
       
      // pass data to template
      res.render("categories", {
        category,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
 
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
