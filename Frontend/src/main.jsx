import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import store from "./store/index";
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './assets/css/CustomBootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/css/globals.css';
import './assets/css/navpilltabs.css';
import './assets/css/faqsection.css';
import './assets/css/cvexamples.css';
import './assets/css/team.css';
import './assets/css/profile.css';
import './assets/css/interview.css';
import './assets/css/interview-results.css'
import './assets/css/analysis.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)