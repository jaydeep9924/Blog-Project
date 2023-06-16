const express = require('express');

// router
const router = express.Router();

// passport
const passport = require('passport');

// controller
const adminCo = require('../../controller/adminController/adminCo');

// slider 
const slider = require('../../model/admin/sliderForm');

// admin
const admin = require('../../model/admin/adminForm');

// offer
const offer = require('../../model/admin/offerForm');

// recent
const recent = require('../../model/admin/recentFrorm');

// blog
const blog = require('../../model/admin/blogForm');

// request

//  main page
router.get('/', adminCo.dashboard);

// table
router.use('/table', passport.CheckLogin,require('./table'));

// profile
router.get('/profile',passport.CheckLogin ,adminCo.profile);

// login page
router.get('/loginPage', (req,res)=>{ return res.render('admin/login')});
router.post('/loginForm', passport.authenticate('local',{failureRedirect : '/'}) , adminCo.loginForm);

// sliderForm page
router.get('/sliderForm', passport.CheckLogin, adminCo.sliderForm);
router.post('/sliderForm',passport.CheckLogin ,slider.sliderImgName ,adminCo.sliderFormData);

// admin form page
router.get('/adminForm',passport.CheckLogin ,(req,res)=>{ return res.render('admin/form/adminForm'); });
router.post('/adminForm', passport.CheckLogin, admin.adminUploaded, adminCo.adminForm);

// offer page
router.get('/OfferPage', passport.CheckLogin, (req,res)=> { res.render('admin/form/offerForm'); });
router.post('/offerData', passport.CheckLogin, offer.offerImgName, adminCo.offergetData);

// recent page
router.get('/recentPage', passport.CheckLogin, (req,res)=>{ res.render('admin/form/recentForm'); });
router.post('/recentForm', passport.CheckLogin, recent.recentUploaded, adminCo.recentData);

// review page
router.get('/reviewPage', passport.CheckLogin, (req,res)=>{ res.render('admin/form/reviewForm'); });
router.post('/reviewForm', passport.CheckLogin, adminCo.reviewData);

// blog page
router.get('/blogPage', passport.CheckLogin, (req,res)=>{ res.render('admin/form/blogForm'); });
router.post('/blogForm', passport.CheckLogin, blog.blogUploaded, adminCo.blogForm);

// password page
router.get('/passwordPage', passport.CheckLogin, (req,res)=>{ res.render('admin/changePassword'); });
router.post('/password', passport.CheckLogin, adminCo.Password);

// logout
router.get('/logout', (req,res,next)=>{

  req.logOut((err)=>{
    if(err){ next(err)};
  });
  return res.redirect('/');

});

// chek email
router.get('/checkEmail', (req,res)=>{
  res.render('admin/checkEmail')
});

// get email
router.post('/checkEmail', adminCo.checkEmail);

// otp page
router.get('/otpPage', (req,res)=>{
  res.render('admin/otp')
});

// otp match
router.post('/otpMatch', adminCo.otpMatch);

// reset password page
router.get('/resetPassword', (req,res)=>{
  res.render('admin/resetPassword')

});

// reset Password
router.post('/resetPassword', adminCo.resetPassword);

// exports 
module.exports = router;