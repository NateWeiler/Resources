const express = require('express');
const router = express.Router();

const db = require('../db');

/**
 * Auth Router
 *
 * Module containing all route handlers for authentication
 * similar to Flask's Blueprints
 */


// Register Route
router.route('/register')
.get((req, res, next) => {
  res.render('auth/form', { title: 'Register' });
})
.post((req, res, next) => {
  const { username, password } = req.body;
  const errors = [];

  if (!username || !password) {
    errors.push('Username and password are required');
  }

  const user = db.getUserByName(username);
  if (user) {
    errors.push('User already exists. Try again.');
  }

  if (errors.length) {
    res.render('auth/form', { title: 'Register', errors });
  } else {
    // TODO: hash password before inserting into db
    db.insertUser({ username, password });
    res.redirect('/auth/login');
  }
});


// Login Route
router.route('/login')
.get((req, res, next) => {
  res.render('auth/form', { title: 'Log In' });
})
.post((req, res, next) => {
  const { username, password } = req.body;
  const errors = [];

  if (!username || !password) {
    errors.push('Username and password are required');
  }

  const user = db.getUserByName(username);

  if (!user) {
    errors.push('Incorrect username');
  } else if (password != user.password) {
    // TODO: check password hash instead of plaintext
    errors.push('Incorrect password');
  }

  if (errors.length) {
    res.render('auth/form', { title: 'Log In', errors });
  } else {
    // TODO: use signed session instead of plaintext id
    res.cookie('userID', user.id);
    res.redirect('/');
  }
});

// Logout Route
router.get('/logout', (req, res, next) => {
  // TODO: use signed session instead of plaintext id
  res.clearCookie('userID');
  res.redirect('/');
});

module.exports = router;
