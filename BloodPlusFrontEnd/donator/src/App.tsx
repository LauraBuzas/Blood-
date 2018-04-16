import * as React from 'react';
import './App.css';
//import { elastic as Menu } from 'react-burger-menu'

import './css/Management.css'
import {AdminDoctor} from './Components/AdminDoctor/AdminDoctor'
<<<<<<< HEAD
import {HomePage} from './Components/HomePage/HomePage';
import {Footer} from './Components/Footer/Footer';
=======
import { HBox, VBox } from 'react-stylesheet/lib/Box';
import './css/TextField.css';
//import './css/Menu.css';

import { BrowserRouter as Router } from 'react-router-dom'
import { Header } from './Components/Header/Header';
import { LogIn } from './main_components/LogIn';
import { SignUp } from './main_components/SignUp';
>>>>>>> development

// import "react-bootstrap-table/min.css";
export class App extends React.Component {

  render() {

    return (
      <Router>
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> 
        
        <Menu disableCloseOnEsc  customBurgerIcon={ <img src="images/menuIcon.svg" />} itemListClassName={ "menu-item" }  >
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="about" className="menu-item" href="/about">About</a>
        <a id="contact"className="menu-item" href="/contact">Contact</a>
        <a className="menu-item"href="">Settings</a>
       </Menu>
<<<<<<< HEAD
      </div>
      <div>
      <HomePage />
      <Footer />
=======
        */}
       
       {/* <div>
      
      </div> */}
      <Header />
      <div className="tableArea">
      <AdminDoctor/>
>>>>>>> development
      </div>
      </div>

      
      </Router>
    );
  }
}

export default App;
