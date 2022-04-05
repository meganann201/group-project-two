const router = require('express').Router();
const { Recipe, User, Comment, RecipeCategory, Category } = require('../../models');

// get all recipes
router.get('/', async (req, res) => {
    try {
        const recipeData = await Recipe.findAll({
            attributes: [
              'id',
              'recipe_name',
              'description',
              'user_id',
              'steps',
              'ingredients',
              'time',
              'servings',
              'image'
            ],
            order: [['created_at', 'DESC']],
            include: [
              {
                model: Comment,
                attributes: ['id', 'comment', 'recipe_id', 'user_id', 'created_at'],
                include: {
                  model: User,
                  attributes: ['user_name']
                }
              },
              {
                model: User,
                attributes: ['user_name']
              }
            ]
          });
        res.status(200).json(recipeData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get a single recipe
router.get('/:id', async (req, res) => {
    try {
        const recipeData = await Recipe.findOne({
            where: {
                id: req.params.id
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
                'image'
              ],
              include: [
                {
                  model: Comment,
                  attributes: ['id', 'comment', 'recipe_id', 'user_id', 'created_at'],
                  include: {
                    model: User,
                    attributes: ['user_name']
                  }
                },
                {
                  model: User,
                  attributes: ['user_name']
                },
                {
                    model: Category,
                    attributes: ['category_name']
                  }
              ]
        });
        if (!recipeData) {
            res.status(400).json({ message: 'There is not a recipe with that id.'});
            return;
        }
        res.status(200).json(recipeData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// create a recipe
router.post('/', async (req, res) => {
    try {
        const createRecipe = await Recipe.create({
            recipe_name: req.body.recipe_name,
            description: req.body.description,
            user_id: req.body.user_id,
            steps: req.body.steps,
            ingredients: req.body.ingredients,
            time: req.body.time,
            servings: req.params.servings
        });
        res.status(200).json(createRecipe);
    } catch (err) {
        res.status(400).json(err);
    }
});

//update a recipe

router.put('/:id', async (req, res) => {
    try {
        const updateRecipe = await Recipe.update({
            recipe_name: req.body.recipe_name,
            description: req.body.description,
            steps: req.body.steps,
            ingredients: req.body.ingredients,
            time: req.body.time
        },
        {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(updateRecipe);
    } catch (err) {
        res.status(400).json(err);
    }
})

// delete a recipe
router.delete('/:id', async (req, res) => {
    try {
        const recipeData = await Recipe.destroy({
            where: {
                recipe_id: req.params.recipe_id
            }
        });
        if (!recipeData) {
            res.status(400).json({ message: 'There is not a recipe with that id.'});
            return;
        }
        res.status(200).json(recipeData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;