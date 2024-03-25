const express = require('express')
const app = express()
const mongoose = require('mongoose');
const { BookSchema,   } = require('./models/BookModel');
const {UserInfomationSchema  } = require('./models/UserInfomationModel');


// Replace the uri string with your connection string.
const uri = 'mongodb://127.0.0.1:27017/Amari_Libary_Database';
const port = 3001; // Choose a port for your app

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
const UserInfo = connection.model('User information',UserInfomationSchema)


/*
METHOD: GET
Description: Getting books based on ISBN passed by the user
*/
app.get('/BookInfo/:ISBN',async (req, res) => {
    const {ISBN} = req.params

    console.log("USER SUMBITED ISBN: "+ISBN)
    const query = {ISBN : ISBN}

   
    //Call Query
    const bookData = await Book.find(query)
    console.log("Data from the query "+bookData)
    return res.status(200).send(bookData)
    
    
  })


/*
METHOD: POST
Description: Getting books based on ISBN passed by the user
*/
app.post('/AddBook',async (req, res) => {
    var BodyData = req.body
    console.log(BodyData)
    
    const newBook = new Book(BodyData)

    newBook.save()
      .then(() => {
        console.log('Book saved successfully.');
        return res.status(200).send("Book saved successfully")
      })
      .catch((error) => {
        console.error('Error saving book:', error.message);
      });
   
    //Call Query 
    
  })



/*
METHOD: post
Description: Getting a user from the database
*/
app.post('/Login',async (req, res) => {
  console.log("Getting in log in data")
  var RequestBody = req.body

  var username = req.body.username
  var password = req.body.password

  console.log(RequestBody)

  const query = {
    Email : username,
    Password: password
  }

  console.log(query)
   
  //Call Query
  const UserData = await UserInfo.find(query)
  console.log("Data from the query "+UserData)

  if(!UserData.length){
    console.log("Not vaild ")
    return res.status(200).send("No Data")

  }
  else{
    console.log("vaild")
    return res.status(200).send("Vaild User")
  }
  
  
  
})


/*
METHOD: POST
Description: Adding in userInfo to the collection "userInfomation"
*/




 