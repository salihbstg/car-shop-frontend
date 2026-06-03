import React from 'react'

const CarCard = ({ car }) => {

    return (
        <div
            className='d-flex gap-3  fw-bold mt-3 flex-column flex-wrap align-items-center col-md-5 col-sm-12 col-lg-3 bg-white border rounded-5'>
            <div
                id={`carousel-${car.id}`}
                className="carousel slide"
                data-bs-ride="carousel"
            >
                <div className="carousel-inner">
                    {car.imageUrls.map((url, index) => (
                        <div
                            key={index}
                            className={`carousel-item ${index === 0 ? "active" : ""
                                }`}
                        >
                            <img
                                src={url}
                                className="w-100 rounded-top-5"
                                alt={`car-${index}`}
                                style={{
                                    height: "250px",
                                }}
                            />
                        </div>
                    ))}
                </div>

                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target={`#carousel-${car.id}`}
                    data-bs-slide="prev"
                >
                    <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                </button>

                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target={`#carousel-${car.id}`}
                    data-bs-slide="next"
                >
                    <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div>
                <p>Marka: {car.brand}</p>
                <p>Model: {car.model}</p>
                <p>Yıl: {car.year}</p>
                <p>Plaka: {car.plate}</p>
                <p>Renk: {car.carColor}</p>
                <p>Vites tipi: {car.transmissionType}</p>
                <p>Yakıt tipi: {car.fuelType}</p>
            </div>
            <div className='w-100 border-top border-black pt-3'>
                <h6 className='text-decoration-underline ms-3 fw-bold'>İlan sahibi:</h6>
                <div className='text-center'>
                    <p>Ad: {car.customerResponse.firstName}</p>
                    <p>Soyad: {car.customerResponse.lastName}</p>
                    <p>Email: {car.customerResponse.email}</p>
                    <p>Telefon: {car.customerResponse.phone}</p>
                    <p>Kayıt tarihi: {car.customerResponse.createdAt}</p>
                </div>
            </div>
        </div>
    )

}

export default CarCard
