import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupTourguide = () => {
    const navigate = useNavigate();  // Initialize navigate function
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Simple validation for empty fields
        if (!formData.username || !formData.email || !formData.password) {
            setErrorMessage("Please fill in all the fields.");
            return;
        }
        
        // Simulating successful signup and redirect
        setMessage("Signup successful!");
        setErrorMessage("");
        navigate("/to-do"); // Redirect to the to-do page
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="signup-tourguide-container">
            <form className="signup-tourguide-form" onSubmit={handleSubmit}>
                <h2 className="form-title">Signup as a Tour Guide</h2>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <div className="input-wrapper">
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            className="input-field"
                            required
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <div className="input-wrapper">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="input-field"
                            required
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="input-wrapper">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="input-field"
                            required
                        />
                    </div>
                </div>

                {message && <div className="message">{message}</div>}
                {errorMessage && <div className="error-message">{errorMessage}</div>}

                <button type="submit" className="signup-button">Signup</button>
            </form>
        </div>
    );
};

export default SignupTourguide;
