import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupTourist = () => {
    const navigate = useNavigate(); // Initialize navigate function
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        mobileNumber: "",
        nationality: "",
        dateOfBirth: "",
        job: false,
        student: false,
    });
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Simple validation for empty fields
        if (
            !formData.username ||
            !formData.email ||
            !formData.password ||
            !formData.mobileNumber ||
            !formData.nationality ||
            !formData.dateOfBirth
        ) {
            setErrorMessage("Please fill in all the fields.");
            return;
        }

        try {
            // Send data to the backend API
            const response = await fetch("http://localhost:4000/api/tourists/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setErrorMessage("");
                // Redirect to tourist home page
                navigate("/tourist-home");
            } else {
                setMessage("");
                setErrorMessage(data.message || "Error during signup.");
            }
        } catch (error) {
            setMessage("");
            setErrorMessage("Error connecting to server.");
        }
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    return (
        <div className="signup-tourist-container">
            <form className="signup-tourist-form" onSubmit={handleSubmit}>
                <h2>Signup as a Tourist</h2>
                <div className="input-box">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-box">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-box">
                    <input
                        type="text"
                        name="mobileNumber"
                        placeholder="Mobile Number"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-box">
                    <input
                        type="text"
                        name="nationality"
                        placeholder="Nationality"
                        value={formData.nationality}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-box">
                    <input
                        type="text"
                        name="dateOfBirth"
                        placeholder="Date of Birth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="remember-forgot">
                    <label>
                        <input
                            type="checkbox"
                            name="job"
                            checked={formData.job}
                            onChange={handleChange}
                        />
                        Job
                    </label>
                </div>
                <div className="remember-forgot">
                    <label>
                        <input
                            type="checkbox"
                            name="student"
                            checked={formData.student}
                            onChange={handleChange}
                        />
                        Student
                    </label>
                </div>

                {message && <div className="message">{message}</div>}
                {errorMessage && <div className="error-message">{errorMessage}</div>}

                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default SignupTourist;
