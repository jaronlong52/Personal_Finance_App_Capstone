import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/login/login'
import './App.css'
import { useEffect, useState } from 'react'
import DashBoard from './components/dashboard'
import Preview from './components/preview'

function App() {
  return (
    <div>

      <DashBoard/>
    </div>
  )
}

export default App
