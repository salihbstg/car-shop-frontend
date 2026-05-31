import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CarCard from '../components/CarCard';
import Navbar from '../components/Navbar';
import api from '../api/Api';

const CarsPage = () => {

    const [cars, setCars] = useState([]);
    const [search,setSearch]=useState("");

    useEffect(() => {

        fetchCars();

    }, [search]);
  
    
    

    const fetchCars = async () => {

        try {
                
            const { data } = await api.get(
                "/api/v1/cars?brand="+search
            );

            setCars(data.content);

        } catch (err) {

            console.log(err.response);
        }
    };

    return (

        <div className='bg-secondary text-light min-vh-100'>
            <Navbar search={search} setSearch={setSearch}/>
            <h1 className='text-center pt-4'>
                Araçlar
            </h1>

            <div className='d-flex flex-wrap gap-3 justify-content-evenly'>

                {
                    cars.map(car => (
                        <CarCard key={car.id} car={car}>
                          
                        </CarCard>
                    ))
                }

            </div>

        </div>
    )
}

export default CarsPage