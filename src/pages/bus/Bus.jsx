import React, { useState } from 'react';
import './Bus.css'; // Ensure this path is correct

const Bus = () => {
    const [selectedDistrict, setSelectedDistrict] = useState(null); // State to track the selected district

    const districts = [
        'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle',
        'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara', 'Kandy', 'Kegalle',
        'Kilinochchi', 'Kurunegala', 'Mannar', 'Matale', 'Matara', 'Monaragala',
        'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee',
        'Vavuniya'
    ];

    const handleClick = (district) => {
        setSelectedDistrict(district); // Set the clicked district as selected
    };

    return (
        <div className="bus-page">
            <h2>Bus list in highway</h2>
            <div className="districts-grid">
                {districts.map((district, index) => (
                    <button
                        key={index}
                        className={`district-button ${selectedDistrict === district ? 'selected' : ''}`}
                        onClick={() => handleClick(district)}
                    >
                        {district}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Bus;