import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRunning, faMapMarkedAlt, faWallet, faAngleLeft, faAngleRight, faBan, faSearch, faCheck, faBell, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle, faCalendarAlt, faEye, faUser } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasFaStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farFaStar } from '@fortawesome/free-regular-svg-icons';

library.add(faRunning, faMapMarkedAlt, faWallet, faAngleLeft, faAngleRight, faBan, faSearch, faCheck, faBell, faEnvelope, faUserCircle, faCalendarAlt, fasFaStar, farFaStar, faEye, faUser);

let localStorageVals = null;

if (localStorage.getItem('token')) {
  localStorageVals = {
    isLoggedIn: true,
    token: localStorage.getItem('token'),
    userInfo: JSON.parse(localStorage.getItem('userInfo')),
  }
}

ReactDOM.render(<BrowserRouter>
    <App userProps={localStorageVals} />
  </BrowserRouter>,
  document.getElementById('root'));