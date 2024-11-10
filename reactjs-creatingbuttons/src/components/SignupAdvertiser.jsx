import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupAdvertiser = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!username || !email || !password) {
            setError('Please fill out all fields');
            return;
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setError('');
        navigate('/company');
    };

    return (
        <div className="signup-advertiser-container">
            <form onSubmit={handleSubmit} className="signup-advertiser-form">
                <h1>Signup as an advertiser</h1>
                {error && <div className="error-message">{error}</div>}
                <div className="input-box">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-box">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default SignupAdvertiser;
