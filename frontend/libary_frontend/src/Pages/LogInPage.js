import React from 'react';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios'
import { Link } from "react-router-dom"
import { CreateCookie } from '../utlis/Authorization';



//Creating a function to handle the form button press
export const LoginPage = () => {

  //Creating var to navigate to the next page 
  const navigate = useNavigate();


  //On the button press go to the "/Home Page"
  const  handleSubmit = async (event) => {

    var form = document.getElementById("LogInForm");
    var Username = form.elements["username"].value
    var Password = form.elements["password"].value
    
    console.log("Username: "+Username)
    console.log("Password: "+Password)

    var  Vaildated =  await VaildateData(Username,Password)
    console.log("Vailtaded: "+Vaildated)
    if(Vaildated){
      
      CreateCookie(Username)
      return navigate("/Home");
    }

    else{
      alert("Password or Username was Invaild, please try again");
      event.preventDefault();
      form.reset();
      return navigate("/");
      
    }
    }
   
    
  async function VaildateData( Username,Password){
    /*
      Steps for vaildations
        Use a get call from the API TO vaildate if this peroson exist

    */

    
    var vaild= true
    var RequestURL ="http://localhost:3001/Login"
    axios.post(RequestURL, {
      username: Username,
      password: Password
    })
    .then(response => {
      console.log('Response:', response.data);
      console.log(response.data == "No Data")
      if (response.data==undefined || response.data == "No Data"){
        console.log("BAD FALSE ")
        vaild=false
      }
  
      
    })
    .catch(error => {
      console.error('Error:', error);

    });
    
   

    return vaild
    
   



 }



  return (
    <div>
      <div className="banner-container">Welcome to Library Service</div>
      <div className="login-container">
        <h2>Login</h2>
        <form action="/login" onSubmit={handleSubmit} id='LogInForm'>
          <label htmlFor="username">Username:</label>
          <input type="email" id="username" name="username" required maxLength="50"  />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required  maxLength="100" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}" title="Password must have &#13;
          at least one lowercase and uppercase letter,  &#013;
          one digit, &#013; 
          one special character, &#013;
          and least 10 characters in length&#13;" />

          <button type="submit">Enter</button>
          <br></br>
          <Link to="/SignUp">Dont have and account? Click here to sign up</Link>
        </form>
        
      </div>
    </div>
  );
};


  
  

