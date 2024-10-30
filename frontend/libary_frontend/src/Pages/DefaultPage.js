import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import { getCookie } from '../utlis/Authorization';

const NotificationTest = [
  {
    message: "Testing",
    Time: "12:00 AM"
  },
  {
    message: "Test nofi message",
    Time: "11:00 AM"
  }
];

const Notifications = ({ message, Time, Date }) => {
  return (
    <div className="Nofti">
      <li><a className="dropdown-item" href="#">{message}; {Date}-{Time}</a></li>
    </div>
  );
};

const NotificationList = ({ notification }) => {
  return (
    <div>
      {notification.map((notification, index) => (
        <Notifications key={index} {...notification} />
      ))}
    </div>
  );
};

const BasketItem = ({ Title, Author, Quanity }) => {
  return (
    <div className="Nofti">
      <li><a className="dropdown-item" href="#">{Title} by {Author} X {Quanity}</a></li>
    </div>
  );
};

const BasketList = ({ notification }) => {
  return (
    <div>
      {notification.map((notification, index) => (
        <BasketItem key={index} {...notification} />
      ))}
    </div>
  );
};

export const DefaultPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [NotificationData, setNotificationData] = useState([
    { message: "Testing", Time: "12:00 AM", Date: "5/23/2024" },
    { message: "Test nofi message", Time: "11:00 AM", Date: "5/19/2024" }
  ]);
  const [basket, setBasket] = useState([]);
  const [AddedToBasket, setAddedToBasket] = useState(false);
  
  useEffect(() => {
    var username = getCookie("Email");
    var RequestURL = "http://localhost:3001/UserInfo/Role/" + username;
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
  }, []);

  useEffect(() => {
    const element = document.getElementById("BasketButton");
    if (element) {
      const handleClick = () => {
        console.log("Button pressed");
        setAddedToBasket(true);
      };
      element.addEventListener("click", handleClick);

      return () => {
        element.removeEventListener("click", handleClick);
      };
    }
  }, []);

  useEffect(() => {
    if (AddedToBasket) {
      console.log("Basket value is TRUE");
      const username = getCookie("Email");
      const CurrentBasket = JSON.parse(localStorage.getItem(username) || '[]');
      

      setBasket(CurrentBasket);
      setAddedToBasket(false);
    }
  }, [AddedToBasket]);

 

  
  return (
    <div style={{ backgroundColor: '#d3d3d3', height: '100vh', margin: '0' }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark fixed-top" data-bs-theme="dark">
        <a className="navbar-brand" href="#">Library Page</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/Home">Home <span className="sr-only"></span></a>
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
              <button id="BasketButton" className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style={{ width: "400px", borderStyle: "solid" }}>
                Basket
              </button>
              <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end custom-dropdown-Notifcation">
                {basket.length > 0 ? (
                  <BasketList notification={basket} />
                ) : (
                  <li><a className="dropdown-item" href="#">Your basket is empty</a></li>
                )}
              </ul>
            </li>
          </ul>

          {/* Notification Dropdown */}
          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown">
              <button className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style={{ width: "400px", borderStyle: "solid" }}>
                Notifications
              </button>
              <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end" style={{ width: "400px" }}>
                <NotificationList notification={NotificationData} />
              </ul>
            </li>
          </ul>


           {/* Checkout Should bring you to a new page*/}
           <ul className="CheckoutButton">
            <a href='/CheckOut'>
            <button  href="/CheckOut">CheckOut</button>
            </a>
          </ul>
          
        </div>
      </nav>
    </div>
  );
};

export default DefaultPage;
