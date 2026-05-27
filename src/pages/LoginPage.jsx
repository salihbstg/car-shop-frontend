import React from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const LoginPage = () => {

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [message, setMessage] = React.useState('')
    const navigate = useNavigate();
    const authApiUrl = "http://localhost:8088/auth";
    const handleLogin = async () => {
        try {
            const response = await axios.post(
                authApiUrl + "/login",
                {
                    "identifier": username,
                    "password": password
                }
            )
            if (response != null) {
                const accessToken = response.data.accessToken;
                localStorage.setItem("token",accessToken);
                setMessage("");
                navigate("/cars");
            }
        }
        catch (error) {
            setMessage("Eksik veya hatalı bilgi girdiniz!")
        }
    }
    return (
        <form onSubmit={
            e => {
                e.preventDefault();
                handleLogin();
            }
        } className='d-flex gap-3 flex-column px-2 align-items-center vh-100 text-white bg-dark justify-content-center'>
            <h1>Giriş</h1>
            <input required value={username} className='form-control w-25' type="text" placeholder="Kullanıcı adı veya mail adresinizi girin." onChange={
                e => setUsername(e.target.value)
            }></input>
            <input required value={password} className='form-control w-25' type="password" placeholder="Şifrenizi girin." onChange={
                e => setPassword(e.target.value)
            }></input>
            <button type="submit" className="btn btn-primary w-25 fw-bold fs-5">Giriş</button>
            <a className='text-white fw-bold' href="/register">Üyelik oluştur</a>
            <p>{message}</p>
        </form>
    )
}

export default LoginPage;