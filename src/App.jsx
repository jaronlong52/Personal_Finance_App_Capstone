import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/login/login'
import './App.css'
import { useEffect, useState } from 'react'

function App() {
  return (
    <div>
      <Login/>
    </div>
  )
}

export default App
