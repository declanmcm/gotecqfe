import { Link, useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";
import Header from '../components/Header.js';
import styles from '../styles.js';

const url = 'http://34.124.232.186:5000/admin/users/';

function UserData( { currentUser } ) {

    return (
    <div>
        <h1>{currentUser.username}</h1>
        <button style={styles.buttonStyle}>Find similar</button>
        <div style={{fontSize: '30px'}}>
            <div style={{display: 'flex', alignItems: 'stretch'}}>
                <div style={{margin: 5, flex: 1}}>
                    <p>
                        Username: {currentUser.username} <br/>
                        Full name: {currentUser.first_name == null && currentUser.last_name == null ? "None" : currentUser.first_name + currentUser.last_name}
                    </p>
                </div>
                <div style={{margin: 5, flex: 1}}>
                    <p>
                        Verified: {currentUser.is_verified ? "Yes" : "No"} <br/>
                        Email: {currentUser.email}
                    </p>
                </div>
                <div style={{margin: 5,  flex: 1}}>
                    <p>
                        Last login: {currentUser.last_login == null ? "Never" : currentUser.last_login}<br/>
                    </p>
                </div>
            </div>
            <p>
                Groups: <br/>{currentUser.groups.length == 0 ? "None" : currentUser.groups.toString()}
            </p>
            <p>
                Problems: <br/> {currentUser.solved_problem.length == 0 ? "None" : currentUser.solved_problem.toString()}
            </p>
        </div>
    </div>);
}

export default UserData;