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
      <div className={styles.paper}>
        <Avatar className={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={styles.form} onSubmit={this.handleSubmit} noValidate>
          <TextField
            type="email" 
            name="email"
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            value={this.state.email} 
            onChange={this.handleChange} 
            autoFocus
            required 
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={this.state.password} 
            onChange={this.handleChange} 
            required 
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={styles.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    )
  }
}