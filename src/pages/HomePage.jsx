import React, { useEffect, useState } from 'react'
import CarCard from '../components/CarCard'
import Navbar from './../components/Navbar'
import api from '../api/Api'
const HomePage = () => {
    const [cars, setCars] = useState([]);

    useEffect(()=>{
        fetchCars();
    },[])

    const fetchCars=async ()=>{
        const response=await api.get("/api/v1/cars");      
        setCars(response.data.content)        
    }
    
    

    return (
        <div style={{
            minHeight: "100vh",
            backgroundColor: "#111827"
        }}>
            <div className='d-flex gap-4 flex-wrap justify-content-around'>
               {
                
                cars.map((car,index)=>{                    
                    return <CarCard key={index} car={car}></CarCard>                    
                })
               }
            </div>
        </div>
    )
}

export default HomePage
