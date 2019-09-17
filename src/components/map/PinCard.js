import React from 'react'

export default function PinCard(props){

  return (
    <div className="card bg-light mb-3" style="max-width: 18rem;">
      <div class="card-header">{this.props.pinData.lat}, {this.props.pinData.long}</div>
      <div className="card-body">
        <h5 className="card-title">{this.props.pinData.name}</h5>
        <p className="card-text">{this.props.pinData.description}</p>
      </div>
    </div>
  )

}