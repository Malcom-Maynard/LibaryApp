import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import DefaultPage from './DefaultPage';
import { getCookie } from '../utlis/Authorization';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CheckoutPage = () => {
    const [basket, setBasket] = useState([]);

    // Add item to basket
    const AddItemToBasket = async (AddedBookISBN) => {
        console.log("Adding book: " + AddedBookISBN);

        let bookIndex = basket.findIndex(item => item.ISBN === AddedBookISBN);
        console.log("Book index found at index: " + bookIndex);

        const RequestURL = `http://localhost:3001/BookInfo/${AddedBookISBN}`;
        console.log("URL: ", RequestURL);

        try {
            const response = await axios.get(RequestURL);
            const CurrentStock = response.data[0].StockOfBooks;
            console.log("Current Stock of Book: ", CurrentStock);

            if (CurrentStock > 0) {
                // Logic to add the book to the basket
                toast.success('Book added to basket!', { 
                    duration: 4000,
                    position: 'top-right'
                });
            } else {
                toast.error('Book is out of stock!', { duration: 4000 });
            }
        } catch (error) {
            console.error("Error fetching book stock: ", error);
            toast.error('An error occurred while adding the book', { duration: 4000 });
        }
    };

    useEffect(() => {
        const formattingDataCheckout = async () => {
            const username = getCookie("Email");
            const CurrentBasket = JSON.parse(localStorage.getItem(username) || '[]');
            console.log(CurrentBasket);

            try {
                const requests = CurrentBasket.map(async (item) => {
                    const response = await axios.get('http://localhost:3001/BookCover/Images/' + item["Title"]);
                    return { ...item, Image: response.data };
                });

                const updatedBasket = await Promise.all(requests);
                setBasket(updatedBasket);
            } catch (error) {
                console.error("Error fetching book covers: ", error);
            }
        };

        formattingDataCheckout();
    }, []); // Only run once on mount

    // Rendering Basket Items
    const BasketItems = ({ basket = [] }) => {
        return (
            <div className="grid-container-BookDisplay">
                {basket.map((item, index) => (
                    <CheckoutItem key={index} {...item} />
                ))}
            </div>
        );
    };

    // Rendering individual item in the checkout basket
    const CheckoutItem = ({ Title, Author, Quanity, Image, ISBN }) => {
        return (
            <div className="book">
                <img src={`data:image/jpeg;base64,${Image}`} alt={Title} className="bookCover-Checkout" />
                <div>
                    <a href={`/Books/${Title}`} className='my-link'>
                        <h3 className="glow-text"><b>{Title}</b></h3>
                    </a>
                    <p>By: {Author}</p>
                    <button 
                        id={"Add-" + ISBN} 
                        className='Checkout-button' 
                        onClick={() => AddItemToBasket(ISBN)}
                    >
                        +
                    </button>
                    <p>Quantity: {Quanity}</p>
                    <button 
                        id={"Sub-" + ISBN} 
                        className='Checkout-button'
                    >
                        -
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div>
           
            <DefaultPage />
            <div className="grid-container-BookDisplay_CheckOut">
                <div className="grid-item">
                    <BasketItems basket={basket} />
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
