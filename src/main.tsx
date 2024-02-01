import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes/routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from './contexts/themeContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
    <ToastContainer/>
  </React.StrictMode>,
)
