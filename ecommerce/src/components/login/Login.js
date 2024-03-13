import React, { useState } from 'react'
import './login.scss'
import { NavLink, useLocation } from 'react-router-dom';
import axios from '../../api/axios';

function Login(props) {

  const location = useLocation();
  const [loginUser, setloginUser] = useState({
    username : '',
    password : null
  })

  const loginHandler = () => {

    axios.get('/user/login',{
      params : { user : loginUser.username, password : loginUser.password }
    }).then(result => {
      console.log(JSON.stringify(loginUser));  
      localStorage.clear();
      localStorage.setItem('currentUser',JSON.stringify(result.data.user));
      localStorage.setItem('auth',result.data.accessToken);
      alert(result.data.message);
      const redirect = location.state?.key || '/';
      window.location.href = redirect;
    }).catch(error => {
      alert(error.response.data.message);
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