import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CarCard from '../components/CarCard';
import Navbar from '../components/Navbar';
const CarsPage = () => {

    const [cars, setCars] = useState([]);
    const [search,setSearch]=useState("");

    useEffect(() => {

        fetchCars();

    }, [search]);
  
    
    

    const fetchCars = async () => {

        try {

            const token =
                localStorage.getItem("token");
                
            const { data } = await axios.get(
                "http://localhost:8080/api/v1/cars?brand="+search,
                {
                    headers: {
                        Authorization: "Bearer "+token
                    }
                }
            );

            setCars(data.content);

            console.log(data);

        } catch (err) {

            console.log(err);
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
                        <CarCard car={car}>
                          
                        </CarCard>
                    ))
                }

            </div>

        </div>
    )
}

export default CarsPage