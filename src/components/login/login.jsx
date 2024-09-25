import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'
import userData from '../../userData.json'

import user_icon from '../../assets/user.png'
import password_icon from '../../assets/padlock.png'

const Login = () => {

  const [action, setAction] = useState("Login");
  const [name, setName] = useState("Name");
  const click = () => {
    alert(name)
  }
  const change = event => {
    setName(event.target.value)
  }

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Qwik Finance</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        {action==="Login"?<div></div>:<div className='input'>
          <img src={user_icon} alt="" />
          <input onChange={change} value = {name} type="name" placeholder="Name"/>
        </div>}
        <div className='input'>
          <img src={user_icon} alt="" />
          <input type="username" placeholder="Username"/>
        </div>
        <div className='input'>
          <img src={password_icon} alt="" />
          <input type="password" placeholder="Password"/>
        </div>
      </div>
      {action==="Sign Up"?<div></div>:<div className="forgot-password">Forget Password? <span>Click Here!</span></div>}
      <div className="submit-container">
        <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
        <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
      </div>
    </div>
  )
}


export default Login