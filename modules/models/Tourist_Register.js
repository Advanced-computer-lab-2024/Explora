import React, { useState } from 'react';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        nationality: '',
        dob: '',
        jobStatus: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic for form submission goes here
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                />
            </div>

            <div>
                <label>Username:</label>
                <input 
                    type="text" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleChange} 
                    required 
                />
            </div>

            <div>
                <label>Password:</label>
                <input 
                    type="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                />
            </div>

            <div>
                <label>Nationality:</label>
                <input 
                    type="text" 
                    name="nationality" 
                    value={formData.nationality} 
                    onChange={handleChange} 
                    required 
                />
            </div>

            <div>
                <label>Date of Birth:</label>
                <input 
                    type="date" 
                    name="dob" 
                    value={formData.dob} 
                    onChange={handleChange} 
                    required 
                />
            </div>

            <div>
                <label>Job/Student Status:</label>
                <select 
                    name="jobStatus" 
                    value={formData.jobStatus} 
                    onChange={handleChange} 
                    required
                >
                    <option value="">Select</option>
                    <option value="job">Job</option>
                    <option value="student">Student</option>
                </select>
            </div>

            <button type="submit">Register</button>
        </form>
    );
};

export default Register;

