import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'
import axios from 'axios';
import { UsernameContext } from '../../contexts/UsernameContext';

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

  // set context username so other tabs can use it
  const { variable, setVariable } = useContext(UsernameContext);

  // all usernames in database
  const [usernames, setUsernames] = useState([]);

  // Hold error messages for login and sign up input
  const [errorName, setErrorName] = useState('');
  const [errorUsername, setErrorUsername] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  // gets all usernames from database and stores it in usernames
  useEffect(() => {
    axios.get('http://localhost:8081/users')
    .then(res => {
      setUsernames(res.data);
    });
  }, []);

  // Validate user input and set error messages
  const validateInput = () => {
    // set error messages to empty
    setErrorName('');
    setErrorUsername('');
    setErrorPassword('');

    // check if name field is correct if trying to sign up
    if (action === "Sign Up") {
      if ('' === name) {
        setErrorName('Please enter your name');
        return false;
      } else if (name.length > 19) {
        setErrorName('Name is too long');
        return false;
      }
    }

    // check if fields are empty
    if ('' === username) {
      setErrorUsername('Please enter your username');
      return false;
    }

    if ('' === password) {
      setErrorPassword('Please enter your password');
      return false;
    }

    // check if fields are valid length
    if (username.length > 19) {
      setErrorUsername('Username is too long');
      return false;
    }

    if (username.length < 1) {
      setErrorUsername('Username is too short');
      return false;
    }

    if (password.length > 19) {
      setErrorPassword('Password is too long');
      return false;
    }

    if (password.length < 6) {
      setErrorPassword('Password must be at least 6 characters');
      return false;
    }

    // for login, check if username does not exist
    if (action === 'Login') {
      if (!usernames.some(obj => obj.username === username)) {
        setErrorUsername('Username does not exist');
        return false;
      }
    }

    // for sign up, check if username is already in use
    if (action === 'Sign Up') {
      if (usernames.some(obj => obj.username === username)) {
        setErrorUsername('Username already in use');
        return false;
      }
    }
    return true;
  }

  // test user input and, if valid, enter data into database
  const register = () => {

    // validate user input
    if (validateInput()) {
      // enter user input into database
      axios.post('http://localhost:8081/register', {
        username: username,
        name: name, 
        password: password,
      });

      navigate('../Dashboard');
    }
  };

  // test user input and, if valid, let user access data
  const login = () => {

    // validate user input
    if (validateInput()) {
      // see if user input info is in database and set loginStatus based on that
      // could probably use a .get instead of .post but not really any reason to that I know of
      axios.post('http://localhost:8081/login', {
        username: username, 
        password: password,
      }).then((response) => {
        if (response.data.message === 'Valid') {
          navigate('../Dashboard');
        } else {
          setErrorPassword('Invalid Username or Password')
        }
      });
    }
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
    setVariable(e.target.value);
  }

  return (
    <div className='login-container'>
        <div className='login-header'>
          <div className='text'>Qwik Finance</div>
          <div className='underline'></div>
        </div>
        <div className='inputs'>
          {action==="Login"?<div></div>:<div className='input'>
            <img src={user_icon} alt="" />
            <input type="name" value={name} onChange={e => setName(e.target.value)} placeholder="Name"/>
          </div>}
          <label className="error-label" htmlFor="name">{errorName}</label>
          <div className='input'>
            <img src={user_icon} alt="" />
            <input id="username" type="username" value={username} onChange={handleUsername} placeholder="Username"/>
          </div>
          <label className="error-label" htmlFor="username">{errorUsername}</label>
          <div className='input'>
            <img src={password_icon} alt="" />
            <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"/>
          </div>
          <label className="error-label" htmlFor="password">{errorPassword}</label>
        </div>
        <div className="info-submit-container">
          <button className="info-submit" type='submit' onClick={action==="Sign Up"?register:login}>Submit</button>
        </div>
        <div className="submit-container">
          <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
          <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login"); setErrorName('')}}>Login</div>
        </div>
    </div>
  )
}


export default Login