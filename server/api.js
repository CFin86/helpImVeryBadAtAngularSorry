// WEEK 5/ DAY 23 / SLIDE 15
var express=require('express');
// BUT A MORE DETAILED SLIDE IS ON WEEK 6/ DAY 25/ SLIDE 14
var postCtrl = require("./controllers/posts.ctrl");
var usersCtrl = require("./controllers/users.ctrl");
var catCtrl =require('./controllers/categories.ctrl');

var router = express.Router();

router.use('/posts', postCtrl);
router.use('/users', usersCtrl);
router.use('/categories', catCtrl);

module.exports = router;