import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './icons/fontawesome.css';
import './icons/ionicons.css';
import './icons/linearicons.css';
import './icons/open-iconic.css';
import './icons/pe-icon-7-stroke.css';
import './icons/icofont.css';
import './icons/bips-icon/css/bips-icon.css';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import './semantic-dist/semantic.min.css';
import './bootstrap-3.3.7/bootstrap/dist/css/bootstrap_node.css';
import './App.css';

import './bootstrap-3.3.7/ag-grid-community/dist/styles/ag-grid.css';
import './bootstrap-3.3.7/ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import {LicenseManager} from 'ag-grid-enterprise';
LicenseManager.setLicenseKey("Evaluation_License-_Not_For_Production_Valid_Until_12_November_2019__MTU3MzUxNjgwMDAwMA==1f1bbf4b9b4096333a140d70a78b3fd6");

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
