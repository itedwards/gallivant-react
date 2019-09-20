import React from 'react'
import Navbar from './Navbar';
import MainMap from './map/MainMap'
import Autocomplete from './Autocomplete'
import CardList from './CardList'

import '../style/dashboard.scss'
import axios from 'axios';

export default class Dashboard extends React.Component {
  constructor(){
    super()

    this.state = {
      place: {},
      pins: {}
    };
  }

  fetchPins(xMin, xMax, yMin, yMax) {
    axios.get(`http://localhost:3001/pins?min_lng=${xMin}&max_lng=${xMax}&min_lat=${yMin}&max_lat=${yMax}`)
      .then(response => {
        this.setState({pins : response.data.pins})
      })
      .catch(error => {
        console.log("pin load error", error)
      })
  }

  showPlaceDetails(place) {
    this.setState({ place });
  }
  
  render() {
    const AddressDetails = props => {
      return (
          <div>
            <pre>{JSON.stringify(props.place, null, 2)}</pre>
          </div>
      )
    };

    return (
      <main>
        <Navbar />
        <div className="container-fluid">
        <div className="row">
          <nav className="col-md-3 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">

              <ul className="nav nav-tabs mx-2" id="myTab" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" id="pins-tab" data-toggle="tab" href="#pins" role="tab" aria-controls="pins" aria-selected="true">Pins</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" id="addnew-tab" data-toggle="tab" href="#addnew" role="tab" aria-controls="addnew" aria-selected="false">Add New</a>
                </li>
              </ul>

              <div className="tab-content mx-2" id="myTabContent">
                <div className="tab-pane fade show active" id="pins" role="tabpanel" aria-labelledby="pins-tab">
                  <CardList pins={this.state.pins} />
                </div>
                <div className="tab-pane fade" id="addnew" role="tabpanel" aria-labelledby="addnew-tab">
                  <Autocomplete onPlaceChanged={this.showPlaceDetails.bind(this)} />
                  <AddressDetails place={this.state.place} />
                </div>
              </div>
                
            </div>
          </nav>

          <section role="main" className="col-md-8 ml-sm-auto col-lg-9 px-0" >
            <MainMap fetchPins={this.fetchPins.bind(this)} pins={this.state.pins} />
          </section>
        </div>
      </div>
      </main>
    )
    }
}

