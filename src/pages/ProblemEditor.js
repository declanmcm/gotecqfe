import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from '../components/Header.js';
import styles from '../styles.js';

function ProblemEditor({ user }) {

    const id = useParams().id;
    const [problem, setProblem] = useState({
        display_id: "",
        is_visible: false,
        title: "",
        statement: "",
        difficulty: "Easy",
        source: "",
        sample_test: "",
        file: "",
        time_limit: "",
        total_submission: "",
        correct_submission: "",
        statistic_info: ""
    });
    const [error, setError] = useState(null);
    const [token, setToken] = useState('');

    useEffect(() => {
        const storedToken = window.localStorage.getItem('token');
        if ( storedToken !== null ) setToken(storedToken);
        console.log(storedToken);

        const fetchData = async () => {
            let data = null;
            try {
                const response = await fetch('http://34.124.232.186:5000/admin/problem', {
                    method: "GET",
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Token " + storedToken}});
                data = await response.json();
                data.data.forEach(item => {
                    if (item.id == parseInt(id)) {
                        console.log(item);
                        setProblem(item);
                    }
                });
                console.log(data);
            } catch (error) {
                console.error("Error fetching sample", error);
            } finally {
                
            }
        };

        if (id != "new") fetchData();

        }, []);

    async function postProblem() {
        let method = "PUT";
        let toAppend = id;
        if (id == "new") {
            method = "POST";
            toAppend = "";
        }

        console.log(JSON.stringify(problem));

        try {
            let data = new FormData();

            Object.entries(problem).forEach(([key, value]) => {
                data.append(key, value);
            });
            console.log(data);

            const response = await fetch("http://34.124.232.186:5000/admin/problem/" + toAppend, {
                method: method,
                headers: {
                'Authorization': "Token " + token
                },
                body: data
            });
            let json = await response.json();
            console.log(json);
            if (json.error != 'none') {
                setError(json.data);
            }
        } catch (e) {
            console.log(e);
            setError(e.data);
        }
    }
    
    return (
        <div>
            <Header text='Problem'/>
            <h1 style={styles.headingStyleProblem}>{id == "new" ? "Create new problem" : "Edit problem"}</h1>
            <form onsubmit="return false;">
                <fieldset style={styles.formStyleProblem}>
                    <div>
                        <label>
                            Display id
                        </label>
                        <div>
                            <input value={problem.display_id} style={{width: '40%', fontSize: '24px'}} name="display_id" type="text" onChange={(e) => setProblem({...problem, display_id: e.target.value})}/>
                        </div>
                    </div>
                    <div>
                        <label>
                            Is visible
                        </label>
                        <div>
                            <input checked={problem.is_visible} type="checkbox" name="is_visible" onChange={(e) => setProblem({...problem, is_visible: e.target.value})}/>
                        </div>
                    </div>
                    <div>
                        <label>
                            Title
                        </label>
                        <div>
                            <input value={problem.title} style={{width: '40%', fontSize: '24px'}} name="title" type="text" onChange={(e) => setProblem({...problem, title: e.target.value})}/>
                        </div>
                    </div>
                    <div>
                        <label>
                            Statement
                        </label>
                        <div>
                            <textarea value={problem.statement} style={{width: '75%', height: '150px', fontSize: '18px'}} name="statement" onChange={(e) => setProblem({...problem, statement: e.target.value})}></textarea>
                        </div>
                    </div>
                    <div>
                        <label>
                            Difficulty
                        </label>
                        <div>
                            <select value={problem.difficulty} name="difficulty" onChange={(e) => setProblem({...problem, difficulty: e.target.value})}>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label>
                            Source
                        </label>
                        <div>
                            <textarea value={problem.source} style={{width: '55%', height: '150px'}} name="source" onChange={(e) => setProblem({...problem, source: e.target.value})}></textarea>
                        </div>
                    </div>
                    <div>
                        <label>
                            Sample test
                        </label>
                        <div>
                        <textarea value={JSON.stringify(problem.sample_test)} style={{width: '55%', height: '150px'}} name="sample_test" onChange={(e) => {console.log(e); setProblem({...problem, sample_test: e.target.value??'123123'});}}>null</textarea>
                        </div>
                    </div>
                    <div>
                        <label>
                            Test zip
                        </label>
                        <div>
                            <input value={problem.file} name="test_zip" type="file" onChange={(e) => setProblem({...problem, test_zip: e.target.value})}/>
                        </div>
                    </div>
                    <div>
                        <label>
                            Time limit
                        </label>
                        <div>
                            <input value={parseInt(problem.time_limit)} name="time_limit"  type="number" onChange={(e) => setProblem({...problem, time_limit: e.target.value})}/>
                        </div>
                    </div>
                    <div>
                        <label>
                            Memory limit
                        </label>
                        <div>
                            <input value={parseInt(problem.memory_limit)} name="memory_limit"  type="number" onChange={(e) => setProblem({...problem, memory_limit: e.target.value})}/>
                        </div>
                    </div>
                    <div>

                        <label>
                            Total submission
                        </label>
                        <div>
                            <input value={parseInt(problem.total_submission)} name="total_submission"  type="number" onChange={(e) => setProblem({...problem, total_submission: e.target.value})}/>
                        </div>
                    </div>
                    <div>
                        <label>
                            Correct submission
                        </label>
                        <div>
                            <input value={parseInt(problem.correct_submission)} name="correct_submission"  type="number" onChange={(e) => setProblem({...problem, correct_submission: e.target.value})}/>
                        </div>
                    </div>
                    <div>
                        <label>
                            Statistic info
                        </label>
                        <div>
                            <textarea value={JSON.stringify(problem.statistic_info)} name="statistic_info" onChange={(e) => setProblem({...problem, statistic_info: e.target.value})}>null</textarea>
                        </div>
                    </div>
                    <div>
                        <button onClick={(e) => {e.preventDefault(); postProblem();}}>Save</button>
                        <p style={{fontSize: '20px', color: 'red'}}>{error != null ? error : null}</p>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}

export default ProblemEditor;