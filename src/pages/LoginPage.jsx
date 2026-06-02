import React from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import api from '../api/Api'

const LoginPage = () => {

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [message, setMessage] = React.useState('')
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const response = await api.post(
              "auth/login",
                {
                    "identifier": username,
                    "password": password
                }
            )
            if (response != null) {
                const accessToken = response.data.accessToken;
                localStorage.setItem("token",accessToken);
                setMessage("");
                navigate("/home");
            }
        }
        catch (error) {
            setMessage("Eksik veya hatalı bilgi girdiniz!")
        }
    }
    return (
        <div className='login-register-bg vh-100 d-flex flex-column justify-content-center'>
            <form
             style={{ width: '40%' }}
            onSubmit={
            e => {
                e.preventDefault();
                handleLogin();
            }
        } className='login-register-border d-flex gap-3 py-5 mx-auto flex-column align-items-center text-white justify-content-center'>
            <h1>Giriş</h1>
            <input required value={username} className='form-control w-75' type="text" placeholder="Kullanıcı adı veya mail adresinizi girin." onChange={
                e => setUsername(e.target.value)
            }></input>
            <input required value={password} className='form-control w-75' type="password" placeholder="Şifrenizi girin." onChange={
                e => setPassword(e.target.value)
            }></input>
            <button type="submit" className="btn btn-primary w-75 fw-bold fs-5">Giriş</button>
            <a className='text-white fw-bold' href="/register">Üyelik oluştur</a>
            <p>{message}</p>
        </form>
        </div>
    )
}

export default LoginPage;