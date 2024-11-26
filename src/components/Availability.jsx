import React from 'react';
import { useState } from 'react';

const Availability = () => {

    const [cantidad, setCantidad] = useState('');

    const handleCantidadChange = (e) => {
        const value = e.target.value;

 // Validar que solo acepte números entre 0 y 47

    if (/^\d*$/.test(value) && (value === '' || Number(value) <= 47)) {
        setCantidad(value);
      }
    };



    return (
        <form className="container mt-4">
            <div className="row g-3">
                {/* Cantidad */}
                <div className="col-md-4">
                    <label htmlFor="cantidad" className="form-label">Cantidad</label>
                    <input
                        type="text"
                        id="cantidad"
                        className="form-control"
                        value={cantidad}
                        onChange={handleCantidadChange}
                        placeholder="Ingrese un número"
                        required
                    />
                </div>

                {/* Tipo de Habitación */}
                <div className="col-md-4">
                    <label htmlFor="tipoHabitacion" className="form-label">Tipo de Habitación</label>
                    <select
                        id="tipoHabitacion"
                        className="form-select"
                        required
                    >
                        <option value="">Seleccione</option>
                        <option value="Estandar S">Estandar</option>
                        <option value="Junior">Junior</option>
                        <option value="Estandar D">Suite</option>
                    </select>
                </div>

                {/* Acomodación */}
                <div className="col-md-4">
                    <label htmlFor="acomodacion" className="form-label">Acomodación</label>
                    <select
                        id="acomodacion"
                        className="form-select"
                        required
                    >
                        <option value="">Seleccione</option>
                        <option value="Sencilla">Sencilla</option>
                        <option value="Doble">Doble</option>
                        <option value="Triple">Triple</option>
                        <option value="Doble">Cuadruple</option>

                    </select>
                </div>
            </div>
        </form>
    );
};

export default Availability;
