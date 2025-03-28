import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-page">
            <h2>About Us</h2>
            <p>
                Welcome to FindBusses, your go-to platform for hassle-free highway bus ticket booking. We connect passengers and bus operators through a seamless and efficient system.
            </p>
            <h3>Why Choose Us?</h3>
            <ul>
                <li><strong>Easy Booking:</strong> Find and book tickets in just a few clicks.</li>
                <li><strong>For Bus Owners:</strong> Manage schedules and grow your business.</li>
                <li><strong>Secure & Transparent:</strong> Safe payments with no hidden fees.</li>
                <li><strong>Instant Confirmation:</strong> Get quick access to bus details.</li>
            </ul>
            <p>
                At FindBusses, we make travel simple, secure, and stress-free. Book now and travel smarter!
            </p>
        </div>
    );
};

export default About;