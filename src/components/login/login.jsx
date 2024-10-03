import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'
import axios from 'axios';

import user_icon from '../../assets/user.png'
import password_icon from '../../assets/padlock.png'

const Login = () => {

  // for the Sign up and Login switching functionality
  const [action, setAction] = useState("Login");

  // hold user input
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // whether user is logged in or not
  const [loginStatus, setLoginStatus] = useState('');

  // all usernames in database
  const [usernames, setUsernames] = useState([]);

  // gets all usernames from database and stores it in usernames
  useEffect(() => {
    axios.get('http://localhost:8081/users')
    .then(res => {
      console.log(res)
      setUsernames(res.data);
    });
  }, []);

  // alerts user if the entered username is already in database
  const usernameTakenAlert = () => {
    alert("This username is already associated with an account!");
  };

  // test user input and, if valid, enter data into database
  const register = () => {

    // test if the entered username is already being used
    // don't enter info into database if it already exists (purpose of the return)
    if (usernames.some(obj => obj.username === username)) {
      usernameTakenAlert();
      return
    }

    // enter user input into database
    axios.post('http://localhost:8081/register', {
      username: username,
      name: name, 
      password: password,
    }).then((response) => {
      console.log(response);
    });
  };

  // test user input and, if valid, let user access data
  const login = () => {

    // place to validate login info

    // see if user input info is in database and set loginStatus based on that
    // could probably use a .get instead of .post but not really any reason to that I know of
    axios.post('http://localhost:8081/login', {
      username: username, 
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus('false')
      } else {
        setLoginStatus('true')
      }
    });
  };

  return (
    <div className='container'>
        <div className='header'>
          <div className='text'>Qwik Finance</div>
          <div className='underline'></div>
        </div>
        <div className='inputs'>
          {action==="Login"?<div></div>:<div className='input'>
            <img src={user_icon} alt="" />
            <input type="name" value={name} onChange={e => setName(e.target.value)} placeholder="Name"/>
          </div>}
          <div className='input'>
            <img src={user_icon} alt="" />
            <input type="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username"/>
          </div>
          <div className='input'>
            <img src={password_icon} alt="" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"/>
          </div>
        </div>
        {action==="Sign Up"?<div></div>:<div className="forgot-password">Forget Password? <span>Click Here!</span></div>}
        <div className="info-submit-container">
          <button className="info-submit" type='submit' onClick={action==="Sign Up"?register:login}>Submit</button>
        </div>
        <div className="submit-container">
          <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
          <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
        </div>
    </div>
  )
}


export default Login