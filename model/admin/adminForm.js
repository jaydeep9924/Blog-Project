const mongoose = require('mongoose');

// multer
const multer = require('multer');

// path 
const path = require('path');

// file path
const FilePath = '/imgFloder/admin';

// schema
const adminSchema = mongoose.Schema({
  name :{
    type : String,
    require : true,
  },
  email :{
    type : String,
    require : true,
  },
  password :{
    type : String,
    require : true,
  },
  adminProfile :{
    type : String,
    require : true,
  },
  isActive :{
    type : Boolean,
    require : true
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

adminSchema.statics.adminUploaded = multer({storage : imgStorage}).single('adminProfile');
adminSchema.statics.adminImgName = FilePath;

// storage data
const adminForm = mongoose.model('adminForm',adminSchema);

// exports
module.exports = adminForm;