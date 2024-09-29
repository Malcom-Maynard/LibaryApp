import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import DefaultPage from './DefaultPage';


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




const Book = ({ ISBN, Image, Title, Author }) => {
  return (
    <div className="book">
      <img src={`data:image/jpeg;base64,${Image}`} alt={Title} className="bookCover" />
      <div>
        <a href={`/Books/${Title}`} className='my-link'> <h3 class="glow-text"> <b>{Title}</b> </h3></a>
        <p>By: {Author}</p>
      </div>
    </div>
  );
};

const BookList = ({ books }) => {
    return (
      <div className="grid-container-BookDisplay">
        {books.map((book, index) => (
          <Book key={index} {...book} />
        ))}
      </div>
    );
  };
  
const Notifications = ({ message, Time,Date }) => {
  return (
    <div className="Nofti">
      <li><a className="dropdown-item" href="#">{message}; {Date}-{Time}</a> </li>
      
    </div>
  );
};

export const BookPage = () => {

  const [isAdmin, setIsAdmin] = useState(false);
  const [NotificationData, setNotificationData] = useState([ {message: "Testing",Time: "12:00 AM", Date:"5/23/2024"},{message: "Test nofi message",Time: "11:00 AM",Date:"5/19/2024"}]);
  const [bookData, setBookData] = useState([]);
  const [SortBy, setSortBy] = useState([]);
  


  

  useEffect(() => {
    var username = getCookie("Email");
    var RequestURL ="http://localhost:3001/UserInfo/Role/"+username;
    axios.get(RequestURL)
      .then(response => {
        if (response.data !== "Admin") {
          setIsAdmin(false);
        } else {
          setIsAdmin(true);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [isAdmin]);

  useEffect(() => {
    document.body.classList.add('custom-background');
  }, []);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/BookCover/Images',);
        console.log("RESPONSE DATA: "+response.data)
        setBookData(response.data);
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };
    fetchBookData();
  }, []);

  const SearchForBook = async ( ) =>{

    console.log("In the SearchForBook function")
   

    const fetchBookData = async () => {
      try {
        
      
        const response = await axios.get('http://localhost:3001/BookCover/Images',{
          params: {
            title:document.getElementById("TitleData").value,
            author: document.getElementById("AuthorData").value,
            genre: document.getElementById("GenreData").value,
            rating: document.getElementById("RatingData").value

          }
        });
        console.log("RESPONSE DATA: "+response.data[0])
        setBookData(response.data);
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };
    fetchBookData();
    


  }
  return (
    <body className="p-3 m-0 border-0 bd-example m-0 border-0">
      {<DefaultPage></DefaultPage>}
      
     <div className='search_box'>
     <label style={{ fontWeight: "bold" }}>Search Criteria</label>

        <br></br>
        <form>

          <label>Title</label> <input type='text' id="TitleData"></input><br></br>
          <label>Author</label> <input type='text' id="AuthorData"></input><br></br>
          <label>Genre</label> <input type='text' id="GenreData"></input><br></br>
          <label>Rating</label> <input type='number' min="1" max ="5" id="RatingData"></input><br></br><br></br>
          <button  type="button" onClick={SearchForBook}> Search</button>
        </form>
      </div>

      
      <div class="Book-Page-container">
        <div className='grid-item'>
          <BookList books={bookData} />
        </div>
      </div> 
      
    </body>
  );
};

export default BookPage;
