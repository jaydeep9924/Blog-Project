
const mongoose = require('mongoose');

const path = require('path');

const multer = require('multer');

const filepath = '/imgFloder/gallery';

const subcategoryschema = mongoose.Schema({
  category : {
    type : mongoose.Schema.Types.ObjectId,
    required : true,
  },
  subcategory : {
    type : String,
    required : true,
  },
  profile : {
    type : String,
    required : true
  }
});

const imgStorage = multer.diskStorage({
  destination : (req,file,cb)=>{
    cb(null, path.join(__dirname,'../..',filepath));
  },
  filename : (req,file,cb)=>{
    cb(null, file.fieldname+'-'+Date.now())
  }
})

subcategoryschema.statics.subcateimg = multer({storage : imgStorage}).single('profile');
subcategoryschema.statics.subcatuploaded = filepath;


const subcategory = mongoose.model('subcategory',subcategoryschema);

module.exports = subcategory;