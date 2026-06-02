import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import './styles/global.css'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import Navbar from './components/Navbar'
function App() {

  return (
    
    <BrowserRouter>
    <Navbar></Navbar>
      <Routes>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/register' element={<RegisterPage />}></Route>
        <Route path='/home' element={<HomePage/>}></Route>
        <Route path='/me' element={<ProfilePage/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
