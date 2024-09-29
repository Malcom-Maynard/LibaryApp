import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import DefaultPage from './DefaultPage';
import { getCookie } from '../utlis/Authorization';

export const CheckoutPage = () => {

   
  
    const [basket, setBasket] = useState([]);
    const [AddedToBasket, setAddedToBasket] = useState(false);



    useEffect(() => {
      
        const formattingDataCheckout = async () =>{
          const username = getCookie("Email");
          const CurrentBasket = JSON.parse(localStorage.getItem(username) || '[]');
          console.log(CurrentBasket)
  
          for (var x in CurrentBasket){
            console.log("Current item: ",CurrentBasket[x])
            var formatedItem = CurrentBasket[x]
            const response = await axios.get('http://localhost:3001/BookCover/Images/'+formatedItem["Title"],);
            formatedItem["Image"]=response.data
            console.log("Formated Object: ",formatedItem)
          }
  
          setBasket(CurrentBasket)


        }

        formattingDataCheckout()
      
        
      
    },[] );
  
  
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


    /*useEffect(() => {
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
    }, []);*/

    const BasketItems = ({ basket }) => {
      return (
        <div className="grid-container-BookDisplay">
          {basket.map((item, index) => (
            <CheckoutItem key={index} {...item} />
          ))}
        </div>
      );
    };

    const CheckoutItem = ({ Title, Author,Quanity, Image,   }) => {
      return (
        <div className="book">
          <img src={`data:image/jpeg;base64,${Image}`} alt={Title} className="bookCover-Checkout" />
          <div>
            <a href={`/Books/${Title}`} className='my-link'> <h3 class="glow-text"> <b>{Title}</b> </h3></a>
            <p>By: {Author}</p>
            <button className='Checkout-button'>+</button>
            <p>Quanity: {Quanity}</p>
            <button className='Checkout-button'>-</button>
           
            
          </div>
        </div>
      );
    }


    return (
      <body>
        
        {<DefaultPage></DefaultPage>}
        
        <div class="grid-container-BookDisplay_CheckOut">
        <div className='grid-item'>
          <BasketItems basket={basket} />
        </div>
      </div> 
        
        
      </body>
    );
  };

 
  
  export default CheckoutPage;
  