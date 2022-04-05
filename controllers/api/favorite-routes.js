const router = require("express").Router();
const { Favorite, RecipeCategory, User } = require("../../models");
const { route } = require("../home-routes");

router.get("/", (req, res) => {
  Favorite.findAll({
    where: {
      user_id: req.session.user_id
    },
    include: [
      {
        model: Recipe,
        attributes: ["id", "recipe_name"],
        through: RecipeCategory,
        as: "recipes",
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then(res.status(200))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post((req, res) => {
  Favorite.create({
    recipe_id: req.body.recipe_id,
    user_id: req.session.user_id
  })
  .then(res.status(200))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete((req, res) => {
  Favorite.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(res.status(200))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});





module.exports = router;
