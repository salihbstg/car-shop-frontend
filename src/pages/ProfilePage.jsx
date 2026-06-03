import React, { useEffect, useState } from 'react'
import api from '../api/Api'
import ProfileCarCard from '../components/ProfileCarCard';
const ProfilePage = () => {
    const [customer, setCustomer] = useState({});
    const [cars, setCars] = useState([]);

    useEffect(() => {
        getCustomer();
    }, [cars])


    const getCustomer = async () => {
        const customerResponse = await api.get("/api/v1/customers/me");

        setCustomer(customerResponse.data);

        const carsResponse = await api.get(
            `/api/v1/cars/by-customer-id?customerId=${customerResponse.data.id}`
        );
        setCars(carsResponse.data);
    };


    const getLink = async (image) => {
        const formData = new FormData();
        formData.append("file", image);
        const response = await api.post("/api/media/upload", formData);
        return response.data;
    }

    const handleCreateCarSubmit = async e => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const images = formData.getAll("images");

        const imageUrls = [];

        for (const image of images) {
            const url = await getLink(image);
            imageUrls.push(url);
        }

        console.log("images:", images);
        console.log("images length:", images.length);
        api.post("/api/v1/cars",{
            brand: formData.get("brand"),
            model: formData.get("model"),
            year: Number(formData.get("year")),
            plate: formData.get("plate"),
            carColor: formData.get("carColor"),
            transmissionType: formData.get("transmissionType"),
            fuelType: formData.get("fuelType"),
            imageUrls:imageUrls
        })

    }

    return (
        <div
            style={
                {
                    minWidth: "100vh"
                }
            }
            className='container-fluid d-flex gap-3 flex-wrap bg-secondary'>
            <div className='col-lg-12 d-flex flex-column align-items-center mt-4'>
                <div className="card mt-1 rounded-5 justify-content-center py-5 align-items-center bg-dark text-white gap-5 border-2 border-warning fw-bold w-50">
                    <img src="https://t3.ftcdn.net/jpg/13/11/22/86/360_F_1311228699_YoiLc5aJ3RWz3uRfdEtlV0UYSQjqf7RW.jpg" className="card-img-top rounded-5 w-25" alt="..." />
                    <div className="card-body">
                        <p className="card-text">Ad: {customer.firstName}</p>
                        <p className="card-text">Soyad: {customer.lastName}</p>
                        <p className="card-text">Mail: {customer.email}</p>
                        <p className="card-text">Telefon: {customer.phone}</p>
                        <p className="card-text">Üyelik tarihi: {customer.createdAt}</p>
                    </div>
                </div>
                <div className='w-100 mt-5 mb-5 d-flex align-items-center justify-content-center'>
                    <form onSubmit={handleCreateCarSubmit} className="d-flex flex-column gap-2 p-4 w-75 bg-white rounded-4 shadow-sm">

                        <label htmlFor="brand" className="fw-semibold">
                            Marka
                        </label>
                        <input
                            type="text"
                            id="brand"
                            name="brand"
                            className="form-control"
                            required
                        />

                        <label htmlFor="model" className="fw-semibold">
                            Model
                        </label>
                        <input
                            type="text"
                            id="model"
                            name="model"
                            className="form-control"
                            required
                        />

                        <label htmlFor="year" className="fw-semibold">
                            Yıl
                        </label>
                        <input
                            type="text"
                            id="year"
                            name="year"
                            className="form-control"
                            required
                        />

                        <label htmlFor="plate" className="fw-semibold">
                            Plaka
                        </label>
                        <input
                            type="text"
                            id="plate"
                            name="plate"
                            className="form-control"
                            required
                        />

                        <label htmlFor="carColor" className="fw-semibold">
                            Renk
                        </label>
                        <select
                            name="carColor"
                            id="carColor"
                            className="form-select"
                            required
                        >
                            <option value="">Seçiniz</option>
                            <option value="WHITE">Beyaz</option>
                            <option value="BLACK">Siyah</option>
                            <option value="BLUE">Mavi</option>
                            <option value="RED">Kırmızı</option>
                            <option value="YELLOW">Sarı</option>
                            <option value="GREEN">Yeşil</option>
                            <option value="ORANGE">Turuncu</option>
                            <option value="PURPLE">Mor</option>
                            <option value="BEIGE">Bej</option>
                            <option value="BROWN">Kahverengi</option>
                            <option value="SILVER">Gümüş</option>
                            <option value="GRAY">Gri</option>
                        </select>

                        <label htmlFor="transmissionType" className="fw-semibold">
                            Vites
                        </label>
                        <select
                            name="transmissionType"
                            required
                            id="transmissionType"
                            className="form-select"
                        >
                            <option value="">Seçiniz</option>
                            <option value="MANUAL">Manuel</option>
                            <option value="AUTOMATIC">Otomatik</option>
                        </select>

                        <label htmlFor="fuelType" className="fw-semibold">
                            Yakıt
                        </label>
                        <select
                            name="fuelType"
                            id="fuelType"
                            className="form-select"
                            required
                        >
                            <option value="">Seçiniz</option>
                            <option value="DIESEL">Dizel</option>
                            <option value="GASOLINE">Benzin</option>
                            <option value="ELECTRIC">Elektrik</option>
                            <option value="HYBRID">Hibrit</option>
                        </select>
                        <input
                            type="file"
                            name='images'
                            className="form-control"
                            multiple
                            accept="image/*"
                            required
                        />
                        <button
                            type="submit"
                            className="btn btn-success mt-3"
                        >
                            İlan Oluştur
                        </button>

                    </form>
                </div>
            </div>
            <div className='container col-lg-12 d-flex gap-5 justify-content-center flex-wrap'>
                {
                    cars.map((car, index) => {                        
                        return <ProfileCarCard key={index} car={car} />
                    })
                }
            </div>
        </div>


    )
}

export default ProfilePage
