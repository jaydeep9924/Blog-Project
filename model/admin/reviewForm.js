const mongoose = require('mongoose');

// schema
const reviewSchema = mongoose.Schema({
  desc :{
    type : String,
    require : true,
  },
  name :{
    type : String,
    require : true,
  },
  country :{
    type : String,
    require : true,
  },
  city :{
    type : String,
    require : true,
  },
 
});

// storage data
const reviewForm = mongoose.model('reviewForm',reviewSchema);

// exports
module.exports = reviewForm;