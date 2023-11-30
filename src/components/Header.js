import { findByLabelText } from "@testing-library/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from '../styles.js';

export default function Header( { text } ) {
    const navigate = useNavigate();
    
    return (
        <div>
            <header style={styles.headContStyle}>
                <div style={{margin: 15}}>
                    <button style={styles.buttonStyleApp} onClick={() => navigate('/judge-manager/app')}>Home</button>
                    <button style={styles.buttonStyleApp} onClick={() => navigate(`/judge-manager/app/${text.toLowerCase()}`)}>{text}</button>
                </div>
                <div style={{margin: 15}}>
                    <button style={styles.buttonStyleApp} onClick={() => navigate('/judge-manager/auth')}>Logout</button>
                </div>
            </header>
        </div>
    );

}