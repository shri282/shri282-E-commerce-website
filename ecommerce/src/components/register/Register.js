import React from 'react'
import './register.scss'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
     name : '',
     email : '',
     username : '',
     password : null
  });

  const [error, setError] = useState(null);

  const registerFormHandler = (event) => {
    setUser(prevState => {
      return {
        ...prevState,
        [event.target.id] : event.target.value
      }
    })
  } 

  const submitHandler = (event) => {
    axios.post('http://localhost:8080/user',user).then(result => {

      alert("registered");
      const contextUser = {
        username : user.name,
        password : user.password
      };
      localStorage.setItem("currentUser",JSON.stringify(contextUser));
      console.log("in register",JSON.stringify(contextUser));
      navigate('/');

    }).catch(error => {
      console.log(JSON.stringify(user));
      alert(error);  
    });

    event.preventDefault();
  }

  return (
    <div>
        <div className='register'>
          <div className="register-container">
            <h2>Register</h2>
            <form>
                <input type="text" placeholder="Name" id='name' onChange={registerFormHandler} required/>
                <input type="email" placeholder="email" id='email' onChange={registerFormHandler} required/>
                <input type="text" placeholder="username" id='username' onChange={registerFormHandler} required/>
                <input type="password" placeholder="Password" id='password' onChange={registerFormHandler} required/>
                <input type="submit" onClick={submitHandler} value="Register"/>
                {/* <Button variant='outlined' onClick={submitHandler}>submit</Button> */}
              </form>
          </div>  

        </div>

        <div>
          {
            error && JSON.stringify(error)
          }
        </div>
    </div>
    

      
  )
}

export default Register