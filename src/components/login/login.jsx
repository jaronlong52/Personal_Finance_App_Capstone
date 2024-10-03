import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'
import axios from 'axios';

import user_icon from '../../assets/user.png'
import password_icon from '../../assets/padlock.png'

const Login = () => {

  const [action, setAction] = useState("Login");
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loginStatus, setLoginStatus] = useState('');

  const [checkRegister, setCheckRegister] = useState('false');

  // change post for checkRegister and register back to original
  // just use get request to store all usernames in list
  // when user is typing their username in on sign up page, test if username matches one in the list

  const checkRegisterFun = () => {
    axios.post('http://localhost:8081/checkRegister', {
      username: username,
    }).then((response) => {
      console.log(response);
      setCheckRegister(String(response.data));
      // if (response.status !== 200)
      // {
      //   register();
      // }
      register();
    });
  };

  const register = () => {
    axios.post('http://localhost:8081/register', {
      username: username,
      name: name, 
      password: password,
    }).then((response) => {
      console.log(response);
    });
  };

  const login = () => {
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
          <button className="info-submit" type='submit' onClick={action==="Sign Up"?checkRegisterFun:login}>Submit</button>
        </div>
        <div className="submit-container">
          <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
          <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
        </div>
        <div className="checkRegister">checkRegister: {checkRegister}</div>
    </div>
  )
}


export default Login