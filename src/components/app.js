import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios'
import Home from './Home';
import Dashboard from './Dashboard';
import MainMap from './map/MainMap';

export default class App extends Component {
  constructor(){
    super()

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    }
    
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  checkLoginStatus() {
    axios.get('http://localhost:3001/logged_in', { withCredentials: true })
      .then(response => {
        // reconcile state with API
        if(response.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN"){
          this.setState({
            loggedInStatus: "LOGGED_IN",
            user: response.data.user
          })
        }
        else if (!response.data.logged_in && this.state.loggedInStatus === "LOGGED_IN"){
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {}
          })
        }
      })
      .catch(error => {
        console.log("error", error)
      })

  }

  componentDidMount() {
    this.checkLoginStatus()
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    })
  }

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    })
  }

  render() {
    return (
      <div className='app'>
        <BrowserRouter>
          <Switch>
            <Route 
              exact 
              path={"/"} 
              render={props => (
                <Home {... props } handleLogin={this.handleLogin} handleLogout={this.handleLogout} loggedInStatus={this.state.loggedInStatus} />
              )} 
            />
            <Route 
              exact 
              path={"/dashboard"} 
              render={props => (
                <MainMap {... props } loggedInStatus={this.state.loggedInStatus} />
              )} 
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
