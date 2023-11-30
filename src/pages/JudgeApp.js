import { Link, useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";
import styles from '../styles.js';

function JudgeApp( { user } ) { 

    const navigate = useNavigate();
  
    return (
        <div>
            <div>
                <h1 style={styles.headingStyleApp}>
                    Welcome
                </h1>
                <div style={styles.buttonContainerStyle}>
                    <button style={styles.buttonStyleApp} onClick={() => navigate('/judge-manager/app/user')}>See users</button>
                    <button style={styles.buttonStyleApp} onClick={() => navigate('/judge-manager/app/problem')}>See problems</button>
                    <button style={styles.buttonStyleApp} onClick={() => navigate('/judge-manager/auth')}>Logout</button>
                </div>
            </div>
        </div>
    );
  }
  
  export default JudgeApp;