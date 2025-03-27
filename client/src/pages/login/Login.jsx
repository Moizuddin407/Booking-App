import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook to navigate
import "../login/Login.css";

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });

    const { user, loading, error, dispatch } = useContext(AuthContext);
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleChange = (e) => {
        setCredentials((prev) => ({
            ...prev,
            [e.target.id]: e.target.value
        }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("/auth/login", credentials);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

            // Redirect to home page ("/") after successful login
            navigate("/"); // Use navigate to redirect

        } catch (e) {
            dispatch({ type: "LOGIN_FAILURE", payload: e.response.data });
        }
    };

    return (
        <div className='login'>
            <div className="lContainer">
                <input
                    type="text"
                    placeholder='username'
                    id='username'
                    onChange={handleChange}
                    className="lInput"
                />
                <input
                    type="password"
                    placeholder='password'
                    id='password'
                    onChange={handleChange}
                    className="lInput"
                />
                <button 
                    onClick={handleClick} 
                    className="lButton" 
                    disabled={loading} // Disable the button if loading is true
                >
                    Login
                </button>
                {error && <span>{error.message}</span>}
            </div>
        </div>
    );
};

export default Login;
