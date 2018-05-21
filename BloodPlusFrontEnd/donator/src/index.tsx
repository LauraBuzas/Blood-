import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'font-awesome/css/font-awesome.min.css';
import Multistep from './donation_form/MultiStep'

import BloodStock from '../src/Components/Doctor/BloodStock/BloodStock'
ReactDOM.render(
<BloodStock />,
 document.getElementById('root') as HTMLElement
);
registerServiceWorker();
