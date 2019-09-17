import React from 'react'
import { InfoWindow } from 'react-google-maps'

export default  class PinInfoWindow extends React.Component {
  render() {
    const {description, name} = this.props

    return(
      <InfoWindow onCloseClick={this.props.closeWindow}>
        <div>
          <h1>{name}</h1>
          <p>{description}</p>
        </div>
      </InfoWindow>
    );
  }
}