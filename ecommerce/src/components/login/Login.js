import React, { useState } from 'react'
import './login.scss'
import { NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';

function Login() {

  const location = useLocation();

  const [loginUser, setloginUser] = useState({
    username : '',
    password : null
  })

  const loginHandler = () => {

    axios.get('http://localhost:8080/user/getbyusername',{
      params : { username : loginUser.username }
    }).then(result => {
      console.log(JSON.stringify(loginUser));  
      const userFromDb = result.data.rows[0];
      console.log(userFromDb);
      if(userFromDb.password === parseInt(loginUser.password)) {
        localStorage.setItem('currentUser',JSON.stringify(userFromDb));
        window.location.href = '/';
        console.log(location.pathname);
      }else {
        alert("invalid password");
      }
    }).catch(error => {
      alert(error.message);
    })

  }

  const loginInputHandler = (event) => {
      setloginUser(prevState => {
         return {
          ...prevState,
          [event.target.id] : event.target.value
         }
      })
  }
  
  return (
    
      <div className='login'>
        <div className="login-container">
          <h2>Login</h2>
          <form>
              <input type="text" placeholder="Username" onChange={loginInputHandler} id='username' required/>
              <input type="password" placeholder="Password" onChange={loginInputHandler} id='password' required/>
              <NavLink className={"navlink"}>Forgot Password?</NavLink>
              <input type="submit" onClick={loginHandler} value="Login"/>
            </form>
        </div>  
      </div>
      

   
  )
}

export default Login;