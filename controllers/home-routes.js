const { Recipe } = require('../models');

const router = require('express').Router();

router.get('/', (req, res) => {  
    res.render('homepage');
  });


router.get('/login', (req, res) => {  
    res.render('login');
  });

router.get('/recipe', (req,res) => {
    res.render('single-recipe');
})

module.exports = router;
