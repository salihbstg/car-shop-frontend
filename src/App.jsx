import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CarsPage from './pages/CarsPage'
import Navbar from './components/Navbar'
import Profile from "./pages/Profile.jsx"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />}></Route>
        <Route path='/register' element={<RegisterPage />}></Route>
        <Route path='/cars' element={<CarsPage/>}></Route>
        <Route path='/me' element={<Profile/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
