import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps'
import Navbar from '../Navbar';
import PlaceMarker from './PlaceMarker';
import axios from 'axios';

const GallivantMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapMounted}
    onZoomChanged={props.handleMapChanged}
    onDragEnd={props.handleMapChanged}
    onBoundsChanged={props.handleMapFullyLoaded}
    defaultCenter={props.center}
    defaultZoom={props.zoom} >
    {
      props.pins.length > 0 && props.pins.map(pin => (
        <PlaceMarker key={pin.id}
                     lat={pin.latitude}
                     lng={pin.longitude}
                     description={pin.description}
                     name={pin.name} />
      ))
    }
  </GoogleMap>
));

export default class MainMap extends Component {
  constructor(props) {
    super(props)

    this.xMapBounds = { min: null, max: null }
    this.yMapBounds = { min: null, max: null }

    this.mapFullyLoaded = false
    this.zoom = 7

    this.state = {
      lat: 50.0515918,
      lng: 19.9357531,
      pins: []
    };
  }

  handleMapChanged() {
    this.getMapBounds()
    this.setMapCenterPoint()
    this.fetchPlacesFromApi()
  }

  handleMapMounted(map) {
    this.map = map
  }

  handleMapFullyLoaded() {
    if (this.mapFullyLoaded)
      return

    this.mapFullyLoaded = true
    this.handleMapChanged()
  }

  setMapCenterPoint() {
    this.setState({
      lat: this.map.getCenter().lat(),
      lng: this.map.getCenter().lng()
    })
  }

  fetchPlacesFromApi() {
    // const pin = <PlaceMarker lat={50.0515918} lng={19.9357531} name={"Hotel"} description={"Hotel desc"} />
    this.setState({ pins: [] })

    axios.get(`http://localhost:3001/pins?min_lng=${this.xMapBounds.min}&max_lng=${this.xMapBounds.max}&min_lat=${this.yMapBounds.min}&max_lat=${this.yMapBounds.max}`)
      .then(response => {
        this.setState({pins: response.data.pins})
      })
  }

  getMapBounds() {
    var mapBounds = this.map.getBounds()

    var xMapBounds = mapBounds.ja
    var yMapBounds = mapBounds.na

    this.xMapBounds.min = xMapBounds.g
    this.xMapBounds.max = xMapBounds.h

    this.yMapBounds.min = yMapBounds.g
    this.yMapBounds.max = yMapBounds.h
  }

  componentWillMount() {
    this.setState({ pins: [] })
  }

  render() {
    const {lat, lng, pins} = this.state;

    return(
      <main>
        <Navbar />
        <div style={{width: `100%`, height: `635px`}}>
          <GallivantMap
            onMapMounted={this.handleMapMounted.bind(this)}
            handleMapChanged={this.handleMapChanged.bind(this)}
            handleMapFullyLoaded={this.handleMapFullyLoaded.bind(this)}

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

            pins={pins}
          />
        </div>
        <ul>
          <li>lng: {lng}</li>
          <li>lat: {lat}</li>
          <li>xMapBounds.min: {this.xMapBounds.min}</li>
          <li>xMapBounds.max: {this.xMapBounds.max}</li>
          <li>yMapBounds.min: {this.yMapBounds.min}</li>
          <li>yMapBounds.max: {this.yMapBounds.max}</li>
        </ul>
      </main>
      
    );
  }
}