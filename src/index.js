import React from 'react';
import ReactDOM from 'react-dom';
import { Navigate } from 'react-router';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import JudgeAuth from './pages/JudgeAuth.js';
import JudgeApp from './pages/JudgeApp.js';

document.body.style = 'background: #209e74;';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/judge-manager/auth"/>}/>
                <Route path="/judge-manager/app" element={<JudgeApp/>}/>
                <Route path="/judge-manager/auth" element={<JudgeAuth/>}/>
            </Routes>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);