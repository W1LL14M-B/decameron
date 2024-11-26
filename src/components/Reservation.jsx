import React, { useState } from 'react';
import Availability from './Availability';

const Reservation = () => {
  // Estado para manejar la ciudad seleccionada
  const [selectedCity, setSelectedCity] = useState("");
  const [hotels, setHotels] = useState([]);

  // Hoteles por ciudad
  const hotelOptions = {
    cartagena: [
      "Apartahotel Boutique San Pedro",
      "Hotel Decameron Barú",
      "Hotel Decameron Cartagena",
    ],
    santamarta: ["Hotel Decameron Galeón"],
    isla_de_san_andres: [
      "Hotel Decameron Aquarium",
      "Hotel Decameron Isleño",
      "Hotel Decameron Maryland",
      "Hotel Decameron Los Delfines",
      "Hotel Decameron Marazul",
      "Hotel Decameron San Luis",
    ],
    quindio: [
      "Hotel Decameron Las Heliconias",
      "Hotel Decameron Panaca",
    ],
    amazonas: ["Hotel Decameron Decalodge Ticuna"],
    boyaca: [
      "Hotel Refugio Rancho Tota",
      "Hotel Santa Inés",
    ],
  };

  // Manejar cambios en la ciudad seleccionada
  const handleCityChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);
    setHotels(hotelOptions[city] || []);
  };

  return (
    <div className="container mt-4">
      <h2>Reservas</h2>
      <form>
        <div className="row mb-3">
          {/* Ciudad */}
          <div className="col-md-6">
            <label htmlFor="ciudad" className="form-label">Ciudad:</label>
            <select
              className="form-select"
              id="ciudad"
              value={selectedCity}
              onChange={handleCityChange}
            >
              <option value="">
                Selecciona una ciudad
              </option>
              <option value="cartagena">Cartagena</option>
              <option value="santamarta">Santamarta</option>
              <option value="isla_de_san_andres">Isla de San Andrés</option>
              <option value="quindio">Quindío</option>
              <option value="amazonas">Amazonas</option>
              <option value="boyaca">Boyacá</option>
            </select>
          </div>
          {/* Hoteles */}
          <div className="col-md-6">
            <label htmlFor="hotel" className="form-label">Hoteles:</label>
            <select className="form-select" id="hotel" disabled={hotels.length === 0}>
              <option value="">
                {hotels.length === 0
                  ? "Selecciona una ciudad primero"
                  : "Selecciona un hotel"}
              </option>
              {hotels.map((hotel, index) => (
                <option key={index} value={hotel}>
                  {hotel}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row mb-3">
          {/* Dirección */}
          <div className="col-md-6">
            <label htmlFor="direccion" className="form-label">Dirección:</label>
            <input
              type="text"
              className="form-control"
              id="direccion"
              placeholder="Ingresa la dirección"
            />
          </div>
          {/* NIT */}
          <div className="col-md-6">
            <label htmlFor="nit" className="form-label">NIT:</label>
            <input
              type="text"
              className="form-control"
              id="nit"
              placeholder="Ingresa el NIT"
            />
          </div>
        </div>

        <div className="row mb-3">
          {/* Número de habitación */}
          <div className="col-md-6">
            <label htmlFor="habitacion" className="form-label">Número de habitación:</label>
            <input
              type="text"
              className="form-control"
              id="habitacion"
              placeholder="Ingresa el número de habitación"
            />
          </div>
        </div>
      </form>
      <Availability />
    </div>


  );

};


<Availability />

export default Reservation;
