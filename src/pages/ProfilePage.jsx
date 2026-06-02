import React, { useEffect, useState } from 'react'
import api from '../api/Api'
import ProfileCarCard from '../components/ProfileCarCard';
const ProfilePage = () => {
const [customer, setCustomer] = useState({});
const [cars, setCars] = useState([]);

useEffect(()=>{
    getCustomer();
},[])

const getCustomer = async () => {
    const customerResponse = await api.get("/api/v1/customers/me");

    setCustomer(customerResponse.data);

    const carsResponse = await api.get(
        `/api/v1/cars/by-customer-id?customerId=${customerResponse.data.id}`
    );
      
    setCars(carsResponse.data);
};




    return (
        <div className='container d-flex'>
            <div className='col-lg-4'>
                <div className="card mt-3 ms-3 rounded-5 border-2 border-warning fw-bold" style={{ width: "18rem" }}>
                    <img src="https://t3.ftcdn.net/jpg/13/11/22/86/360_F_1311228699_YoiLc5aJ3RWz3uRfdEtlV0UYSQjqf7RW.jpg" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <p className="card-text">Ad: {customer.firstName}</p>
                        <p className="card-text">Soyad: {customer.lastName}</p>
                        <p className="card-text">Mail: {customer.email}</p>
                        <p className="card-text">Telefon: {customer.phone}</p>
                        <p className="card-text">Üyelik tarihi: {customer.createdAt}</p>
                    </div>
                </div>
                <div>
                    İşlemler
                </div>
            </div>
            <div className='col-lg-8'>
              {
                cars.map(car=>{
                    return <ProfileCarCard car={car} />
                })
              }
            </div>
        </div>


    )
}

export default ProfilePage
