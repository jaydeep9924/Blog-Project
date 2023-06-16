
const mongoose = require('mongoose');

// connect
 mongoose.connect('mongodb://127.0.0.1/dynemic');

 // db
 const db = mongoose.connection;

 // server
db.once('open',(err)=>{
  if(err){ console.log('DB IS NOT CONNECTED'); return false;}
  console.log('DB IS CONNECTED');
});

// exports
module.exports = db;