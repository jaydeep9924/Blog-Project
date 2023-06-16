
const blog = require('../../model/admin/blogForm');

const comment = require('../../model/admin/comment');

const subcategory = require('../../model/admin/subcategory');

module.exports.blogPage = async (req,res) =>{

  let data = await blog.findById(req.params.id);
  let commentData = await comment.find({blogIdData : req.params.id, isActive : true});
  let commentTotal = await comment.find({blogIdData : req.params.id, isActive : true}).countDocuments();
  let lastRecord = await blog.find({}).sort({_id: -1}).limit(3);
  let AllBlogs = await blog.find({isActive : true});

  var blogData = [];
  for(var i=0; i<AllBlogs.length; i++){
    blogData.push(AllBlogs[i].id)
  }

  var next;
  for(var i=0; i<blogData.length; i++){
    if(req.params.id == blogData[i]){
      next = i;
    }
  }
  var prev;
  for(var i=0; i<blogData.length; i++){
    if(req.params.id == blogData[i]){
      prev = i;
    }
  }

  if(data){
    return res.render('user/blog',{
      blogRecord : data,
      blogIdData : req.params.id,
      commentPrint : commentData,
      commentcount : commentTotal,
      lastRecordShow : lastRecord,
      next : next,
      nextButton : blogData,
      prev : prev,
    });
  }
  else{
    return res.redirect('/')
  }

};

module.exports.comment = async (req,res)=>{

  var img = '';
  if(req.file){
    img = comment.commentImgName+'/'+req.file.filename;
    req.body.image = img;
  } 
  req.body.isActive = true;

  let data = await comment(req.body);
  data.save();

  if(data){
    req.flash('success','Comment IS Insert');
    return res.redirect('back');
  }
  else{
    req.flash('error','Comment IS Not Insert');
    return res.redirect('back');
  }
};
                  


