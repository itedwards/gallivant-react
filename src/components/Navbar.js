import React from 'react'

export default function Navbar() {
  return (
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-sm-4 col-md-3 mr-0" href="/dashboard">Gallivant</a>
      <form class="form-inline">
        <button class="btn btn-outline-success" type="button" data-toggle="modal" data-target="#addPinModal">Add New</button>
      </form>
      <ul className="navbar-nav px-3">

        <li className="nav-item text-nowrap">
          <a className="nav-link" href="#">Sign out</a>
        </li>
      </ul>
    </nav>

  )
}