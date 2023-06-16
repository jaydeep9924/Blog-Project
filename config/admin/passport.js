const passport = require('passport');

const bcrypt = require('bcrypt')

// admin model
const admin = require('../../model/admin/adminForm');

// stragey
const passportLocal = require('passport-local').Strategy;

passport.use(new passportLocal({
  usernameField : 'email',
}, async (email,password,done)=>{

  let data = await admin.findOne({email : email});
  if(!data || password != data.password){
    return done(null, false);
  }
  else{
    return done(null,data);
  }
}
));

// serializer
passport.serializeUser((data,done)=>{
  return done(null, data.id);
});

// deserializeUser
passport.deserializeUser(async (id,done)=>{
  let record  = await admin.findById(id);

  if(record){ return done(null, record); }
  else{ return done(null, false)};
});

// check login
passport.CheckLogin = (req,res,next)=>{

  if(req.isAuthenticated()){
    next();
  }
  else{ return res.redirect('/'); }
  
};

// get data 
passport.getData = (req,res,next)=>{
  if(req.isAuthenticated()){
    res.locals.admin = req.user;
  };
  next();
}
 
module.exports = passport;