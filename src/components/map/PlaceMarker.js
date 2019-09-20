import React from 'react'
import { Marker } from 'react-google-maps'
import PinInfoWindow from './PinInfoWindow'

export default class PlaceMarker extends React.Component {
  constructor(props) {
    super(props)

     this.state = {
      showTooltip: false
    }
  }

  clickTooltip() {
    this.setState({ showTooltip: !this.state.showTooltip })
  }

  closeWindow() {
    this.setState({ showTooltip: false })
  }

  render() {
    const {showTooltip} = this.state
    const {lat, lng, name, description} = this.props

    return(
      <Marker
        position={{
          lat: parseFloat(lat),
          lng: parseFloat(lng)
        }}

        onClick={this.clickTooltip.bind(this)}>
        {showTooltip && (
          <PinInfoWindow description={description}
                           name={name}
                           closeWindow={this.closeWindow.bind(this)} />
          
        )}
      </Marker>
    );
  }
}