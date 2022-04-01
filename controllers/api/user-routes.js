const express = require('express');
const router = express.Router();

const { User } = require('../../models');

/* const inputCheck = require('../../utils/inputCheck'); */


/*---------------------------------------------------------------
-                         GET ALL USERS PROFILES
---------------------------------------------------------------*/

router.get('/', async (req, res) => {
  try {
      const userdata = await User.findAll();
      res.status(200).json(userdata);
  } catch (err) {
      res.status(500).json(err);
  }
});

/*---------------------------------------------------------------
-                       GET 1 USER PROFILE
---------------------------------------------------------------*/

/* router.get('/users/:id', (req, res) => {
  const sql = `SELECT * FROM users WHERE id = ?`;
  const params = [req.params.id];
  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
}); */

/*---------------------------------------------------------------
-                       DELETE 1 USER PROFILE
---------------------------------------------------------------*/

/* router.delete('/users/:id', (req, res) => {
  const sql = `DELETE FROM users WHERE id = ?`;
  const params = [req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
      // checks if anything was deleted
    } else if (!result.affectedRows) {
      res.json({
        message: 'User not found'
      });
    } else {
      res.json({
        message: 'user deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
}); */


/*---------------------------------------------------------------
-                      CREATE USER PROFILE
---------------------------------------------------------------*/

router.post('/adduser', async ({ body }, res) => {

  try{
    const newUser = await User.create({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      user_name: body.user_name,
      secret_key: body.secret_key
    })
    res.status(200).json(newUser);
  }
  catch(err){
    console.error(err);
    res.status(500).json(err);
  }
});


module.exports = router;