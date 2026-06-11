import React from 'react'
import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./i18n";

import store from "./store/index";
import App from './App.jsx'

import "./assets/css/index.css";
import "./assets/css/cv-builder.css";
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import './assets/css/CustomBootstrap.css';
import './assets/css/globals.css';
import './assets/css/navpilltabs.css';
import './assets/css/faqsection.css';
import './assets/css/cvexamples.css';
import './assets/css/team.css';
import './assets/css/profile.css';
import './assets/css/interview.css';
import './assets/css/interview-results.css'
import './assets/css/analysis.css';
import './assets/css/my-interviews.css'
import './assets/css/darkmode.css'
import "./assets/css/cv-modal.css";
import "./assets/css/arab.css";
import "./assets/css/floating.css";


ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        
        <App />

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '14px',
              borderRadius: '12px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
            },
            success: {
              iconTheme: { primary: '#2E8B73', secondary: '#fff' },
            },
            error: {
              iconTheme: { primary: '#e53e3e', secondary: '#fff' },
            },
          }}
        />

      </BrowserRouter>
    </Provider>
  </StrictMode>,
)