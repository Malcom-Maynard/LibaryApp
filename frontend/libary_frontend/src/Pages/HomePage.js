import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';

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
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark fixed-top" data-bs-theme="dark">
          <a className="navbar-brand" href="#">Library Page</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">Home <span className="sr-only"></span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/Books">Books</a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#">Calander</a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#">About Us</a>
              </li>



              {isAdmin && (
                <li className="nav-item">
                  <a className="nav-link" href="#admin">Admin Page</a>
                </li>
              )}
            </ul>


            {/* Basket Dropdown */}
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <button className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style={{ width: "400px", borderStyle: "solid" }}>
                  Basket
                </button>
                <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end custom-dropdown-Notifcation">
                  {/* Render basket items here */}
                  {basket.length > 0 ? (
                    basket.map((item, index) => (
                      <li key={index}><a className="dropdown-item" href="#">{item.name}</a></li>
                    ))
                  ) : (
                    <li><a className="dropdown-item" href="#">Your basket is empty</a></li>
                  )}
                </ul>
              </li>
            </ul>
         

            {/* Notification Dropdown */}

            <ul className="navbar-nav ml-auto" >
              <li className="nav-item dropdown" >
                <button className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style={{width: "400px", borderStyle:"soild"}}>
                  Notifications
                </button>
                <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end" style={{width: "400 px"}}>
                  
                  <NotificationList notification={NotificationData} />

                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </div>

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
