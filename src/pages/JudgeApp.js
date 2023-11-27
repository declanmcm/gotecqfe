import { Link, useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";

function JudgeApp() { 
    
    const navigate = useNavigate();

    const headingStyle = {
        textAlign: 'center', 
        fontFamily: 'Helvetica, sans-serif', 
        fontStyle: 'oblique', 
        color: 'white', 
        paddingTop: 400, 
        fontSize: '76px'
    }

    const buttonContainerStyle = {
        display: 'flex', 
        justifyContent: 'space-around', 
        paddingLeft: 810, 
        paddingRight: 810
    }

    const buttonStyle = {
        fontSize: '30px',
        backgroundColor: '#80a1e8',
        color: 'black',
        fontFamily: 'Helvetica',
        borderRadius: 8,
        padding: 8
    }

    const handleLogout = () => {
        navigate("/judge-manager/auth")
    };
  
    return (
        <div>
            <h1 style={headingStyle}>
                Welcome
            </h1>
            <div style={buttonContainerStyle}>
                <button style={buttonStyle}>Admin page</button>
                <button style={buttonStyle} onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
  }
  
  export default JudgeApp;