//Import Statments
import { HomePage } from "./Pages/HomePage"
import { LoginPage } from "./Pages/LogInPage"
import { BrowserRouter as Router,  Routes,  Route, } from "react-router-dom";

//Creating the WebPageRoutes Object to be exported
export const WebPageRoutes = () => {
 
    return(

        <Router >
            <Routes>
                
                {/* Route for the LoginPage/First Page*/}
                <Route exact  path='/' element={<LoginPage/>} />

                {/* Route for the Home Page*/}
                <Route exact  path="/Home" element={<HomePage/>}/>

            </Routes>  
        </Router>


    )


}