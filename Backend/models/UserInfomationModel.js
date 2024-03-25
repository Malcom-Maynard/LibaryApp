const { ObjectId, Double, Int32 } = require("mongodb");
const mongoose = require("mongoose");

const UserInfomationSchema = new mongoose.Schema({

  FirstName: {
    type: String,
    
  },

  
  LastName: {
    type: String,
  },


  UserID: {
    type: String,

  },


  Password: {
    type: String,

},
    
  Email: {
    type: String,

  },
  
  Role: {
    type: String,
  }

  
},
{ collection : 'User infomation' }
);



module.exports = { UserInfomationSchema };