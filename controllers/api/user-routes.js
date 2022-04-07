const express = require('express');
const router = express.Router();
const withAuth = require('../../utils/auth');

const { User, Recipe, Comment } = require('../../models');

/*---------------------------------------------------------------
-                         GET ALL USERS PROFILES
---------------------------------------------------------------*/

router.get('/', async (req, res) => {
  try {
      const userdata = await User.findAll({
        attributes: { exclude: ['password'] }
      });
      res.status(200).json(userdata);
  } catch (err) {
      res.status(500).json(err);
  }
});

/*---------------------------------------------------------------
-                       GET 1 USER PROFILE
---------------------------------------------------------------*/

router.get("/:id", (req, res) => {
      User.findOne({
        attributes: {
          exclude: ["secret_key"]
        },
        where: {
          id: req.params.id,
        },
        include: [{
            model: Recipe,
            attributes: [
              "id",
              "recipe_name",
              "description",
              "steps",
              "ingredients",
              "time",
              "servings",
              "image",
            ],
          },
          {
            model: Comment,
            attributes: ["id", "comment", "recipe_id", "user_id", "created_at"],
            include: {
              model: Recipe,
              attributes: ["recipe_name"],
            },
          },
        ],
      })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
      
/*---------------------------------------------------------------
-                      UDPATE USER PROFILE
---------------------------------------------------------------*/

router.put("/:id", (req, res) => {
  User.update(
    {
      email: req.body.email,
      user_name: req.body.user_name,
      secret_key: req.body.secret_key,
    },
    {
    individualHooks: true,
    where: {
      id: req.params.id
    }
   })
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});  

/*---------------------------------------------------------------
-                       DELETE 1 USER PROFILE
---------------------------------------------------------------*/

router.delete('/:id', withAuth ,(req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((dbUserData) => res.json(dbUserData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
})

/*---------------------------------------------------------------
-                      CREATE USER PROFILE
---------------------------------------------------------------*/

router.post('/', (req, res) => {
  
  User.create({
    user_name: req.body.user_name,
    email: req.body.email,
    secret_key: req.body.secret_key
  })
  .then(dbUserData => {
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.user_name = dbUserData.user_name;
      req.session.loggedIn = true;
  
      res.json(dbUserData);
    });
  })
});

router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that email address!' });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.secret_key);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      // declare session variables
      req.session.user_id = dbUserData.id;
      req.session.user_name = dbUserData.user_name;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  });
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
});

module.exports = router;