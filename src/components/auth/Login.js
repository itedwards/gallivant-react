import React, { Component } from 'react'
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

import '../../style/auth.scss'

export default class Login extends Component {
  constructor(props){
    super(props)

    this.state = {
      email: "",
      password: "",
      loginErrors: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
  }

  handleSuccessfulAuth(data) {
    // update parent app component
    this.props.handleLogin(data)

    // redirect - props from router available allow to move to new page
    this.props.history.push('/dashboard')
    
  }

  handleChange(event){
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit(event){
    axios.post('http://localhost:3001/sessions', 
      // pass in user obj to api and add withCredentials so that the cookie can be sent
      {
        user: {
          email: this.state.email,
          password: this.state.password,
        }
      },
      { withCredentials: true }

    ).then(response => {
      // handle registration response
      if (response.data.logged_in){
        this.handleSuccessfulAuth(response.data)
      }
      // TODO handle errors
    }).catch(error => {
      // handle registration errors if any
      console.log("login error", error)
    })

    event.preventDefault()
  }

  render() {
    const {styles} = this.props
    return (
      <div class="signin-div">
        <form class="form-signin" onSubmit={this.handleSubmit}>
          <img class="mb-4" src="/docs/4.3/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
          <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>

          <label for="inputEmail" class="sr-only">Email address</label>
          <input 
            type="email" 
            id="inputEmail"
            class="form-control"
            name="email" 
            placeholder="Email" 
            value={this.state.email} 
            onChange={this.handleChange} 
            required 
            autofocus
          />

          <label for="inputPassword" class="sr-only">Password</label>
          <input 
            type="password" 
            id="inputPassword" 
            class="form-control" 
            placeholder="Password"
            type="password" 
            name="password" 
            value={this.state.password} 
            onChange={this.handleChange} 
            required
          />

          <div class="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me 
            </label>
          </div>

          <a href="/registration">Sign up</a>

          <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
          <p class="mt-5 mb-3 text-muted">© 2019</p>
        </form>
      </div>

    )
  }
}