import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import './register.css';
import { CgProfile } from "react-icons/cg";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaMobileScreen } from "react-icons/fa6";
import { FaRegFlag } from "react-icons/fa6";
import { MdOutlineWorkOutline } from "react-icons/md";
import { BsCalendarDate } from "react-icons/bs";
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'; // Import the new icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';




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
        dateOfBirth: '',
        idFile: null,          // For ID File
        certificatesFile: null, // For Certificates (TourGuide)
        taxFile: null,           // For Taxation File (Advertiser & Seller)
        imageFile: null,         // For profile image
    });

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: files[0] // Only take the first file
        }));
    };

    const registerUser = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
    
        // Append text fields
        formData.append('username', data.username);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('role', data.role);
    
        // Append files if they exist
        if (data.idFile) formData.append('idFile', data.idFile);
        if (data.certificatesFile) formData.append('certificatesFile', data.certificatesFile);
        if (data.taxFile) formData.append('taxFile', data.taxFile);
        if (data.imageFile) formData.append('imageFile', data.imageFile);
    
        // Append Tourist-specific fields
        if (data.role === 'Tourist') {
            formData.append('mobileNumber', data.mobileNumber);
            formData.append('nationality', data.nationality);
            formData.append('job', data.job);
            formData.append('dateOfBirth', data.dateOfBirth);
        }
    
        try {
            const response = await axios.post('http://localhost:4000/users/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                toast.success('Registration Successful');
                const userId = response.data.userId; // Assuming the userId is in the response
    
                // Check if the user is a TourGuide, Advertiser, or Seller
                if (['TourGuide', 'Advertiser', 'Seller'].includes(data.role)) {
                    // Show message indicating approval is pending
                    toast.info('Your registration is pending approval from an admin. You will be notified once approved.');
                    
                    // Redirect the user to the home page or a pending approval page
                    navigate(`/pending-approval`);
                } else {
                    // If the user is a Tourist, navigate to the Tourist home page
                    navigate(`/tourist-home`);
                }
            }
        } catch (error) {
            console.error(error);
          //  toast.error(`Registration failed. Please try again. ${error.response?.data?.error || error.message}`);
        }
    };
        

    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const previewImage = (e) => {
        const { name, files } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: files[0]
        }));
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={registerUser}>
                <h1 className="register-title">Create an account</h1>

                <div className="register-formGroup">
                    <label className="register-label">Role</label>
                    <select className="register-dropdownlist" name="role" value={data.role} onChange={handleChange} required>
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

                {/* Tourist-specific fields */}
                {data.role === 'Tourist' && (
                    <>
                        <div className="register-formGroup">
                            <label className="register-label"><FaMobileScreen/> Mobile</label>
                            <input className="register-input"
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
                            <input className="register-input"
                                type="text"
                                placeholder="Enter your nationality"
                                value={data.nationality}
                                name="nationality"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="register-formGroup">
                            <label className="register-label"><MdOutlineWorkOutline /> Job</label>
                            <input className="register-input"
                                type="text"
                                placeholder="Enter your job"
                                value={data.job}
                                name="job"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="register-formGroup">
                            <label className="register-label"><BsCalendarDate /> Date of Birth</label>
                            <input className="register-input"
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

                {/* File uploads based on role */}
                {(data.role === 'Seller' || data.role === 'TourGuide' || data.role === 'Advertiser') && (
                    <>
                        <div className="register-formGroup">
                            <label className="register-label">Upload Profile Image</label>
                            <div className="image-upload" onClick={() => document.getElementById('imageFileInput').click()}>
                                {data.imageFile ? (
                                    <div className="image-preview">
                                        <img
                                            src={URL.createObjectURL(data.imageFile)}
                                            alt="Profile Preview"
                                            className="profile-image"
                                        />
                                    </div>
                                ) : (
                                    <div className="image-placeholder">
                                        <span>Click to upload</span>
                                    </div>
                                )}
                            </div>

                            <input
                                type="file"
                                id="imageFileInput"
                                name="imageFile"
                                accept=".jpg,.jpeg,.png"
                                onChange={previewImage}
                                style={{ display: 'none' }} // Hide the default file input
                                required
                            />
                        </div>
                        <div className="register-formGroup">
                            <label className="register-label">Upload ID File</label>
                            <input className="registerr-input"
                                type="file"
                                name="idFile"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={handleFileChange}
                                required
                            />
                        </div>
                    </>
                )}

                {/* TourGuide-specific file upload */}
                {data.role === 'TourGuide' && (
                    <div className="register-formGroup">
                        <label className="register-label">Upload Certificates</label>
                        <input className="registerr-input"
                            type="file"
                            name="certificatesFile"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFileChange}
                        />
                    </div>
                )}

                {/* Advertiser and Seller-specific file upload */}
                {(data.role === 'Advertiser' || data.role === 'Seller') && (
                    <div className="register-formGroup">
                        <label className="register-label">Upload Tax File</label>
                        <input className="registerr-input"
                            type="file"
                            name="taxFile"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFileChange}
                        />
                    </div>
                )}

<button type="submit" className="register-button">
    <span className="register-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M8 10v-5l8 7-8 7v-5h-8v-4h8zm2-8v2h12v16h-12v2h14v-20h-14z" fill="white" />
        </svg>
    </span>
    Register
</button>



            </form>
        </div>
    );
}

export default Register;
