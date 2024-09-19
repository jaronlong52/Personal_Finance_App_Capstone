import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/login/login'
import './App.css'
import React, { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch('http://cs4800.cs.appstate.edu:8081/users')
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.log(err));
  }, [])
  return (
    <div style={{padding: "50px"}}>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => {
            <tr key={i}>
              <td>{d.username}</td>
              <td>{d.name}</td>
              <td>{d.email}</td>
              <td>{d.password}</td>
            </tr>
          })}
        </tbody>
      </table>
      {/* <Login/> */}
    </div>
  )
}

export default App
