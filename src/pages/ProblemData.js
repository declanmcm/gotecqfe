import { Link, useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";
import Header from '../components/Header.js';
import styles from '../styles.js';

const url = 'http://34.124.232.186:5000/admin/users/';

function ProblemData( { problem } ) {
    const navigate = useNavigate();

    return (
    <div>
        <h1>{problem.title}</h1>
        <button style={styles.buttonStyleApp} onClick={() => navigate(`/judge-manager/app/problem/${problem.id}`) }> Edit problem</button>
        <div style={{fontSize: '30px'}}>
            <div style={{display: 'flex', alignItems: 'stretch'}}>
                <div style={{margin: 5, flex: 1}}>
                    <p>
                        Author ID: {problem.author_id} <br/>
                        Author Name: {problem.author_name}
                    </p>
                </div>
                <div style={{margin: 5, flex: 1}}>
                    <p>
                        Created: {problem.is_verified ? "Yes" : "No"} <br/>
                        Difficulty: {problem.email}
                    </p>
                </div>
                <div style={{margin: 5,  flex: 1}}>
                    <p>
                        Time limit: {problem.time_limit}<br/>
                    </p>
                </div>
            </div>
            <p>
                Question: <br/>{problem.statement}
            </p>
        </div>
    </div>);
}

export default ProblemData;