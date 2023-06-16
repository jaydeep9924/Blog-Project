const mongoose = require('mongoose');

// multer
const multer = require('multer');

// path 
const path = require('path');

// file path
const FilePath = '/imgFloder/comment';

// schema
const commentSchema = mongoose.Schema({
  name :{
    type : String,
    required : true,
  },
  blogIdData :{
    type : mongoose.Schema.Types.ObjectId,
    ref : "blogForm"
  },
  email :{
    type : String,
    required : true,
  },
  image :{
    type : String,
    required : true,
  },
  comment :{
    type : String,
    required : true,
  },
  isActive :{
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

commentSchema.statics.commentUploaded = multer({storage : imgStorage}).single('image');
commentSchema.statics.commentImgName = FilePath;

// storage data
const commentForm = mongoose.model('commentForm',commentSchema);

// exports
module.exports = commentForm;