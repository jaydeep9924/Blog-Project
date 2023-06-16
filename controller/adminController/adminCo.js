
const bcrypt = require('bcrypt');
const slider = require('../../model/admin/sliderForm');
const admin = require('../../model/admin/adminForm');
const offer = require('../../model/admin/offerForm');
const recent = require('../../model/admin/recentFrorm');
const review = require('../../model/admin/reviewForm');
const blog = require('../../model/admin/blogForm');
const nodemailer = require('nodemailer');

module.exports.dashboard = (req,res) =>{
  if(req.isAuthenticated()){
    return res.render('admin/dashboard');
  }
  else{
   return res.redirect('/loginPage')
  }
};

module.exports.sliderForm = (req,res) =>{ return res.render('admin/form/sliderForm')};

module.exports.sliderFormData = async (req,res)=>{

  let imgPath = '';
  if(req.file){
    imgPath = slider.sliderPath+'/'+req.file.filename;
    req.body.profile = imgPath;
  }
  req.body.isActive = true;
  let data = await slider(req.body);
  data.save();

  if(data){
    req.flash('success' ,'Slider Added Suscessfully');
    return res.redirect('/sliderForm');
  }
  else{
    req.flash('error','Insert Data proper');
    return res.redirect('/sliderForm');
  }
};


module.exports.adminForm = async (req,res)=>{

  var img = '';
  if(req.file){
    img = admin.adminImgName+'/'+req.file.filename;
    req.body.adminProfile = img;
  }
  req.body.isActive = true;
  let data = await admin(req.body);
  data.save();

  if(data){
    req.flash('success' ,'Admin Added Suscessfully');
    return res.redirect('/adminForm')
  }
  else{
    req.flash('error','Insert Data proper');
    return res.redirect('/adminForm');
  }
};


module.exports.offergetData = async (req,res)=>{

  var img = '';
  if(req.file){
    img = offer.offerPath+'/'+req.file.filename;
    req.body.Icon = img;
  }
  let data = await offer(req.body);
  data.save();

  if(data){
    req.flash('success','Offer Data Added');
    return res.redirect('/OfferPage')
  }
  else{
    req.flash('error','Insert Data proper');
    return res.redirect('/OfferPage');
  }
};


module.exports.recentData = async (req,res)=>{

  var img = '';
  if(req.file){
    img = recent.recentImgName+'/'+req.file.filename;
    req.body.profile = img;
  }
  let data = await recent(req.body);
  data.save();

  if(data){
    req.flash('success','Recent Data Added');
    return res.redirect('/recentPage')
  }
  else{
    req.flash('error','Insert Data proper');
    return res.redirect('/recentPage');
  }
};

// review
module.exports.reviewData = async (req,res)=>{
  let data = await review(req.body);
  data.save();
  if(data){
    req.flash('success','Review Added');
    return res.redirect('/reviewPage')
  }
  else{
     req.flash('error','Something Wrong')
    return res.redirect('/reviewPage');
  }
};


module.exports.blogForm = async (req,res)=>{

  var img = '';
  if(req.file){
    img = blog.blogImgName+'/'+req.file.filename;
    req.body.profile = img;
    var date = new Date().toJSON().slice(0,10).split('-').reverse().join('/');
    req.body.date = date;
    req.body.name = req.user.name;
  }
  req.body.isActive = true;
  let data = blog(req.body);
  data.save();

  if(data){
    req.flash('success','Blog Data Added');
    return res.redirect('/blogPage')
  }
  else{
    req.flash('error','Insert Data proper');
    return res.redirect('/blogPage');
  }

};


module.exports.profile = async (req,res)=>{
  return res.render('admin/profile');
};


module.exports.loginForm = async (req,res)=>{ 
  req.flash('success' ,'login Suscessfully');
  return res.redirect('/'); 
};


module.exports.Password = async (req,res)=>{

  let data = await req.user;
  let match = await bcrypt.compare(req.body.cpass,data.password);
  if(match){
    if(req.body.cpass != req.body.newpass){
      if(req.body.newpass === req.body.conpass){
        let record =await admin.findById(data._id);
        if(record){
          let hash = await bcrypt.hash(req.body.newpass,10)
          req.body.newpass = hash;

          let newRecord = await admin.findByIdAndUpdate(record.id,{
            password : req.body.newpass,
          });
          req.flash('success','Password Change SuccessFully');
          return res.redirect('/logout');
        }
        else{ req.flash('error','Enter Proper Password'); return res.redirect('/passwordPage')};
      }
      else{ req.flash('error','Enter Proper Password'); return res.redirect('/passwordPage')};
    }
    else{ req.flash('error','Enter Proper Password'); return res.redirect('/passwordPage')};
  }
  else{ req.flash('error','Enter Proper Password'); return res.redirect('/passwordPage')};

};


// email
module.exports.checkEmail = async (req,res)=>{

  let data = await admin.findOne({email : req.body.email})
  if(data){

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "04d1f7d73a7dca",
        pass: "db3478ca96c20a"
      }
    });
    var otp = Math.ceil(Math.random()*1000);
    res.cookie('otpStore',otp);
    res.cookie('mail', req.body.email);

    let info = await transport.sendMail({
      from: 'jaydeepatel9924@gmail.com', // sender address
      to: req.body.email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: `<b> otp :${otp} </b>`, // html body
    });

    return res.redirect('/otpPage');
  }
  else{
    req.flash('error','Email not found');
    return res.redirect('back');
  }

};

module.exports.otpMatch = async (req,res)=>{
  if(req.body.otp === req.cookies.otpStore){
    res.redirect('/resetPassword');
  }
  else{
    req.flash('error','otp Not Match');
    res.redirect('back')
  }
};

module.exports.resetPassword = async (req,res)=>{

  if(req.body.newpass == req.body.conpass){
    let email = await admin.findOne({email : req.cookies.mail});
    if(email){
      let data = await admin.findById(email.id);
      if(data){
        let upPass = await admin.findByIdAndUpdate(data.id,{password : req.body.newpass})
        if(upPass){
          req.flash('success','change password successfully')
          res.redirect('/')
        }
        else{
          req.flash('error','Enter Proper Password');
          res.redirect('back');
        }
      }
      else{
        req.flash('error','Enter Proper Password');
        res.redirect('back');
      }
    }
    else{
      req.flash('error','Enter Proper Password');
      res.redirect('back');
    }
  }
  else{
    req.flash('error','Enter Proper Password');
    res.redirect('back');
  }
};

