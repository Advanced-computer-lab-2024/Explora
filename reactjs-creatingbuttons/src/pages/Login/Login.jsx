import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import '../Login/Login.css'



const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: '',
        password: ''
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        const { username, password } = data;
        
        try {
            const response = await axios.post('http://localhost:4000/users/login', {
                username,
                password
            });

            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                setData({ username: '', password: '' });
                
                // Get user role using username
                const roleResponse = await axios.post(`http://localhost:4000/users/role/${username}`);
                const role = roleResponse.data.role; // assuming role is returned as `data.role`

                if (role === 'Tourist') {
                    navigate('/tourist-home');
                } else if (role === 'Admin') {
                    navigate('/acc-settings');
                } else if (role === 'Seller') {
                    navigate('/seller-home');
                } else if (role === 'Advertiser') {
                    navigate('/company');
                } else if (role === 'TourGuide') {
                    navigate('/to-do');
                } else if (role === 'Governor') {
                    navigate('/');
                } else {
                    toast.error('Role not found');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Invalid credentials ' + error.message);
        }
    };
    
    const handleSignin = () => {
        navigate('/register');
    }

    return (
        <div className="container-login">
            <form className='form-login'>
                <div className="formGroup-login">
                    <label className='label-login' htmlFor="username">< CgProfile/> Username</label>
                    <input type="text" placeholder="Enter your username" className="form-control-login" id="username" value={data.username} onChange={(e) => setData({...data, username: e.target.value })} />
                </div>
                <div className="formGroup-login">
                    <label className='label-login' htmlFor="password"><RiLockPasswordFill /> Password: </label>
                    <input type="password" placeholder="Enter your Password" className="form-control-login" id="password" value={data.password} onChange={(e) => setData({...data, password: e.target.value })} />
                </div>
                <button type="submit" className="submit-login" onClick={handleLogin}>Login</button>
                <a href="/forgot-password" style={{color: '#028090'}}>Forgot Password?</a>
            </form>
                
        </div>
    );
};

export default Login;
