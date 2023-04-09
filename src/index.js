import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { FirebaseContext } from './store/FirebaseContext';
import Context from './store/FirebaseContext';
import {db} from './firebase/config'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 

 <React.StrictMode>
   <FirebaseContext.Provider value={{db}}>
  <Context>
  <App />
  </Context>
  </FirebaseContext.Provider>
    
  </React.StrictMode>
);   

