import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <div className="App">
        <div className="container">
          <App />
        </div>
      </div>
    </ChakraProvider>
  </React.StrictMode>
);
