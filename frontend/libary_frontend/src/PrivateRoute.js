import React from 'react';
import { Route, Navigate, Routes ,useNavigate} from 'react-router-dom';
import { isAuthenticated } from "./utlis/Authorization";
import { HomePage } from "./Pages/HomePage"
const PrivateRoute = ({ element, ...rest }) => {
  // Add your authentication logic here to determine if the user is authenticated
  const navigate = useNavigate();
  console.log("Authorcaation test : ") 
  return isAuthenticated(document.cookie) ? (
    

    <Routes>
    <Route {...rest} element={element} />
    </Routes>
  ) : (
    <HomePage/>
  );
};

export default PrivateRoute;
