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
import './bootstrap-3.3.7/bootstrap_node.css';
import './App.css';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
