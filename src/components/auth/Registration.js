import React, { Component } from 'react'
import axios from 'axios'

export default class Registration extends Component {
  constructor(props){
    super(props)

    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: ""
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
    axios.post('http://localhost:3001/registrations', 
      // pass in user obj to api and add withCredentials so that the cookie can be sent
      {
        user: {
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          email: this.state.email,
          password: this.state.password,
          password_confirmation: this.state.password_confirmation
        }
      },
      { withCredentials: true }

    ).then(response => {
      // handle registration response
      if (response.data.status === 'created'){
        this.props.handleSuccessfulAuth(response.data)
      }
      // TODO handle errors
    }).catch(error => {
      // handle registration errors if any
      console.log("registration error", error)
    })

    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} >
        <input 
          name="firstname" 
          placeholder="First Name" 
          value={this.state.firstname} 
          onChange={this.handleChange} 
          required 
        />
        <input 
          name="lastname" 
          placeholder="Last Name" 
          value={this.state.lastname} 
          onChange={this.handleChange} 
          required 
        />
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
        <input 
          type="password" 
          name="password_confirmation" 
          placeholder="Confirm Password" 
          value={this.state.password_confirmation} 
          onChange={this.handleChange} 
          required 
        />

        <button type="submit">Register</button>
      </form>
    )
  }
}