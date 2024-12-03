import React, { useState, useEffect } from "react";
import Availability from "./Availability";
import axios from "axios";

const Reservation = () => {
  // Estado para manejar la ciudad seleccionada
  const [selectedCity, setSelectedCity] = useState("");
  const [hotels, setHotels] = useState([]);
  const [apiError, setApiError] = useState(null);

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

  const apiUrl = "http://localhost:8000/api/v1/hotels";

  // Obtener datos del servidor

  const fetchHotels = async () => {
    try {
      const response = await fetch(apiUrl);
      console.log(response);
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error al obtener datos del servidor: ${errorMessage}`);
      }
      const data = await response.json();
      setHotels(data);
    } catch (error) {
      console.error(error);
      setApiError("Error al cargar los hoteles desde el servidor");
    }
  }; 
  /*   const fetchHotels = async () => {
    try {
      const response = await fetch(apiUrl);
      console.log(response);
      const data = await response.json();
      const dataWithIds = data.map((hotel, index) => ({
        ...hotel,
        id: index,
      }));
      setHotels(dataWithIds);
    } catch (error) {
      console.error(error);
      setApiError("Error al cargar los hoteles desde el servidor");

    }
  }; */
  /* const fetchHotels = async () => {
    try {
      const response = await fetch(apiUrl);
      console.log(response); // Agrega este log para ver la respuesta
      if (!response.ok) {
        const errorMessage = await response.text(); // Puedes obtener más información del error
        throw new Error(`Error al obtener datos del servidor: ${errorMessage}`);
      }
      const data = await response.json();
      setHotels(data);
    } catch (error) {
      console.error(error);
      setApiError("Error al cargar los hoteles desde el servidor");
    }
  }; */

  // Crear un nuevo hotel
  const addHotel = async (city, hotelName) => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city, hotelName }),
      });
      if (!response.ok) throw new Error("Error al añadir hotel");
      fetchHotels(); // Actualizar la lista
    } catch (error) {
      console.error(error);
    }
  };

  // Editar un hotel
  const editHotel = async (hotelId, newDetails) => {
    try {
      const response = await fetch(`${apiUrl}/${hotelId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDetails),
      });
      if (!response.ok) throw new Error("Error al actualizar hotel");
      fetchHotels();
    } catch (error) {
      console.error(error);
    }
  };

  // Eliminar un hotel
  const deleteHotel = async (hotelId) => {
    try {
      const response = await fetch(`${apiUrl}/${hotelId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar hotel");
      fetchHotels();
    } catch (error) {
      console.error(error);
    }
  };

 /* const handleCityChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);

    // Actualiza la lista de hoteles según la ciudad seleccionada
    if (hotelOptions[city]) {
      setHotels(hotelOptions[city]);
    } else {
      fetchHotels(); // Si la ciudad no tiene opciones estáticas, carga desde la API
    }
  }; */

  // Cargar los hoteles desde el servidor al montar el componente
  useEffect(() => {
    fetchHotels();
  }, []);

  // Manejar cambios en la ciudad seleccionada
      const handleCityChange = (event) => {
          const city = event.target.value;
          setSelectedCity(city);
          setHotels(hotelOptions[city] || []);
        };
   

  // Manejar cambios en la ciudad seleccionada
  /*   const handleCityChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);
    setHotels(hotelOptions[city] || []);
  };
   */
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
              {Object.keys(hotelOptions).map((city, index) => (
                <option key={index} value={city}>
                  {city.charAt(0).toUpperCase() +
                    city.slice(1).replace("_", " ")}
                </option>
              ))}
               
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
              disabled={hotels.length === 0}
            >
              <option value="">
                {hotels.length === 0
                  ? "Selecciona una ciudad primero"
                  : "Selecciona un hotel"}
              </option>
              {hotels.map((hotel, index) => (
                <option key={index} value={hotel}></option>
              ))}
    
            </select>
          </div>
        </div>
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
