import * as React from 'react';
import './App.css';
import './css/Management.css'
import {AdminDoctor} from './Components/AdminDoctor/AdminDoctor'
import {HomePage} from './Components/HomePage/HomePage';
import {Footer} from './Components/Footer/Footer';
import { HBox, VBox } from 'react-stylesheet/lib/Box';
import './css/TextField.css';
import Alert from 'react-s-alert';
import { BrowserRouter as Router } from 'react-router-dom'
import { Header } from './Components/Header/Header';
import { CenterAdmin } from './Components/CenterAdmin/CenterAdmin';
import { Body } from './Components/Body/Body';
import { AccountService } from './Services/AccountServices';

export interface AppProps
{

}
interface AppState
{
  role:string;
  isLoggedIn:boolean;
}

export class App extends React.Component<AppProps,AppState> {
  constructor(props:AppProps)
  {
        super(props);
        this.state=
        {
          role:'Guest',
          isLoggedIn:false
        }
        this.setRoleInApp=this.setRoleInApp.bind(this);
  }

  setRoleInApp(event:any)
  {
    this.setState({role:event,isLoggedIn:true});
  }

  logout()
  {
      AccountService.logoutUser().then(()=>{
          this.setState({isLoggedIn:false})
          this.setState({role:"Guest"})
      },
      (error) => {
          Alert.error("Eroare la logout. Vă rugăm, reîncercați", {
              position: 'top-right',
              effect: 'jelly'
            });
      });
   
  }

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
      </div>
      <div>
      
        */}
       
       {/* <div>
      
      </div> */}
      {/* <Header />
      <HomePage />
      <Footer /> */}
      {/* <div className="tableArea">
      <AdminDoctor/> 
      </div>
      */}
      {this.state.role? <Header isLoggedIn={this.state.isLoggedIn} role={this.state.role} logOut={this.logout.bind(this)} />:null}

      <Body setRole={(event) => this.setRoleInApp(event)}  />  
      </div>

      
      </Router>
    );
  }
}

export default App;
