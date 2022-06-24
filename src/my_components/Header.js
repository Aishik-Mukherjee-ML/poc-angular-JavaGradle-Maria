import React from 'react'
import PropTypes from 'prop-types'
import {
    Link
} from "react-router-dom";

export const Header = (props) => {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">{props.title}</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/addemployee">Add Employees</Link>
                  </li>
              </ul>
              { props.showLable ? <span className="navbar-text">
              Project to add new employees
              </span>: "" }
            </div>
        </div>
    </nav>
  )
}

Header.defaultProps = {
    title: "Your Title Here",
    showLable: false
}

Header.propTypes = {
    title: PropTypes.string,
    showLable: PropTypes.bool.isRequired
}