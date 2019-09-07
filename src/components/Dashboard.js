import React from 'react'
import Navbar from './Navbar';
import MainMap from './MainMap'

import '../style/dashboard.scss'
import AddForm from './AddForm';

const Dashboard = (props) => {
  return (
    <main>
      <Navbar />
      <AddForm />
      <div className="container-fluid">
      <div className="row">
        <nav className="col-md-3 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            Test
          </div>
        </nav>

        <section role="main" className="col-md-8 ml-sm-auto col-lg-9 px-0" >
          <MainMap />
        </section>
      </div>
    </div>
    </main>
  )
}

export default Dashboard