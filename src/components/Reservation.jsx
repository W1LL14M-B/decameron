import React, { useState, useEffect } from "react";
import Availability from "./Availability";
import axios from "axios";

const Reservation = () => {
  // Estado para manejar la ciudad seleccionada
  const [selectedCity, setSelectedCity] = useState("");
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (selectedCity) {
      setLoading(true);
      // Primero, obtenemos los hoteles locales
      const localHotels = hotelOptions[selectedCity] || [];

      // Luego, intentamos obtener los hoteles desde el API
      fetch(`http://127.0.0.1:8000/api/v1/hotels?city=${selectedCity}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al cargar los hoteles");
          }
          return response.json();
        })
        .then((data) => {
          const apiHotels = data.hotels || [];
          // Si el API devuelve hoteles, los usamos, de lo contrario, usamos los locales
          setHotels(apiHotels.length > 0 ? apiHotels : localHotels);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
          setHotels(localHotels); // Si hay error, usar los locales
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setHotels([]);
    }
  }, [selectedCity]);

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
    quindio: ["Hotel Decameron Las Heliconias", "Hotel Decameron Panaca"],
    amazonas: ["Hotel Decameron Decalodge Ticuna"],
    boyaca: ["Hotel Refugio Rancho Tota", "Hotel Santa Inés"],
  };




  // Manejar cambios en la ciudad seleccionada
  const handleCityChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);
    //setHotels(hotelOptions[city] || []);
  };
  
  return (
    <div className="container mt-4">
      <h2>Reservas Decameron</h2>
      <form>
        <div className="row mb-3">
          {/* Ciudad */}
          <div className="col-md-6">
            <label htmlFor="ciudad" className="form-label">
              Ciudad:
            </label>
            <select
              className="form-select"
              id="ciudad"
              value={selectedCity}
              onChange={handleCityChange}
            >
              <option value="">Selecciona una ciudad</option>
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
            <label htmlFor="hotel" className="form-label">
              Hoteles:
            </label>
            <select
              className="form-select"
              id="hotel"
              disabled={loading || hotels.length === 0}
              //disabled={hotels.length === 0}
            >
                 <option value="">
                {loading
                  ? "Cargando hoteles..."
                  : hotels.length === 0
                  ? "Selecciona una ciudad primero"
                  : "Selecciona un hotel"}
              </option>
           {/*    <option value="">
                {hotels.length === 0
                  ? "Selecciona una ciudad primero"
                  : "Selecciona un hotel"}
              </option> */}
              {hotels.map((hotel, index) => (
                <option key={index} value={hotel}>
                  {hotel}
                </option>
        
              ))}
            </select>
          </div>
        </div>
        {/*       error */}
        {error && <p className="text-danger">Error: {error}</p>}
        <div className="row mb-3">
          {/* Dirección */}
          <div className="col-md-6">
            <label htmlFor="direccion" className="form-label">
              Dirección:
            </label>
            <input
              type="text"
              className="form-control"
              id="direccion"
              placeholder="Ingresa la dirección"
            />
          </div>
          {/* NIT */}
          <div className="col-md-6">
            <label htmlFor="nit" className="form-label">
              NIT:
            </label>
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
            <label htmlFor="habitacion" className="form-label">
              Número de habitación:
            </label>
            <input
              type="text"
              className="form-control"
              id="habitacion"
              placeholder="Ingresa el número de habitación"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-end">
            <button type="submit" className="btn btn-primary">
              Enviar
            </button>
          </div>
        </div>
      </form>
      <Availability />
    </div>
  );
};



export default Reservation;
