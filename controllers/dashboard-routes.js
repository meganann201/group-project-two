const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Recipe } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'email',
      'user_name',
      [sequelize.literal(''] // MISSING (gui)
    ],
    include: [
      {
        model: Recipe,
        attributes: ['id', 'recipe_name', 'description', 'user_id', 'steps', 'ingredients', 'time', 'servings', 'image'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;