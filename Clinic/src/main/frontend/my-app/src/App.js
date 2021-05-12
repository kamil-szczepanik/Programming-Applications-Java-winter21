import logo from './logo.svg';
import './App.css';
import DoctorComponent from './components/DoctorComponent';
import AuthService from "./services/auth.service";
import { Component } from 'react';
// import AppointmentComponent from './components/AppointmentComponent';
import LoginComponent from './components/LoginComponent'
import MainAPP from './components/MAINAPP';
import NavigationComponent from './components/NavigationComponent'

class App extends Component {
  constructor(props){
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      showModeratorBoard:false,
      showAdminBoard:false,
      currentUser:undefined
    };
  }
  componentDidMount(){
    const user = AuthService.getCurrentUser();
    
    if (user){
      this.setState({
        currentUser:AuthService.getCurrentUser(),
        showModeratorBoard:user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN")
      });
    }
  }
  logOut(){
    AuthService.logOut();
  }
  render(){
    const {currentUser, showModeratorBoard, showAdminBoard} = this.state;
  
  return (
    <div className="App">

      <MainAPP/>

    </div>
  );
  }
}

export default App;
