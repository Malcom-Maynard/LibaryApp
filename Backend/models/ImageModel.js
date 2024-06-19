const { ObjectId, Double, Int32 } = require("mongodb");
const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({

  ISBN: {
    type: String,

},
    

  Title: {
    type: String,
  },

  EncodedString :{

    type: String,
  }

  ,

  Author :{

    type: String,
  }

  

  
},
{ collection : 'BookImages' }
);



module.exports = { ImageSchema };