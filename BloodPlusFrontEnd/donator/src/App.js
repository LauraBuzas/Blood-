import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {elastic as Menu} from 'react-burger-menu'
import './css/Menu.css'
import {SignUp} from './main_components/sign_up'
import { LogIn } from './main_components/log_in';
import { HBox, VBox } from 'react-stylesheet/lib/Box';

class App extends Component {
  render() {
    return (
      <div className="App">
        {
          
          /* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
      <Menu disableCloseOnEsc  customBurgerIcon={ <img src="images/menuIcon.svg" />} itemListClassName={ "menu-item" }  >
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="about" className="menu-item" href="/about">About</a>
        <a id="contact"className="menu-item" href="/contact">Contact</a>
        <a className="menu-item"href="">Settings</a>
       </Menu>
       <HBox>
       <LogIn className="col-md-6 right-side"/>
       <VBox> 
         <img alt='heart' src="./cardiogram.png"/>
       </VBox>
       <SignUp className="col-md-6 left-side"/>
       </HBox>
      </div>
    );
  }
}

export default App;
