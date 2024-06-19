const express = require('express')
const app = express()
const mongoose = require('mongoose');
const { BookSchema} = require('./models/BookModel');
const {UserInfomationSchema  } = require('./models/UserInfomationModel');
const { ImageSchema } =  require('../Backend/models/ImageModel'); 


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
const BookCover = connection.model('BookImages', ImageSchema);



/*
METHOD: GET
Description: get the image realted data from the BookImages Database, 
*/
app.get('/BookCover/Images',async (req, res) => {
  
  const bookData = await Book.find({}, {_id:0}).sort({TimesTakenOut: -1})
  console.log("/BookCover/Image-Data from the query "+bookData)

  //Geting ISBN of all the bookshow
  var Top4ISBN = bookData.map(({ ISBN }) => ISBN); 
  
  
  bookCoverData=[]
  console.log("Top4ISBN: "+Top4ISBN)
  for (const data of Top4ISBN){
    
    const bookData = await BookCover.find({ISBN : data})
     bookCoverData.push(bookData)

  }
  console.log("bookCoverData Length: "+ bookCoverData.length)
  bookCoverData = await BookCover.find()
  
  formattedData= mapAndRemoveDuplicates_1(bookCoverData,"ISBN")
console.log("formatted data length : ", formattedData.length);

return await res.status(200).send(formattedData); 
  
})

/* 
METHOD: GET
Description: Getting books All books covers that are stored in DB
*/

app.get('/BookInfo/',async (req, res) => {
 

 
  //Call Query
  const bookData = await Book.find({})
  console.log("/BookInfo/-Data from the query "+bookData)
  return res.status(200).send(bookData)
  
  
})


/*
METHOD: GET
Description: get the image realted data from the BookImages Database, for home page top 4
*/
app.get('/BookCover/Images/Popular',async (req, res) => {
  
  const bookData = await Book.find({}, {_id:0}).limit(4).sort({TimesTakenOut: -1})
  console.log("/BookCover/Images/Popular-Data from the query "+bookData)

  //Geting ISBN of all the bookshow
  var Top4ISBN = bookData.slice(0, 4).map(({ ISBN }) => ISBN);

  //console.log("/BookCover/Image; Top4ISBN "+Top4ISBN +" "+(Top4ISBN[0]))
 
  bookCoverData=[]

  for (const data of Top4ISBN){
    
    const bookData = await BookCover.find({ISBN : data})
    //console.log("/BookCover/Image; bookData: "+ bookData)
     bookCoverData.push(bookData)

  }
  console.log("bookCoverData Length: "+ bookCoverData.length)
  //bookCoverData = await BookCover.find().limit(4)
  
  formattedData= mapAndRemoveDuplicates(bookCoverData,"ISBN")
console.log("formatted data length : ", formattedData.length);

return await res.status(200).send(formattedData); 
  
})


/*
METHOD: GET
Description: Most popular Books
*/
app.get('/BookInfo/Popular',async (req, res) => {
  
  
  
  //Call Query
  const bookData = await Book.find().limit(4).sort({TimesTakenOut: -1})
  console.log("Data from the query "+bookData)
  return res.status(200).send(bookData)
  
  
})















/*
METHOD: GET
Description: Getting books based on ISBN passed by the user
*/
app.get('/BookInfo/:ISBN',async (req, res) => {
    const {ISBN} = req.params
    console.log("Route: "+'/BookInfo/:ISBN')
    console.log("USER SUMBITED ISBN: "+ISBN)
    const query = {ISBN : ISBN}

   
    //Call Query
    const bookData = await Book.find(query)
    console.log("Data from the query "+bookData)
    return res.status(200).send(bookData)
    
    
  })


/*
METHOD: GET
Description: Getting books ISBN number
*/
app.get('/BookInfo/ISBN/:NameOfBook',async (req, res) => {
  const {NameOfBook} = req.params

  console.log("USER SUMBITED Book Name: "+NameOfBook)
  const query = {Title : NameOfBook}

 
  //Call Query
  const bookData = await Book.findOne(query)
  console.log("Data from the query "+bookData)
  return res.status(200).send(bookData)
  
  
})



/*
METHOD: GET
Description: Getting User Role from the DB
*/
app.get('/UserInfo/Role/:email',async (req, res) => {
  
  
  var {email}  = req.params

  console.log("USER SUMBITED Email: "+email)
  const query = {Email : email}

 
  //Call Query
  const UserRole = await UserInfo.find(query)

  console.log(UserRole)
  var role = UserRole[0].Role
  console.log("Data from the query "+role)
  return res.status(200).send(role)
  
  
})


/*
METHOD: GET
Description: Getting User First and Last Name from the DB
*/
app.get('/UserInfo/Name/:email',async (req, res) => {
  
  
  var {email}  = req.params

  console.log("USER SUMBITED Name: "+email)
  const query = {Email : email}

 
  //Call Query
  const UserName = await UserInfo.find(query)

  console.log(UserName)

  if(UserName!= undefined){
    var firstName = UserName[0].FirstName
    var LastName = UserName[0].LastName

    var returnData = firstName+" , "+LastName
    console.log("Data from the query "+returnData)
    return res.status(200).send(returnData)

  }

  return res.status(200).send("User")
  
  
  
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
app.post('/SignUp',async (req, res) => {
  console.log("Getting in log in data")
  var RequestBody = req.body
  console.log(RequestBody)
  var username =  req.body.username
  var password =  req.body.password
  var firstName =  req.body.firstname
  var lastName =   req.body.lastname

  var Userid = generateUserId(firstName,lastName)
  

  const query = {
    Email : username,
    Password: password,
    FirstName: firstName,
    LastName: lastName,
    UserID: Userid,
    role: "User"
  }

  const UsernameCheckquery = {
    Email : username,
  }


  console.log(query)
   
  //Call Query
  const UserData = await UserInfo.find(UsernameCheckquery)
  console.log("No Duplicate Username"+UserData)
  console.log(UserData.length)

  if(UserData.length!=0){
    console.log("Duplciate Username/Email")
    return res.status(200).send("Duplciate Username/Email")

  }

  const NewUserData = await UserInfo.insertMany(query)

  return res.status(200).send("New User inserted successfully")

  
  
  
})

function generateUserId(FirstName, LastName){
  
  console.log(FirstName)
  console.log(LastName)
  var val = Math.floor(1000 + Math.random() * 9000);
  console.log(val)
  UserID = FirstName.substr(0,3)+LastName.substr(0,3)+val

  console.log(UserID)

  return UserID



  
}

const mapAndRemoveDuplicates = (array, key) => {
  const seen = new Set();
  return array
    .map(item => {
      const newItem = {
        ISBN: item[0].ISBN,
        Title: item[0].Title,
        Image: item[0].EncodedString,
      };
      if (seen.has(newItem[key])) {
        return null; // Exclude duplicates
      }
      seen.add(newItem[key]);
      return newItem;
    })
    .filter(item => item !== null); // Remove null values
};


const mapAndRemoveDuplicates_1 = (array, key) => {
  const seen = new Set();
  return array
    .map(item => {
      const newItem = {
        ISBN: item.ISBN,
        Title: item.Title,
        Author: item.Author,
        Image: item.EncodedString,
      };
      if (seen.has(newItem[key])) {
        return null; // Exclude duplicates
      }
      seen.add(newItem[key]);
      return newItem;
    })
    .filter(item => item !== null); // Remove null values
};


