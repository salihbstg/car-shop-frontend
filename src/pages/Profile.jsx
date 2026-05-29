import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'

const Profile = () => {

    const [customer, setCustomer] = useState();
    useEffect(() => {
        fetchCustomerData();
    }, []);

    const fetchCustomerData = async () => {
        try {

            const token =
                localStorage.getItem("token");


            const { data } = await axios.get(
                "http://localhost:8081/api/v1/customers/me",
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
            );

            setCustomer(data);

        } catch (err) {

            console.log(err);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='p-3'>
                <div className="card w-25 gap-2 pt-4">

                    <img
                        src="https://cdn-icons-png.flaticon.com/512/10015/10015419.png"
                        className="card-img-top mx-auto rounded-circle"
                        alt="Resim yüklenemedi"
                        style={{ width: "40%" }}
                    />

                    <div className="card-body border-top p-3">
                        <div className='w-100 p-4 fw-bold'>
                            <p>Müşteri ID: {customer?.id}</p>
                            <p>Ad: {customer?.firstName}</p>
                            <p>Soyad: {customer?.lastName}</p>
                            <p>Email: {customer?.email}</p>
                            <p>Telefon: {customer?.phone}</p>
                            <p>Üyelik tarihi: {customer?.createdAt}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Profile