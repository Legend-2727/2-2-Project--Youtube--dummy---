import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Subscriptionvideo from './components/Subscriptionvideo';
import {Route,Routes,BrowserRouter as Router} from 'react-router-dom'
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Signin from './components/Signin';
import Watchlater from './components/Watchlater';
import Uploadvideo from './components/Uploadvideo';
import {store,persistor} from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Resultcontextprovider } from './contextprovider/context';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Resultcontextprovider>
      <App/>
      </Resultcontextprovider>
   </PersistGate>
   </Provider>
   
    
   
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
