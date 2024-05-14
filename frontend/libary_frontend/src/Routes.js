//Import Statments
import { HomePage } from "./Pages/HomePage"
import { LoginPage } from "./Pages/LogInPage"
import { SignUpPage } from "./Pages/SignInPage";
import { BrowserRouter as Router,  Routes,  Route,Navigate  } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import 'bootstrap/dist/css/bootstrap.min.css';
//Creating the WebPageRoutes Object to be exported


export const WebPageRoutes = () => {
 
    return(

        <Router >
            <Routes>
                
                {/* Route for the LoginPage/First Page*/}
                <Route exact  path='/' element={<LoginPage/>} />

                <Route exact path="/login" element={<LoginPage />} />

                {/* Route for the Home Page*/}
                <Route exact   path="/Home" element={<PrivateRoute/>}/>

                 {/* Route for the Home Page*/}
                 <Route exact  path="/SignUp" element={<SignUpPage/>}/>

            </Routes>  
        </Router>


    )


}