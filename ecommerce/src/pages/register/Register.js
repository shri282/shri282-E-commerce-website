import React from 'react'
import './register.scss'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

function Register() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
     name : '',
     email : '',
     username : '',
     password : null
  });


  const registerFormHandler = (event) => {
    setUser(prevState => {
      return {
        ...prevState,
        [event.target.id] : event.target.value
      }
    })
  } 

  const submitHandler = (event) => {
    axios.post('/user',user).then(result => {
      alert("registered");
      localStorage.setItem("currentUser",JSON.stringify(result.data.user));
      console.log(result.data.accessToken);
      localStorage.setItem("auth",result.data.accessToken);
      console.log("in register",JSON.stringify(result.data.user));
      navigate('/');
    }).catch(error => {
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

    </div>
    

      
  )
}

export default Register