const router = require('express').Router();
const { Comment, Recipe } = require('../../models');


// get all comments from a recipe
router.get('/recipe/:id', async (req, res) => {
    try {
        const commentsdata = await Comment.findAll({
            where: {
                recipe_id: req.params.recipe_id
            }
        });
        res.status(200).json(commentsdata);
    } catch (err) {
        res.status(500).json(err);
    }
})


// create a comment 
router.post('/recipe/comments', async (req, res) => {
    try {
        const createdcomment = await Comment.create({
            user_id: req.body.user_id,
            recipe_id: req.body.recipe_id,
            comment: req.body.comment
        });
        res.status(200).json(createdcomment);
    } catch (err) {
        res.status(400).json(err);
    }
});

// delete a comment
router.delete('/:id', async (req, res) => {
    try {
        const commentdata = await Comment.destroy({
            where: {
                comment_id: req.params.comment_id
            }
        });
        if (!commentdata) {
            res.status(400).json({ message: 'There is not a comment with that id.'});
            return;
        }
        res.status(200).json(commentdata);
    } catch (err) {
        res.status(500).json(err);
    }
});

// edit an existing comment
router.patch('/recipe/:id', async (req, res) => {
    try {
        const updatedcomment = await Comment.update({
          comment: req.body.comment  
        });
        Comment.save();
        res.status(200).json(updatedcomment);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;

