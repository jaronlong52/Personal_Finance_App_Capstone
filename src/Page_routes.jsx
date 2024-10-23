import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/login/login'
import Dashboard from './components/dashboard/dashboard'

const Page_routes = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Page_routes