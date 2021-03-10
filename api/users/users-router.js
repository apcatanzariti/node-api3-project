const express = require('express');
// You will need `users-model.js` and `posts-model.js` both
const Users = require('./users-model');
const Posts = require('./../posts/posts-model');
// The middleware functions also need to be required
const { validateUserId, validateUser, validatePost } = require('./../middleware/middleware');

const router = express.Router();

router.get('/', (req, res, next) => {
  Users.get()
  .then((users) => {
    res.status(200).json(users);
  })
  .catch((err) => {
    res.status(400).json({ message: 'could not fetch users' });
  })
});

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user);
});

router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
  .then((user) => {
    res.status(201).json(user);
  })
  .catch((err) => {
    res.status(500).json({ message: 'something went wrong with this post request...' });
  })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  Users.update(id, changes)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(err => {
    res.status(500).json({ message: 'something went very wrong with updating this user :(' });
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  Users.remove(req.params.id)
  .then(rem => {
    res.status(200).json({ message: 'user has been removed!' });
  })
  .catch(err => {
    res.status(500).json({ message: 'oh no.. something went wrong deleting the user..' });
  }) 
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  Users.getUserPosts(req.params.id)
  .then(posts => {
    res.status(200).json(posts);
  })
  .catch(err => {
    res.status(500).json({ message: 'oh boy, something went wrong retrieving this users posts...' });
  })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  Posts.insert(req.body)
  .then(newPost => {
    res.status(200).json(newPost);
  })
  .catch(err => {
    res.status(500).json({ message: 'oh no...' });
  })
});

// do not forget to export the router

module.exports = router;