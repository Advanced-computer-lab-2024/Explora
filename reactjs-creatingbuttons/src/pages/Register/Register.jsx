import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import './register.css';
import { FaSignInAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaMobileScreen } from "react-icons/fa6";
import { FaRegFlag } from "react-icons/fa6";
import { MdOutlineWorkOutline } from "react-icons/md";
import { BsCalendarDate } from "react-icons/bs";


function Register() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        role: '', 
        username: '',
        password: '',
        email: '',
        mobileNumber: '',
        nationality: '',
        job: '',
        dateOfBirth: ''
    });

    const registerUser = async (e) => {
        e.preventDefault(); // prevent page from automatically loading
        const { role, username, password, email, mobileNumber, nationality, job, dateOfBirth } = data;

        try {
            let response;
            if (role === 'Tourist') { // Use lowercase for comparison
                response = await axios.post('http://localhost:4000/users/register', {
                    username,
                    email,
                    password,
                    role,
                    mobileNumber,
                    nationality,
                    dateOfBirth, 
                    job
                });
            } else {
                response = await axios.post('http://localhost:4000/users/register', {
                    username,
                    email,
                    password,
                    role
                });
            }

            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                toast.success('Registration Successful');
                // navigate('/home'); // Redirect to home page after successful registration
            }
        } catch (error) {
            console.error(error);
            toast.error(`Registration failed. Please try again. ${error.response?.data?.error || error.message}`); // Improved error handling
        }
    };

    // Handle change for dropdown and other input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={registerUser}>
                <h1 className="register-title">Create an account</h1>

                <div className="register-formGroup">
                <label className="register-label">Role</label>
                <select className= 'register-dropdownlist' name="role" value={data.role} onChange={handleChange} required>
                    <option value="">Select a role</option>
                    <option value="Tourist">Tourist</option>
                    <option value="Advertiser">Advertiser</option>
                    <option value="Seller">Seller</option>
                    <option value="TourGuide">Tour Guide</option>
                </select>
                </div>

                <div className="register-formGroup">
                <label className="register-label"> <CgProfile/> Username</label>
                <input className="register-input"
                    type="text"
                    placeholder="Enter your username"
                    required
                    value={data.username}
                    name="username"
                    onChange={handleChange}
                />
                </div>
                <div className="register-formGroup">
                <label className="register-label"> <MdEmail/> Email</label>
                <input className="register-input"
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={data.email}
                    name="email"
                    onChange={handleChange}
                />
                </div>
                <div className="register-formGroup">
                <label className="register-label"> <RiLockPasswordFill/> Password</label>
                <input className="register-input"
                    type="password"
                    placeholder="Enter your password"
                    required
                    value={data.password}
                    name="password"
                    onChange={handleChange}
                />
                </div>
                
                
                {data.role === 'Tourist' && (
    <>
        <div className="register-formGroup">
            <label className="register-label"><FaMobileScreen/> Mobile</label>
            <input className="register-input" // Corrected here
                type="tel"
                placeholder="Enter your mobile"
                required
                value={data.mobileNumber}
                name="mobileNumber"
                onChange={handleChange}
            />
        </div>
        <div className="register-formGroup">
            <label className="register-label"><FaRegFlag/> Nationality</label>
            <input className="register-input" // Corrected here
                type="text"
                placeholder="Enter your nationality"
                value={data.nationality}
                name="nationality"
                onChange={handleChange}
            />
        </div>
        <div className="register-formGroup">
            <label className="register-label"><MdOutlineWorkOutline /> Job</label>
            <input className="register-input" // Corrected here
                type="text"
                placeholder="Enter your job"
                value={data.job}
                name="job"
                onChange={handleChange}
            />
        </div>
        <div className="register-formGroup">
            <label className="register-label"><BsCalendarDate /> Date of Birth</label>
            <input className="register-input" // Corrected here
                type="date"
                placeholder="Enter your date of birth"
                required
                value={data.dateOfBirth}
                name="dateOfBirth"
                onChange={handleChange}
            />
        </div>
    </>
)}


                <button type="submit" className="register-button">Create Account<br/><FaSignInAlt/></button>
            </form>
        </div>
    );
}

export default Register;
