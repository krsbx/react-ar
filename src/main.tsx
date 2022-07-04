import React from 'react';
import 'aframe';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider>
    <div className="App">
      <App />
    </div>
  </ChakraProvider>
);
