import { Link, useNavigate, Routes, Route  } from "react-router-dom";
import { Navigate } from 'react-router';
import {useState, useEffect} from "react";
import JudgeAuth from './pages/JudgeAuth.js';
import JudgeApp from './pages/JudgeApp.js';
import List from './pages/List.js';
import ProblemEditor from './pages/ProblemEditor.js';

function App() {
    const [user, setUser] = useState(null);
    console.log(user);

    return (
        <Routes>
                <Route path="/" element={<Navigate to="/judge-manager/auth"/>}/>
                <Route path="/judge-manager/app" element={<JudgeApp user={user} />}/>
                <Route path="/judge-manager/auth" element={<JudgeAuth user={user} setUser={setUser} />}/>
                <Route path="/judge-manager/app/user" element={<List user={user} type='user' />}/>
                <Route path="/judge-manager/app/problem" element={<List user={user} type='problem' />}/>
                <Route path="/judge-manager/app/problem/:id" element={<ProblemEditor user={user} />} />
        </Routes>
    );
}

export default App;