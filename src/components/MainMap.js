import React, { Component } from 'react'
import { withGoogleMap, GoogleMap } from 'react-google-maps'

const GallivantMap = withGoogleMap(props => (
  <GoogleMap
    defaultCenter={props.center}
    defaultZoom={props.zoom} />
));

export default class MainMap extends Component {
  constructor(props) {
    super(props)

    this.zoom = 7

    this.state = {
      lat: 50.0515918,
      lng: 19.9357531
    };
  }

  render() {
    const {lat, lng} = this.state;

    return(
      <div style={{width: `100%`, height: `635px`}}>
        <GallivantMap
          center={{
            lat: lat,
            lng: lng
          }}
          zoom={this.zoom}
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
        />
      </div>
    );
  }
}