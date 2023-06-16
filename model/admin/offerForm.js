const mongoose = require('mongoose');

// multer
const multer = require('multer');

// path 
const path = require('path');

// file path
const FloderPath = '/imgFloder/offer';

// schema
const offerSchema = mongoose.Schema({
  Icon :{
    type : String,
    require : true,
  },
  offerTitle :{
    type : String,
    require : true,
  },
  offerMessage :{
    type : String,
    require : true,
  },

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

offerSchema.statics.offerImgName = multer({storage : imgStorage}).single('Icon');
offerSchema.statics.offerPath = FloderPath;

// storage data
const offer = mongoose.model('offer',offerSchema);

// exports
module.exports = offer;