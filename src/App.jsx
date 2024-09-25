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
    <Login/>
  )
}

export default App
