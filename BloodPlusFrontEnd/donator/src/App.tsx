import * as React from 'react';
// import logo from './logo.svg';
import './App.css';
import { elastic as Menu } from 'react-burger-menu'
import './css/Menu.css'
import { HBox, VBox } from 'react-stylesheet/lib/Box';
import { AdminDoctor } from './Components/AdminDoctor/AdminDoctor'
import './css/TextField.css';
import './css/Menu.css';


// import "react-bootstrap-table/min.css";
export class App extends React.Component {

  render() {

    return (
      <div className="App">
        <div>
          <Menu disableCloseOnEsc customBurgerIcon={<img src="images/menuIcon.svg" />} itemListClassName={"menu-item"}  >
            <a id="home" className="menu-item" href="/">Home</a>
            <a id="about" className="menu-item" href="/about">About</a>
            <a id="contact" className="menu-item" href="/contact">Contact</a>
            <a className="menu-item" href="">Settings</a>
          </Menu>
        </div>
      </div>
    );
  }
}

export default App;
