import React, { useState } from 'react';

const TouristRegister = () => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        nationality: '',
        dob: '',
        jobStatus: ''
    });

    const [dobEntered, setDobEntered] = useState(false); // To track if DOB has been entered
    const [ageError, setAgeError] = useState(''); // To store age validation error

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'dob') {
            const today = new Date();
            const dob = new Date(value);
            const age = today.getFullYear() - dob.getFullYear();
            const monthDifference = today.getMonth() - dob.getMonth();

            // Adjust for month and day difference
            if (
                monthDifference < 0 ||
                (monthDifference === 0 && today.getDate() < dob.getDate())
            ) {
                age--;
            }

            // Validate age (user must be at least 18)
            if (age < 18) {
                setAgeError('You must be at least 18 years old to book on this website.');
            } else {
                setAgeError('');
                setDobEntered(true); // Disable DOB field once entered
            }
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (ageError) {
            alert(ageError); // Display age error if any
            return;
        }

        // Add form submission logic here
        console.log('Form Data Submitted: ', formData);
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
                    disabled={dobEntered} // Disable field once DOB is entered
                />
            </div>

            {ageError && <p style={{ color: 'red' }}>{ageError}</p>} {/* Display age validation error */}

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

export default TouristRegister;
