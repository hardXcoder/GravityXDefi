import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false,
    };
  }

  onMenuClick = () => {
    this.setState({
      clicked: !this.state.clicked,
    });
  };

  collapseNavbar = () => {
    this.setState({
      clicked: false,
    });
  };
  render() {
    return (
      <nav className="navBarItems">
        <div className="navbarLogo">
          <h3 className="navLinks">
            <Link to="/" id="liContent">
              GravityX Capital
            </Link>
          </h3>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <div className="navMenuIcon">
          <FontAwesomeIcon
            className="cursorPointer"
            onClick={this.onMenuClick}
            icon={this.state.clicked ? faTimes : faBars}
            size="lg"
            color="black"
          ></FontAwesomeIcon>
        </div>
      </nav>
    );
  }
}

export default Navbar;
