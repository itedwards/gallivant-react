/* global google */

import React from "react";

class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.autocompleteInput = React.createRef();
    this.autocomplete = null;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);

    this.state = {
      place: {},
      title: "",
      description: ""
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.autocompleteInput.current,
      { types: ["geocode"] }
    );
    this.autocomplete.addListener("place_changed", this.handlePlaceChanged);
  }

  handlePlaceChanged() {
    const place = this.autocomplete.getPlace();
    this.props.onPlaceChanged(place);

    this.setState({
      place: place
    })
  }

  handleChange() {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit(event){
    const { place } = this.state

    axios.post('http://localhost:3001/pins', 
      // pass in pin obj to api
      {
        pin: {
          lat: place.geometry.location.lat,
          long: place.geometry.location.long,
          title: this.state.title,
          description: this.state.description
        }
      }
    ).then(response => {
      // handle registration response
      if (response.data.created){
        console.log("pin created", response.data.pin)
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
      <div className="my-2">
        <h3>Add New Pin</h3>
        <form className="my-4">
          <input
            ref={this.autocompleteInput}
            className="form-control mb-2"
            id="autocomplete"
            placeholder="Enter place"
            type="text"
          />
          <input 
            type="text"
            placeholder="Title"
            className="form-control mb-2"
            name="title"
            value={this.state.title} 
            onChange={this.handleChange} 
            required
          />
          <textarea
            className="form-control mb-2"
            placeholder="Description"
            rows="3"
            name="description"
            value={this.state.description} 
            onChange={this.handleChange} 
            required
          >
          </textarea>
          <button type="submit" className="form-control btn btn-primary mb-2">Add Pin</button>
        </form>
      </div>
      
      
    );
  }
}

export default Autocomplete;
