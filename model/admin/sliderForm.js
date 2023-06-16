const mongoose = require('mongoose');

// multer
const multer = require('multer');

// path 
const path = require('path');

// file path
const FloderPath = '/imgFloder/slider';

// schema
const sliderSchema = mongoose.Schema({
  title :{
    type : String,
    require : true,
  },
  profile :{
    type : String,
    require : true,
  },
  message :{
    type : String,
    require : true,
  },
  isActive :{
    type : Boolean,
    require : true,
  }

});

// img storage
const imgStorage = multer.diskStorage({
  destination : (req,file,cb)=>{
    cb(null, path.join(__dirname,'../..',FloderPath));
  },
  filename : (req,file,cb)=>{
    cb(null, file.fieldname+'-'+Date.now());
  }
});

sliderSchema.statics.sliderImgName = multer({storage : imgStorage}).single('profile');
sliderSchema.statics.sliderPath = FloderPath;

// storage data
const slider = mongoose.model('slider',sliderSchema);

// exports
module.exports = slider;