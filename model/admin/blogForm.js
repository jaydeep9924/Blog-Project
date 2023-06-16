const mongoose = require('mongoose');

// multer
const multer = require('multer');

// path 
const path = require('path');

// file path
const FilePath = '/imgFloder/blog';

// schema
const blogSchema = mongoose.Schema({
  profile :{
    type : String,
    required : true,
  },
  title :{
    type : String,
    required : true,
  },
  name :{
    type : String,
    required : true,
  },
  date :{
    type : String,
    required : true,
  },
  desc :{
    type : String,
    required : true,
  },
  isActive:{
    type : Boolean,
    required : true,
    default : true,
  }
 
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

blogSchema.statics.blogUploaded = multer({storage : imgStorage}).single('profile');
blogSchema.statics.blogImgName = FilePath;

// storage data
const blogForm = mongoose.model('blogForm',blogSchema);

// exports
module.exports = blogForm;