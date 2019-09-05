import React from 'react'
import Navbar from './Navbar';
import MainMap from './MainMap'

import '../style/dashboard.scss'

const Dashboard = (props) => {
  return (
    <main>
      <Navbar />

      <div className="container no-gutters">
        <div className="row">

            <div className="col-md-4 no-float sidenav overflow-auto">
              <h1>Recent Pins</h1>
              <hr />
              <div className="card pin-card">
                <div className="card-body">
                  <h5 className="card-title">Trip to San Francisco</h5>
                  <h6 className="card-subtitle mb-2 text-muted">San Francisco, CA</h6>
                  <h6 className="card-subtitle mb-2 text-muted">Jul. 24, 2019</h6>
                  <p className="card-text">Lorem ipsum doler blah blah blah.</p>
                </div>
              </div>
              <div className="card pin-card">
                <div className="card-body">
                  <h5 className="card-title">Trip to San Francisco</h5>
                  <h6 className="card-subtitle mb-2 text-muted">San Francisco, CA</h6>
                  <h6 className="card-subtitle mb-2 text-muted">Jul. 24, 2019</h6>
                  <p className="card-text">Lorem ipsum doler blah blah blah.</p>
                </div>
              </div>
            </div>

            
            <div className="col-md-8 main-content">
              <MainMap />
            </div>
        </div>
      </div>
    </main>
  )
}

export default Dashboard