import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import CookieConsent from './components/CookieConsent';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <CookieConsent />
    </BrowserRouter>
  );
}

export default App;
