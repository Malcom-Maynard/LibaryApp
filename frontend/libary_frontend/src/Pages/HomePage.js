import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios'

function getCookie(name) {
  var nameEQ = name + "=";
  var cookies = document.cookie.split(',');
  for(var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length);
      }
  }
  return null;
}



 
  


const Book = ({ isbn, image, name }) => {
  return (
    <div className="book"  >
      <img src={`data:image/jpeg;base64,${image}`} alt={name} className="bookCover"/>
      <div>
        <h3>{name}</h3>
        <p>isbn: {isbn}</p>
      </div>
    </div>
  );
};

// Define the BookList component to render the list of books
const BookList = ({ books }) => {

  console.log(books)
  return (
    <div className="BookDisplay-container">
      {books.map((book, index) => (
        <Book key={index} {...book} />
      ))}
    </div>
  );
};


export const HomePage = () => {
  // State to store whether the user is an admin
  const [isAdmin, setIsAdmin] = useState(false);
  const [Name, setName] = useState("John Doe");
  const [bookData, setBookData] = useState([]);
  
  
  // Function to get the value of a cookie by its name






  // Simulate checking if the user is an admin (you should replace this with your actual logic)
  useEffect(() => {
    console.log("COOKIES: "+document.cookie)
    var username = getCookie("Email");
    var RequestURL ="http://localhost:3001/UserInfo/Role/"+username
    console.log("Username:", username);

    axios.get(RequestURL, )
    .then(response => {
      console.log(response.data)
      if (response.data != "Admin"){

        setIsAdmin(false)
      }
      else{
        setIsAdmin(true)
      }
      



      console.log(response.data == "No Data")
      if (response.data==undefined || response.data == "No Data"){
        
       
      }
  
      
    })
    .catch(error => {
      console.error('Error:', error);

    });

    

    


    // Or false based on your actual logic
  }, [isAdmin]);


  useEffect(() => {
    
    var username = getCookie("Email");
    console.log("Username:", username);
    var RequestURL ="http://localhost:3001/UserInfo/Name/"+username
    

    axios.get(RequestURL, )
    .then(response => {
      console.log(response.data)
      setName(response.data)
  
      
    })
    .catch(error => {
      console.error('Error:', error);

    });

    

    


    // Or false based on your actual logic
  }, [Name]);

  useEffect(() => {
    // Fetch book data from the API
    const fetchBookData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/BookCover/Images');
        setBookData(response.data);
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchBookData();
  }, []); // Run this effect only once on component mount
  

  return (
    <body className="p-3 m-0 border-0 bd-example m-0 border-0">
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark fixed-top" data-bs-theme="dark">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>

              {isAdmin && (
                <li className="nav-item">
                  <a className="nav-link" href="#admin">Admin Page</a>
                </li>
              )}

            
              <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
                <ul className="navbar-nav">
                  <li className="nav-item dropdown">
                    <button className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                      Dropdown
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark">
                      <li><a className="dropdown-item" href="#">Action</a></li>
                      <li><a className="dropdown-item" href="#">Another action</a></li>
                      <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </ul>
          </div>
        </nav>
      </div>

      <div className='HomePageInfo'>

              <div className='element1'><h1>Hello <b>{Name}</b> Welcome to the Library</h1></div>
              
              
              <div style={{ textAlign: 'center', padding: '30px'}}>
                   <h2>Most Popular Books!</h2>
              </div>

              
              <div class = "flex-container" className=''>
             
                <BookList books={bookData} />
              </div>

      </div>
    </body>
  );
};

export default HomePage;

