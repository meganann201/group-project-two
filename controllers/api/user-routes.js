const express = require('express');
const router = express.Router();
const db = require('../../config/connection');
const inputCheck = require('../../utils/inputCheck');

/*---------------------------------------------------------------
-                         GET ALL USERS PROFILES
---------------------------------------------------------------*/

router.get('/users', (req, res) => {
  const sql = `SELECT * FROM users`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

/*---------------------------------------------------------------
-                       GET 1 USER PROFILE
---------------------------------------------------------------*/

router.get('/users/:id', (req, res) => {
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
});

/*---------------------------------------------------------------
-                       DELETE 1 USER PROFILE
---------------------------------------------------------------*/

router.delete('/users/:id', (req, res) => {
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
});


/*---------------------------------------------------------------
-                      ADD a USER PROFILE
---------------------------------------------------------------*/

router.post('/user', ({ body }, res) => {

  const errors = inputCheck(body, 'first_name', 'last_name', 'email');
  
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  
    const sql = `INSERT INTO users (first_name, last_name, email) VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.email];
  
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

router.post('/users', ({ body }, res) => {

  const errors = inputCheck(body, 'first_name', 'last_name', 'email');
  
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  
    const sql = `INSERT INTO users (first_name, last_name, email) VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.email];
  
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

module.exports = router;