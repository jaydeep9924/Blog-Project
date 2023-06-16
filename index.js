const express = require('express');

const port = 8000;
const app = express();
const path = require('path');

app.use(express.static('asstes'));
app.use(express.static('asstes/user'));

app.use('/imgFloder/slider',express.static(path.join(__dirname,'imgFloder/slider')));
app.use('/imgFloder/admin',express.static(path.join(__dirname,'imgFloder/admin')));
app.use('/imgFloder/offer',express.static(path.join(__dirname,'imgFloder/offer')));
app.use('/imgFloder/recent',express.static(path.join(__dirname,'imgFloder/recent')));
app.use('/imgFloder/blog',express.static(path.join(__dirname,'imgFloder/blog')));
app.use('/imgFloder/comment',express.static(path.join(__dirname,'imgFloder/comment')));

// mongoose
// const db = require('./config/admin/mongoose');
const mongoose = require('mongoose')

const url = `mongodb+srv://jaydeepatel:Jaydeep123@cluster0.bscpzyc.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true 
  })
  .then( () => {
    console.log('Connected to database ')
  })
  .catch( (err) => {
      console.error(`Error connecting to the database. \n${err}`);
  });


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended : true}));

const flash = require('connect-flash')
const flashMessage = require('./config/admin/flash');

const passportLocal = require('./config/admin/passport');
const passport = require('passport');
const session = require('express-session');

const cookie = require('cookie');
const cookie_parser = require('cookie-parser');
app.use(cookie_parser());

app.use(session({
  name : 'Dynemic Project',
  secret : 'Code',
  resave : false,
  saveUninitialized : false,
  cookie :{
    maxAge : 1000*60*60
  }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.getData);
app.use(flash());
app.use(flashMessage.setFlash);


app.use('/', require('./router/adminRouter/adminRouter'));
app.use('/user',passport.CheckLogin,require('./router/userRouter/userRouter'));

app.listen(port,(err)=>{
  if(err){ console.log(err); return false;}
  console.log('SERVER IS CONNECTED ON PORT',port);
});