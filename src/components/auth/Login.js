import React, { Component } from 'react'
import axios from 'axios'

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
      <form onSubmit={this.handleSubmit} >
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={this.state.email} 
          onChange={this.handleChange} 
          required 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={this.state.password} 
          onChange={this.handleChange} 
          required 
        />

        <button type="submit">Register</button>
      </form>
    )
  }
}