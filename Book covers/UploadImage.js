const express = require('express')
const app = express()
const mongoose = require('mongoose');
const { BookSchema } =  require('../Backend/models/BookModel');
const { ImageSchema } =  require('../Backend/models/ImageModel');
const fs = require('fs');
const axios = require('axios');const { computeStyles } = require('@popperjs/core');
;
var files = fs.readdirSync('Book covers/Covers')
console.log(files)


const uri = 'mongodb://127.0.0.1:27017/Amari_Libary_Database';
const port = 3002; // Choose a port for your app

app.use(express.json());
app.use(require('body-parser').json());


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Headers: Access-Control-Allow-Origin')
  res.header('Access-Control-Allow-Credentials', 'true');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});


mongoose.connect("mongodb://127.0.0.1:27017/Amari_Libary_Database")
  .then(() => console.log('Connected!'));
  
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})

const connection = mongoose.createConnection(uri);
const Book = connection.model('BookData', BookSchema);
const BookCover = connection.model('BookImages', ImageSchema);

async function UploadData(files) {

    for (const cover of files){
      
        formatedCover = cover.split(".")[0]
        //console.log(cover)
        
        //Convert the image into Byte string
        var imageBuffer = fs.readFileSync('Book covers/Covers/'+cover);
        const base64Image = imageBuffer.toString('base64');
        //console.log(base64Image)
        ISBN=''
        Author=""
        var RequestURL ="http://localhost:3001/BookInfo/ISBN/"+formatedCover
        
    
        await axios.get(RequestURL)
        .then(response => {
        
          ISBN= response.data.ISBN
          Author=response.data.Author
      
          
        })
        .catch(error => {
          console.error('Error:', error);
    
        });
        console.log("ISBN: "+ISBN)
        query = {
    
            ISBN:ISBN,
            Title:formatedCover,
            EncodedString: base64Image,
            Author: Author
    
        }
        console.log(query)
        const  BookCoverUpload=  await BookCover.insertMany(query)

    }
    mongoose.disconnect()
        .then(() => {
        console.log('Disconnected from MongoDB');
        })
        .catch((error) => {
        console.error('Error disconnecting from MongoDB:', error);
        });

}

 UploadData(files)



      





