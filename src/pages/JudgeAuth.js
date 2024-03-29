import { Link, useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";
import styles from '../styles.js';

const url = 'https://34.124.232.186:5000/login/';

function JudgeAuth( { user, setUser } ) { 
    
    const navigate = useNavigate();
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [failedLogin, setFailedLogin] = useState(false);
    const [token, setToken] = useState('');

    useEffect(() => {
        window.localStorage.setItem('token', token);
      }, [token]);

    async function sendLoginDetails() {
        let json = {};
        try {
            const data = { 'username': username, 'password': password };
            const response = await fetch(url, {
                method: "POST",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
        });
        json = await response.json();
        console.log(json);

        if (json.error == "none") {
            setUser(json.data);
            setToken(json.data.token);
            navigate("/judge-manager/app")
        } else {
            setFailedLogin(true);
        }
      } catch (e) {
        console.log(e);
      }
      return json;
    }
  
    return (
        <div style={styles.pageStyle}>
            <div style={styles.containerAuthStyle}>
                <h1 style={styles.headingStyle}>
                    Login
                </h1>
                <form style={styles.formStyle}>
            <label htmlFor="username">Username:</label>
            <input
            type="text"
            id="username"
            placeholder="Enter your username"
            style={styles.inputStyle}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="password">Password:</label>
            <input
            type="password"
            id="password"
            placeholder="Enter your password"
            style={styles.inputStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            {failedLogin ? <p style={{color: 'red', fontSize: '13px'}}>Incorrect username or password</p> : null}

            <button type="button" style={styles.buttonStyle} onClick={sendLoginDetails}>
            Login
            </button>
        </form>
            </div>
        </div>
    );
  }
  
  export default JudgeAuth;