import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import ProfileCarCard from '../components/ProfileCarCard';
import CreateCar from '../components/CreateCar';
const Profile = () => {

    const [customer, setCustomer] = useState();
    const [cars, setCars] = useState([]);
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
            fetchCarByCustomer(data.id);

        } catch (err) {

            console.log(err);
        }
    }

    const fetchCarByCustomer = async (customerId) => {
        try {
            const token =
                localStorage.getItem("token");
            const { data } = await axios.get("http://localhost:8080/api/v1/cars/by-customer-id", {
                params: {
                    customerId: customerId
                },
                headers: {
                    Authorization: "Bearer " + token
                }

            });
            setCars(data);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='d-flex container'>
                <div className='pt-2 col-lg-4 me-2'>
                    <div className='d-flex flex-column align-items-center gap-2'>
                        <div className="card w-100 gap-2 p-2">

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
                        <CreateCar setCars={setCars}/>
                        
                    </div>

                </div>
                <div className='col-lg-8 border border-danger mt-2 d-flex flex-column gap-4'>
                    <ProfileCarCard cars={cars} setCars={setCars}></ProfileCarCard>
                </div>
            </div>
        </div>
    )
}

export default Profile