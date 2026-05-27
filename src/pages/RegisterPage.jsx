import React from 'react'
import axios from 'axios'

const LoginPage = () => {

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [firstName, setFirstname] = React.useState('')
    const [lastName, setLastname] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [errorMessage,setErrorMessage]=React.useState('')

    const authApiUrl = "http://localhost:8088/auth";
    const handleRegister = async () => {
        try{
            const response = await axios.post(
            authApiUrl + "/register",
            {
                "email": email,
                "username": username,
                "password": password,
                "firstName": firstName,
                "lastName": lastName,
                "phone": phone
            }
        )
        setErrorMessage('Başarıyla kayıt oldunuz!');
        }
        catch(error){
            setErrorMessage(error.response.data)
            console.log(error.response.data);
        }
    }
    return (
        <form onSubmit={
            e=>{
                e.preventDefault();
                handleRegister();
            }
        } className='d-flex text-white gap-3 bg-dark flex-column px-2 align-items-center vh-100 justify-content-center'>
            <h1>Kayıt Ol</h1>
            <input required value={username} className='form-control w-25' type="text" placeholder="Kullanıcı adınızı girin." onChange={
                e => setUsername(e.target.value)
            }></input>
            <input required value={password} type="password" className='form-control w-25' placeholder="Şifrenizi girin." onChange={
                e => setPassword(e.target.value)
            }></input>
            <input required value={email} className='form-control w-25' type="text" placeholder="Mail adresinizi girin." onChange={
                e => setEmail(e.target.value)
            }></input>
            <input required value={firstName} className='form-control w-25' type="text" placeholder="Adınızı girin." onChange={
                e => setFirstname(e.target.value)
            }></input>
            <input required value={lastName} className='form-control w-25' type="text" placeholder="Soyadınızı girin." onChange={
                e => setLastname(e.target.value)
            }></input>
            <input required value={phone} className='form-control w-25' type="text" placeholder="Telefon numaranızı girin." onChange={
                e => setPhone(e.target.value)
            }></input>
            <button required type='submit' className="btn btn-primary w-25 fw-bold fs-5">Kayıt Ol</button>
            <a className='text-white fw-bold' href="/">Giriş yap</a>
            <p>{errorMessage}</p>
        </form>
    )
}
export default LoginPage;