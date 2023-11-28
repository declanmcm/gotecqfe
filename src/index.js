import React from 'react';
import ReactDOM from 'react-dom';
import { Navigate } from 'react-router';
import { HashRouter, Switch, Routes, Route } from "react-router-dom";
import './index.css';
import JudgeAuth from './pages/JudgeAuth.js';
import JudgeApp from './pages/JudgeApp.js';
import User from './pages/User.js';
import Problem from './pages/Problem.js';

document.body.style = 'background: #209e74;';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
    <Switch>
                <Route path="/gotecqfe" element={<Navigate to="/judge-manager/auth"/>}/>
                <Route path="/judge-manager/app" element={<JudgeApp/>}/>
                <Route path="/judge-manager/auth" element={<JudgeAuth/>}/>
                <Route path="/judge-manager/app/user" element={<User/>}/>
                <Route path="/judge-manager/app/problem" element={<Problem/>}/>
          </Switch>
      </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);