import React from 'react';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios'
import { Link } from "react-router-dom"


export const SignUpPage = () =>{

  const navigate = useNavigate();


  //On the button press go to the "/Home Page"
  const  handleSubmit = async (event) => {

    var form = document.getElementById("SignUpForm");

    var FirstName = form.elements["validationDefault01"].value
    var LastName = form.elements["validationDefault02"].value
    var Username = form.elements["username"].value
    var Password = form.elements["password"].value


    console.log("FirstName: "+FirstName)
    console.log("Lastname: "+LastName)
    console.log("Username: "+Username)
    console.log("Password: "+Password)

    
    var  Vaildated =  await AddAccountToDB(FirstName, LastName, Username,Password)
    console.log("Vailtaded: "+Vaildated)
    if(Vaildated){
      
      return navigate("/home");
    }

    else{
      alert("The email you have provided is already in use, pleas try again");
      event.preventDefault();
      form.reset();
      return navigate("/SignUp");
      
    }
  }
   
    
  async function AddAccountToDB( FirstName, LastName, Username,Password){
   

    
    var vaild= true
    var RequestURL ="http://localhost:3001/SignUp"
    axios.post(RequestURL, {
      username: Username,
      password: Password,
      firstname: FirstName,
      lastname: LastName
    })
    .then(response => {
      console.log('Response:', response.data);
      if (response.data == "Duplciate Username/Email"){
        console.log("User not inserted")
        return false
      }
      else{
        console.log("Vaild user, inserted")
        return true
      }
 
    })
    .catch(error => {
      console.error('Error:', error);

    });
    
   

    return vaild
    
   



 }

    return(
      <div>
        <div className="banner-container">Welcome to Library Service SignUp!</div>
        <div className="signUp-container" > 
        <form class="row g-3" onSubmit={handleSubmit} id="SignUpForm">
        <div class="col-md-4" >
          <label for="validationDefault01" class="form-label">First name</label>
          <input type="text" class="form-control" id="validationDefault01"  required/>
        </div>
        <div class="col-md-4">
          <label for="validationDefault02" class="form-label">Last name</label>
          <input type="text" class="form-control" id="validationDefault02"  required/>
        </div>
        <div class="col-md-4">
          <label for="validationDefaultUsername" class="form-label">Username</label>
          <div class="input-group">
          <input type="email" id="username" name="username" required maxLength="50"  />
          </div>
        </div>
        <div class="col-md-6">
          <label for="validationDefault03" class="form-label">Password</label>
          <input type="password" id="password" name="password" required  maxLength="100" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}" title="Password must have &#13;
          at least one lowercase and uppercase letter,  &#013;
          one digit, &#013; 
          one special character, &#013;
          and least 10 characters in length&#13;" />
        </div> 
        <div class="col-12">


          <div class="checkboxes">
          
          <label class="checkboxes"> 
            <span>Terms & Conditions</span>
            <input type="checkbox" value="" id="invalidCheck2" required/>     
          </label>
          
              

         

          
          
           
          
            
            
          </div>
        </div>
        <div class="col-12">
          <button class="btn btn-primary" type="submit">Submit form</button>
        </div>
      </form> 
      </div>
      </div>

    )

}


