import React, { Component } from 'react'
import axios from 'axios'

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
        this.props.handleSuccessfulAuth(response.data)
      }
      // TODO handle errors
    }).catch(error => {
      // handle registration errors if any
      console.log("login error", error)
    })

    event.preventDefault()
  }

  render() {
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