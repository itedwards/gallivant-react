import React from 'react'
import CardList from './CardList'
import Autocomplete from './Autocomplete'


export default class SideBar extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      place: {}
    }
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
              <CardList pins={this.props.pins} />
            </div>
            <div className="tab-pane fade" id="addnew" role="tabpanel" aria-labelledby="addnew-tab">
              <Autocomplete onPlaceChanged={this.showPlaceDetails.bind(this)} />
              <AddressDetails place={this.state.place} />
            </div>
          </div>
            
        </div>
      </nav>
    )
  }
  
  
} 
