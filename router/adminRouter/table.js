
const express = require('express');

const router = express.Router();

const tableCon = require('../../controller/adminController/tableCo');

router.get('/deletAdmin/:id', tableCon.deletAdmin);

router.get('/deleteReview/:id', tableCon.deletReview);

// comment
router.get('/showComment', tableCon.showComment);

router.get('/status/:id', (req,res)=>{
  console.log('ok');
  console.log(req.params.id);
})

const admin = require('../../model/admin/adminForm');
router.get('/adminTable', async (req,res)=>{

  if(req.query.active){
    // console.log(req.query.active);
    let check  = await admin.findByIdAndUpdate(req.query.active,{
      isActive : false,
    });
  }

  if(req.query.deactive){
    // console.log(req.query.deactive);
    let check  = await admin.findByIdAndUpdate(req.query.deactive,{
      isActive : true,
    });
  }
 
  let search = '';
  if(req.query.search){
    search = req.query.search;
  };

  let page = 1;
  if(req.query.page){
    page = req.query.page;
  };
  let limit = 2;

  let adminData = await admin.find({
    $or :[
      {name : {$regex : search , $options : 'i'}}
    ]
  })
  .limit(limit*1)
  .skip((page-1)*limit)
  .exec()

  let count = await admin.find({
    $or :[
      {name : {$regex : search , $options : 'i'}}
    ]
  })
  .countDocuments()

  return res.render('admin/table/adminTable',{
    adminRecord : adminData,
    totalPage : Math.ceil(count/limit),
    searchData : search,
    currentPage : page,
  });

});


const blog = require('../../model/admin/blogForm');
router.get('/blogTable', async (req,res)=>{

  let search = '';
  if(req.query.search){
    search = req.query.search;
  }

  let blogData = await blog.find({
    $or :[
      {title :{$regex : search , $options : 'i'}}
    ]
  });

  return res.render('admin/table/blogTable',{
    blogRecord : blogData,
  
  })
});


const offer = require('../../model/admin/offerForm');
router.get('/offerTable', async (req,res)=>{

  let search ='';
  if(req.query.search){
    search = req.query.search;
  }

  let offerData = await offer.find({
    $or : [
      {offerTitle : {$regex : search , $options : 'i'}}
    ]
  });

  return res.render('admin/table/offerTable',{
    offerRecord : offerData,
  })
});


const recent = require('../../model/admin/recentFrorm');
router.get('/recentTable', async (req,res)=>{

  let search = '';
  if(req.query.search){
    search = req.query.search;
  }

  let page = 1;
  if(req.query.page){
    page = req.query.page;
  }
  let limit = 2;

  let recentData = await recent.find({
    $or :[
      {title : {$regex : search , $options : 'i'}}
    ]
  })
  .limit(limit*1)
  .skip((page-1)*limit)
  .exec();

  let count = await recent.find({
    $or :[
      {title : {$regex : search , $options : 'i'}}
    ]
  }).countDocuments();

  return res.render('admin/table/recentTable',{
    recentRecord : recentData,
    totalPage : Math.ceil(count/limit),
    searchData : search,
    currentPage : page,

  })
});


const review = require('../../model/admin/reviewForm');
router.get('/reviewTable', async (req,res)=>{

  let search = '';
  if(req.query.search){
    search = req.query.search;
  };

  let page = 1;
  if(req.query.page){
    page = req.query.page;
  }

  let limit = 3;

  let reviewData = await review.find({
    $or : [
      {name : {$regex : search, $options : 'i'}},
      {city : {$regex : search , $options : 'i'}}
    ]
  })
  .limit(limit*1)
  .skip((page-1)*limit)
  .exec();

  let count = await review.find({
    $or : [
      {name : {$regex : search, $options : 'i'}},
      {city : {$regex : search , $options : 'i'}}
    ]
  })
  .countDocuments();

  return res.render('admin/table/reviewTable',{
    reviewRecord : reviewData,
    totalPage : Math.ceil(count/limit),
    searchData : search,
    currentPage : page,
  });
 
});

const slider = require('../../model/admin/sliderForm');
router.get('/sliderTable', async (req,res)=>{

  if(req.query.active){
    let check = await slider.findByIdAndUpdate(req.query.active,{
      isActive : false,
    })
  }

  if(req.query.Deactive){
    let check = await slider.findByIdAndUpdate(req.query.Deactive,{
      isActive : true,
    })
  }


  let search = '';
  if(req.query.search){
    search = req.query.search;
  };

  let page = 1;
  if(req.query.page){
    page  = req.query.page
  }
  let limit = 2;

  console.log('isActive');
  

  // if(isActive===true){

    let sliderData = await slider.find({
      $or : [
        {title : {$regex : search , $options : 'i'}},
        {message : {$regex : search, $options : 'i'}}
      ]
    })
    .limit(limit*1)
    .skip((page-1)*limit)
    .exec();

    let count = await slider.find({
      $or : [
        {title : {$regex : search , $options : 'i'}},
        {message : {$regex : search , $options : 'i'}}
      ]
    }).countDocuments();

    return res.render('admin/table/sliderTable',{
      sliderRecord : sliderData,
      totalPage : Math.ceil(count/limit),
      searchData : search,
      currentPage : page
    })

  // }

});

module.exports = router;