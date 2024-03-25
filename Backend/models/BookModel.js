const { ObjectId, Double, Int32 } = require("mongodb");
const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({

 


  Author: {
    type: String,
    
  },

  
  DateOfPublication: {
    type: String,
  },


  Genre: {
    type: String,

  },


  ISBN: {
    type: String,

},
    
  Publication: {
    type: String,

  },
  
  Rating: {
    type: Number,
  },

  StockOfBooks: {
    type: Number,
  },

  TimesTakenOut: {
    type: Number,

  },

  Title: {
    type: String,
  },

  

  
},
{ collection : 'BookData' }
);



module.exports = { BookSchema };