const express = require('express');
const router = express.Router();

const { User } = require('../../models');

/* const inputCheck = require('../../utils/inputCheck'); */


/*---------------------------------------------------------------
-                         GET ALL USERS PROFILES
---------------------------------------------------------------*/

router.get('/', (req, res) => {
  
  User.findAll()
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
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

/* router.post('/users', ({ body }, res) => {

  const errors = inputCheck(body, 'first_name', 'last_name', 'email', 'user_name', 'secret_key');
  
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  
  const sql = `INSERT INTO users (first_name, last_name, email, user_name, secret_key) VALUES (?,?,?,?,?)`;
  const params = [body.first_name, body.last_name, body.email, body.user_name, body.secret_key];
  
  db.query(sql, params, (err, result) => {

    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    res.json({
      message: 'success',
      data: body
    });
  });
});
 */
module.exports = router;