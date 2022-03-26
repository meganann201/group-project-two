const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const recipeRoutes = require('./recipe-routes');
const commentRoutes = require('./comment-routes');
const categoryRoutes = require('./category-routes');


router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);
router.use('/comments', commentRoutes);
router.use('/categories', categoryRoutes);



module.exports = router;