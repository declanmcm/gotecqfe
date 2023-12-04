import { Link, useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";
import Header from '../components/Header.js';
import styles from '../styles.js';

const url = 'http://34.124.232.186:5000/admin/users/';

function ProblemData( { user, problem, hidden, setHidden } ) {
    const navigate = useNavigate();

    function toggleHidden() {
        if (hidden) window.localStorage.setItem('hidden', 'true');
        else window.localStorage.setItem('hidden', 'false');
        setHidden(!hidden);
    }

    useEffect(() => {
        let storedHidden = window.localStorage.getItem('hidden');
        setHidden(storedHidden != "true");
    }, []);

    return (
    <div>
        <h1>{problem.title}</h1>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
            <button style={styles.buttonStyleApp} onClick={() => navigate(`/judge-manager/app/problem/${problem.id}`) }> Edit problem</button>
            <button style={styles.buttonStyleApp} onClick={toggleHidden}> {hidden ? 'Show' : 'Hide'} submission </button>
        </div>
        {hidden == false ? <div style={{fontSize: '30px'}}>
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
        </div> : null}
    </div>);
}

export default ProblemData;