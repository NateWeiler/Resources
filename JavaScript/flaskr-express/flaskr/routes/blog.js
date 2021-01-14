const express = require('express');
const router = express.Router();

const db = require('../db');

/**
 * Blog Router
 *
 * Module containing all route handlers for blog posts
 * similar to Flask's Blueprints
 */
const getDate = () => {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
};

// Blog Posts
router.get('/', (req, res, next) => {
  posts = db.getPosts();

  res.render('blog/index', { title: 'Posts', posts });
});

// Create Post
router.route('/create')
.get((req, res, next) => {
  res.render('blog/form', { title: 'Create Post' });
})
.post((req, res, next) => {
  const { title, body } = req.body;
  const errors = [];
  
  if (!title) {
    errors.push('Post title is required.');
  }

  if (errors.length) {
    res.render('blog/form', { title: 'Create Post', errors, form: req.body });
  } else {
    db.insertPost({
      title,
      body,
      created: getDate(),
      authorID: res.locals.user.id
    });
    res.redirect('/');
  }
});

// Update Post
router.route('/:id/update')
.all((req, res, next) => {
  post = db.getPostByID(req.params.id);

  if (!post) {
    res.status(404).send('Post Not Found');
  } else if (res.locals.user.id != post.authorID) {
    res.status(403).send('Not authorized');
  }

  res.locals.post = post;
  next();
})
.get((req, res, next) => {
  res.render('blog/form', { title: 'Update Post', form: res.locals.post });
})
.post((req, res, next) => {
  const { title, body } = req.body;
  const errors = [];
  
  if (!title) {
    errors.push('Post title is required.');
  }

  if (errors.length) {
    res.render('blog/form', { title: 'Update Post', errors, form: req.body });
  } else {
    db.updatePost(res.locals.post.id, { title, body });
    res.redirect('/');
  }
});

module.exports = router;
