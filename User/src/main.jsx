import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
// import { LanguageContext } from './Language'; // Correct import

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <LanguageContext> */}
      <App />
    {/* </LanguageContext> */}
  </StrictMode>
);
