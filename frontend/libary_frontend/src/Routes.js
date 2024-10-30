import React from 'react';

//Import Statments
import { LoginPage } from "./Pages/LogInPage"
import { SignUpPage } from "./Pages/SignInPage";
import { BookPage } from "./Pages/BookPage";
import {SingleBookPage} from "./Pages/Books/SingleBookPage"
import {CheckOutPage} from "./Pages/CheckoutPage"
import { BrowserRouter as Router,  Routes,  Route  } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import CheckoutPage from "./Pages/CheckoutPage";
import 'bootstrap/dist/css/bootstrap.min.css';
//Creating the WebPageRoutes Object to be exported


export const WebPageRoutes = () => {
 
    return(
        <>
        
        <Router >
            <Routes>
                {/* Route for the LoginPage/First Page*/}
                <Route exact  path='/' element={<LoginPage/>} />

                <Route exact path="/login" element={<LoginPage />} />

                {/* Route for the Home Page*/}
                <Route exact   path="/Home" element={<PrivateRoute/>}/>

                 {/* Route for the Home Page*/}
                 <Route exact  path="/SignUp" element={<SignUpPage/>}/>

                 {/* Route for the Home Page*/}
                 <Route exact  path="/Books" element={<BookPage/>}/>
                
                 
                <Route exact  path="/Books/:pageId" element={<SingleBookPage/>}/>

                <Route exact  path="/CheckOut" element={<CheckoutPage/>}/>
            </Routes>  
        </Router>

        </>
    )


}