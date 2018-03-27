import * as React from 'react';
// import logo from './logo.svg';
import './App.css';
import {elastic as Menu} from 'react-burger-menu'
import './css/Menu.css'
import {AdminDoctor} from './Components/AdminDoctor/AdminDoctor'

// import "react-bootstrap-table/min.css";
export class App extends React.Component {
  
  render() {
   
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
       
       <div>
      <Menu disableCloseOnEsc  customBurgerIcon={ <img src="images/menuIcon.svg" />} itemListClassName={ "menu-item" }  >
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="about" className="menu-item" href="/about">About</a>
        <a id="contact"className="menu-item" href="/contact">Contact</a>
        <a className="menu-item"href="">Settings</a>
       </Menu>
      </div>
      <div>
      <AdminDoctor/>
      </div>
      </div>
    );
  }
}

export default App;
