import { Link, useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";

function JudgeAuth() { 
    
    const navigate = useNavigate();

    const pageStyle = {
        minHeight: '100vh', // Ensure the page takes at least the full height of the viewport
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const headingStyle = {
        textAlign: 'center', 
        fontFamily: 'Helvetica, sans-serif', 
        fontStyle: 'oblique', 
        color: 'black', 
        fontSize: '68px'
    }
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        navigate("/judge-manager/app")
    };
    
    const containerStyle = {
        width: '20%',
        height: '500px',
        backgroundColor: '#e5f2dc',
        padding: '20px',
    }

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '300px',
        margin: 'auto',
        marginTop: '50px',
        fontSize: '24px'
    };

    const inputStyle = {
        margin: '8px',
        padding: '10px',
        width: '100%',
        boxSizing: 'border-box',
    };

    const buttonStyle = {
        backgroundColor: '#80a1e8',
        color: 'white',
        padding: '10px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    };
  
    return (
        <div style={pageStyle}>
            <div style={containerStyle}>
                <h1 style={headingStyle}>
                    Login
                </h1>
                <form style={formStyle}>
            <label htmlFor="username">Username:</label>
            <input
            type="text"
            id="username"
            placeholder="Enter your username"
            style={inputStyle}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="password">Password:</label>
            <input
            type="password"
            id="password"
            placeholder="Enter your password"
            style={inputStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            <button type="button" style={buttonStyle} onClick={handleLogin}>
            Login
            </button>
        </form>
            </div>
        </div>
    );
  }
  
  export default JudgeAuth;