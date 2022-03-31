const router = require('express').Router();
const { Recipe } = require('../../models');

// get all recipes
router.get('/', async (req, res) => {
    try {
        const recipesdata = await Recipe.findAll();
        res.status(200).json(recipesdata);
    } catch (err) {
        res.status(500).json(err);
    }
});

// et a single recipe
router.get('/:id', async (req, res) => {
    try {
        const recipesdata = await Recipe.findByPk(req.params.recipe_id);
        if (!recipesdata) {
            res.status(400).json({ message: 'There is not a recipe with that id.'});
            return;
        }
        res.status(200).json(recipesdata);
    } catch (err) {
        res.status(500).json(err);
    }
});

// create a recipe
router.post('/', async (req, res) => {
    try {
        const createddata = await Recipe.create({
            recipe_id: req.body.recipe_id,
            recipe_name: req.body.recipe_name,
            description: req.body.description,
            user_id: req.body.user_id,
            steps: req.body.steps,
            ingredients: req.body.ingredients,
            time: req.body.time
        });
        res.status(200).json(createddata);
    } catch (err) {
        res.status(400).json(err);
    }
});

// delete a recipe
router.delete('/:id', async (req, res) => {
    try {
        const recipesdata = await Recipe.destroy({
            where: {
                recipe_id: req.params.recipe_id
            }
        });
        if (!recipesdata) {
            res.status(400).json({ message: 'There is not a recipe with that id.'});
            return;
        }
        res.status(200).json(recipesdata);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;