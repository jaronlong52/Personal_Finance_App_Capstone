import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'
import axios from 'axios';

import user_icon from '../../assets/user.png'
import password_icon from '../../assets/padlock.png'

const Login = () => {
  // for navigation to other pages
  const navigate = useNavigate();

  // for the Sign up and Login switching functionality
  const [action, setAction] = useState("Login");

  // hold user input
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // all usernames in database
  const [usernames, setUsernames] = useState([]);

  // Hold error messages for login and sign up input
  const [errorUsername, setErrorUsername] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  // gets all usernames from database and stores it in usernames
  useEffect(() => {
    axios.get('http://localhost:8081/users')
    .then(res => {
      console.log(res)
      setUsernames(res.data);
    });
  }, []);

  // Validate user input and set error messages
  const validateInput = () => {
    // set error messages to empty
    setErrorUsername('');
    setErrorPassword('');

    // check if fields are empty
    if ('' === username) {
      setErrorUsername('Please enter your username');
      return
    }

    if ('' === password) {
      setErrorPassword('Please enter your password');
      return
    }

    // check if fields are valid length
    if (username.length > 19) {
      setErrorUsername('Username is too long');
      return
    }

    if (username.length < 1) {
      setErrorUsername('Username is too short');
      return
    }

    if (password.length > 19) {
      setErrorPassword('Password is too long');
      return
    }

    if (password.length < 6) {
      setErrorUsername('Password must be at least 6 characters');
      return
    }

    // for login, check if username does not exist
    if (action === 'Login') {
      if (!usernames.some(obj => obj.username === username)) {
        setErrorUsername('Username does not exist');
        return
      }
    }

    // for sign up, check if username is already in use
    if (action === 'Sign Up') {
      if (usernames.some(obj => obj.username === username)) {
        setErrorUsername('Username already in use');
        return
      }
    }
  }

  // test user input and, if valid, enter data into database
  const register = () => {

    // validate user input
    validateInput();

    // enter user input into database
    axios.post('http://localhost:8081/register', {
      username: username,
      name: name, 
      password: password,
    }).then((response) => {
      console.log(response);
    });

    navigate('../Dashboard');
  };

  // test user input and, if valid, let user access data
  const login = () => {

    // validate user input
    validateInput();

    // see if user input info is in database and set loginStatus based on that
    // could probably use a .get instead of .post but not really any reason to that I know of
    axios.post('http://localhost:8081/login', {
      username: username, 
      password: password,
    }).then((response) => {
      console.log(response);
      if (response.data.message === 'Valid') {
        navigate('../Dashboard');
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
            <input id="username" type="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username"/>
          </div>
          <label className="error-label" htmlFor="username">{errorUsername}</label>
          <div className='input'>
            <img src={password_icon} alt="" />
            <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"/>
          </div>
          <label className="error-label" htmlFor="password">{errorPassword}</label>
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