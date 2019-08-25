import React, { Component } from 'react'
import Registration from './auth/Registration';
import Login from './auth/Login';

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
  }

  handleSuccessfulAuth(data) {
    // update parent app component
    this.props.handleLogin(data)

    // redirect - props from router available allow to move to new page
    this.props.history.push('/dashboard')
    
  }

  handleLogoutClick(){
    this.props.handleLogout()
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <h1>Status: {this.props.loggedInStatus}</h1>
        <button onClick={() => this.handleLogoutClick}>Logout</button>
        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth}/>
        <Login handleSuccessfulAuth={this.handleSuccessfulAuth}/>
      </div>
    )
  }
}