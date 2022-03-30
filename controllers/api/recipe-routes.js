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
        const recipesdata = await Recipe.findByPk(req.params.id);
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
            user_id: req.body.user_id
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
                id: req.params.id
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