import React, { Component } from 'react'
import axios from 'axios'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';


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
        this.handleSuccessfulAuth(response.data)
      }
      // TODO handle errors
    }).catch(error => {
      // handle registration errors if any
      console.log("registration error", error)
    })

    event.preventDefault()
  }

  render() {
    const {styles} = this.props
    return (
      <form className={styles.form} onSubmit={this.handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstname"
                variant="outlined"
                required
                fullWidth
                id="firstname"
                label="First Name"
                autoFocus
                value={this.state.firstname} 
                onChange={this.handleChange} 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastname"
                autoComplete="lname"
                value={this.state.lastname} 
                onChange={this.handleChange} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={this.state.email} 
                onChange={this.handleChange} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={this.state.password} 
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password_confirmation"
                label="Confirm Password"
                type="password"
                autoComplete="current-password"
                value={this.state.password_confirmation} 
                onChange={this.handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={styles.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
    )
  }
}