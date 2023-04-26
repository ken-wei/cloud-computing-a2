import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HomeComponent from './components/Home';
import MapComponent from './components/MapComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import BookmarkComponent from './components/BookmarkComponent';
import AuthenticatedRoute from './components/AuthenticatedRoute';


class App extends React.Component {
  render() {
    return (
      <div className="TouristApp">
        
        <Router>
          <HeaderComponent />
          <Switch>
            <Route path="/login"      component={LoginComponent} />
            <Route path="/register"   component={RegisterComponent} />
            <Route path="/map"        component={MapComponent}/>
            <Route path="/home"       component={HomeComponent}/>
            <AuthenticatedRoute path="/bookmark"   component={BookmarkComponent}/>
            <Route exact path="/"     component={HomeComponent}/>
            
          </Switch>
          <FooterComponent />
        </Router>
        
      </div>
      
    ); 
  }
  // render() {
  //   return(
  //     <Switch>
  //       <Redirect exact from="/" to = "/login " />
  //       <Route path="/login" component={} />
  //     </Switch>
  //   );
  // }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
