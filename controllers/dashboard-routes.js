const router = require('express').Router();
const { Post } = require('../models/');
// TODO: Go to '../utils/auth' and complete middleware function// V
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    // TODO: 1. Find all Posts for a logged in user (use the req.session.userId)
    const postData = await Post.findAll({where:{userId: req.session.userId}});
    console.log('postData',postData)
    // TODO: 2. Serialize data (use .get() method, or use raw: true, nest: true in query options)
    const posts = postData.map((post) => post.get({plain: true}))
    console.log('posts',posts)
    // TODO: 3. Render the 'all-posts-admin' template in the 'dashboard' layout with the posts data
    res.render('all-post-admin', posts)

  } catch (err) {
    res.redirect('login');
  }
});

router.get('/new', withAuth, (req, res) => {
  res.render('new-post', {
    layout: 'dashboard',
  });
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    // TODO: 1. Find a Post by primary key
    const postData = await Post.findByPk();
    // TODO: 2. Serialize data (use .get() method, or use raw: true, nest: true in query options)
    const posts  = postData.map((post)=>{post.get({plain: true})})
    // TODO: 3. Render the 'edit-post' template in the 'dashboard' layout with the post data
    res.render('edit-post', posts)

  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;
