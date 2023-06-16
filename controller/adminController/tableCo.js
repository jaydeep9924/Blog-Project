
const fs = require('fs');

const path = require('path');

const admin = require('../../model/admin/adminForm');

const review = require('../../model/admin/reviewForm');

const comment = require('../../model/admin/comment')

// delete
module.exports.deletAdmin =async (req,res)=>{
  // console.log(req.params.id);
  let data = await admin.findById(req.params.id);
  if(data){
    fs.unlinkSync(path.join(__dirname,'../..',data.adminProfile));

    let deleteData = await admin.findByIdAndDelete(req.params.id);

    if(deleteData){
      console.log('data is deleted');
      req.flash('success','Data is Deleted');
      res.redirect('/table/adminTable');
    }
  }
  else{
    console.log('data is not deleted');
    req.flash('error','Data is Not Delete');
    res.redirect('/table/adminTable');
  }
};

module.exports.deletReview = async (req,res)=>{

  let deletData = await review.findByIdAndDelete(req.params.id);

  if(deletData){
    req.flash('success','Data is Deleted');
    console.log('Data is Deleted');
    return res.redirect('/table/reviewTable');
  }
  else{
    req.flash('error','Data is Not Deleted')
    console.log('Data is Not Deleted');
    return res.redirect('/table/reviewTable');
  }

};

// comment
module.exports.showComment = async (req,res)=>{

  if(req.query.active){
    let check = await comment.findByIdAndUpdate(req.query.active,{
      isActive : false,
    })
  }

  if(req.query.deactive){
    let check = await comment.findByIdAndUpdate(req.query.deactive,{
      isActive : true,
    })
  }

  let data = await comment.find({}).populate('blogIdData').exec();

  if(data){
    return res.render('admin/table/commentTable',{
      commentData : data,
    })
  }
};
