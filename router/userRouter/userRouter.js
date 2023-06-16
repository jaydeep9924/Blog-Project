const express = require('express');

// slider
const slider = require('../../model/admin/sliderForm');

// form
const offer = require('../../model/admin/offerForm');

// recent
const recent = require('../../model/admin/recentFrorm');

// review
const review = require('../../model/admin/reviewForm');

// blog
const blog = require('../../model/admin/blogForm');

// comment
const comment =  require('../../model/admin/comment');

// router
const router = express.Router();

// controller
const userCon = require('../../controller/userController/userController');

// request
router.get('/',async (req,res) =>{ 

  let sliderData = await slider.find({isActive : true});
  let offerData = await offer.find({});
  let recentData = await recent.find({});
  let reviewData = await review.find({});
  let blogData = await blog.find({});

  res.render('user/dashboard',{
    sliderRecord : sliderData,
    offerRecord : offerData,
    recentRecord : recentData,
    reviewRecord : reviewData,
    blogRecord : blogData,
  }); 

});

// blog
router.get('/blog/:id', userCon.blogPage);

// comment data
router.post('/comment',comment.commentUploaded , userCon.comment);

// exports
module.exports = router;
