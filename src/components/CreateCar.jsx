import axios from 'axios'
import React from 'react'

const CreateCar = ({setCars}) => {
    return (
        <div className='m-5'>
            <h4 className='text-center mb-3 text-decoration-underline'>Araç ekle</h4>
            <form className='d-flex flex-column fw-bold gap-1' onSubmit={async(e)=>{
                e.preventDefault();
                const formData=new FormData(e.target);
                const response=await axios.post("http://localhost:8080/api/v1/cars",{
                    brand:formData.get("brand"),
                    model:formData.get("model"),
                    year:formData.get("year"),
                    plate:formData.get("plate"),
                    carColor:formData.get("carColor"),
                    transmissionType:formData.get("transmissionType"),
                    fuelType:formData.get("fuelType")
                },{
                    headers:{
                        Authorization:"Bearer "+localStorage.getItem("token")
                    }
                })
                setCars(prev=>{
                    return [...prev,response.data];
                });
                
            }}>
                <label htmlFor="brand">Marka:</label>
                <input type="text" name="brand" id="brand" />
                <label htmlFor="model">Model:</label>
                <input type="text" name="model" id="model" />
                <label htmlFor="year">Yıl:</label>
                <input type="text" name="year" id="year" />
                <label htmlFor="plate">Plaka:</label>
                <input type="text" name="plate" id="plate" />
                <label htmlFor="carColor">Renk:</label>
                <input type="text" name="carColor" id="carColor" />
                <label htmlFor="transmissionType">Vites tipi:</label>
                <input type="text" name="transmissionType" id="transmissionType" />
                <label htmlFor="fuelType">Yakıt tipi:</label>
                <input type="text" name="fuelType" id="fuelType" />
                <button type='submit' className='btn btn-success'>Ekle</button>
            </form>
        </div>
    )
}

export default CreateCar