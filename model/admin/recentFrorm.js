const mongoose = require('mongoose');

// multer
const multer = require('multer');

// path 
const path = require('path');

// file path
const FilePath = '/imgFloder/recent';

// schema
const recentSchema = mongoose.Schema({
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
 
});

// img stoarge
const imgStorage = multer.diskStorage({
  destination : (req,file,cb)=>{
    cb(null, path.join(__dirname,'../..',FilePath));
  },
  filename : (req,file,cb)=>{
    cb(null, file.fieldname+'-'+Date.now());
  }
});

recentSchema.statics.recentUploaded = multer({storage : imgStorage}).single('profile');
recentSchema.statics.recentImgName = FilePath;

// storage data
const recentForm = mongoose.model('recentForm',recentSchema);

// exports
module.exports = recentForm;