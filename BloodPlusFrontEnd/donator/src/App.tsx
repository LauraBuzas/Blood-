import * as React from 'react';
import './App.css';
import './css/Management.css'
import {HomePage} from './Components/HomePage/HomePage';
import {Footer} from './Components/Footer/Footer';
import { HBox, VBox } from 'react-stylesheet';
import './css/TextField.css';
import Alert from 'react-s-alert';
import { BrowserRouter as Router , Redirect } from 'react-router-dom'
import { Header } from './Components/Header/Header';
import { CenterAdmin } from './Components/MedicalCenter/CenterAdmin/CenterAdmin';
import { Body } from './Components/Body/Body';
import { AccountService } from './Services/AccountServices';
import {ModalDoctorRequest} from './Components/Modal/ModalDoctorRequest';
import { DoctorRequest } from './Components/Doctor/DoctorRequest/DoctorRequest';
import { CenterRequest } from './Components/MedicalCenter/CenterRequests/CenterRequests';
import { WebSocketService } from './Services/WebSocketService';
//import {Cookies} from 'universal-cookie';
import cookie from 'react-cookies';
import { Marker } from './Components/Map/Map';



export interface AppProps
{

}
interface AppState
{
  role:string;
  isLoggedIn:boolean;
  webSocket:WebSocketService;
}

export class App extends React.Component<AppProps,AppState> {
  constructor(props:AppProps)
  {
        super(props);
        this.state=
        {
          role: 'Guest',
          isLoggedIn: false,
          webSocket: null
        }
        this.setRoleInApp=this.setRoleInApp.bind(this);
        
  }

  

  async setRoleInApp(event:any)
  {
    
    localStorage.setItem("role",event);
    this.setState({isLoggedIn:true});
  }

  async logout()
  {
      await this.state.webSocket.unsubscribeToAGroup(this.state.role);
      AccountService.logoutUser().then(()=>{
         // const cookies = new Cookies();
          if(this.state.role==="DonationCenterDoctor")
            cookie.remove("CenterId",{path:"/"});
          if(this.state.role==="HospitalDoctor")
            cookie.remove("HospitalId",{path:"/"});
          localStorage.removeItem("role");
          cookie.remove(".AspNetCore.Identity.Application",{path:"/"});
          this.setState({isLoggedIn:false,role:"Guest"});
      },
      (error) => {
          Alert.error("Eroare la logout. Vă rugăm, reîncercați", {
              position: 'top-right',
              effect: 'jelly'
            });
      });
   
  }

  render() {
    var loggedIn = cookie.load('.AspNetCore.Identity.Application');
    var role = localStorage.getItem("role");
    
    if(loggedIn && role){
      if(!this.state.webSocket)
        {
          var webSocket=new WebSocketService();
          webSocket.startConnection(role);
          this.setState({webSocket:webSocket});
        }
      return(<Router >
        <div className="App">
        <Header 
              isLoggedIn={true}
              role={role} 
              logOut={this.logout.bind(this)} 
            />
            <Body setRole={(event) => this.setRoleInApp(event)} webSocket={this.state.webSocket}  />  
            <Redirect to={window.location.pathname  } />
            <Footer/>
        </div>
      </Router>)
    }

    
    return (
      <Router>
        <div className="App">
            <Header 
              isLoggedIn={false} 
              role="Guest" 
              logOut={this.logout.bind(this)} 
            />
          <Body setRole={(event) => this.setRoleInApp(event)} webSocket={this.state.webSocket}  />  
          <Footer/>
        </div>
         
      </Router>
    );
  }
}

export default App;
