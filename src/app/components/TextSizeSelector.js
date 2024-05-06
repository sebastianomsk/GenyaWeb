import React from 'react';

const TextSizeSelector = ({ onSizeChange }) => {
    return (
        <div>
            <label htmlFor="text-size">Tamaño del Texto:</label>
            <select id="text-size" onChange={(e) => onSizeChange(e.target.value)}>
                <option value="small">Pequeño</option>
                <option value="medium">Mediano</option>
                <option value="large">Grande</option>
            </select>
        </div>
    );
};

export default TextSizeSelector;
