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







const NotificationTest = [
  
  {message: "Testing",
    Time: "12:00 AM"
  },

  {message: "Test nofi message",
  Time: "11:00 AM"
}



]
const Book = ({ ISBN, Image, Title }) => {
  return (
    <div className="book">
      <img src={`data:image/jpeg;base64,${Image}`} alt={Title} className="bookCover" />
      <div>
        <h3>{Title}</h3>
        <p>isbn: {ISBN}</p>
      </div>
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
const NotificationList = ({ notification }) => {

  console.log("Tesing: ", notification)
  return (
    <div>
      {notification.map((notification, index) => (
        <Notifications key={index} {...notification} />
      ))}
    </div>
  );
};


export const HomePage = () => {

  const [isAdmin, setIsAdmin] = useState(false);
  const [Name, setName] = useState("John Doe");
  const [bookData, setBookData] = useState([]);
  const [NotificationData, setNotificationData] = useState([ {message: "Testing",Time: "12:00 AM", Date:"5/23/2024"},{message: "Test nofi message",Time: "11:00 AM",Date:"5/19/2024"}]);
  const [basket, setBasket] = useState([]); 




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
    var username = getCookie("Email");
    var RequestURL ="http://localhost:3001/UserInfo/Name/"+username;
    axios.get(RequestURL)
      .then(response => {
        setName(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [Name]);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/BookCover/Images/Popular',);
        console.log("RESPONSE DATA: "+response.data[0])
        setBookData(response.data);
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };
    fetchBookData();
  }, []);

  return (
    <body className="p-3 m-0 border-0 bd-example m-0 border-0">
      
      {<DefaultPage></DefaultPage>}
      <div className='HomePageInfo'>
        <div className='element1'><h1>Hello <b>{Name}</b> Welcome to the Library</h1></div>
        <div style={{ textAlign: 'center', padding: '30px'}}>
          <h2>Most Popular Books!</h2>
        </div>
        <div class="flex-container">
          <BookList books={bookData} />
        </div>
      </div>
    </body>
  );
};

export default HomePage;
