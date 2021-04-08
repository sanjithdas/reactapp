/**
 * @author [Sanjith]
 * @email [sanjith.das@gmail.com]
 * @create date 2020-10-21 21:28:35
 * @modify date 2021-04-06 21:23:32
 * @desc [NavBar Component]
 */

// import react stuff
import React, { Component } from "react";
import { connect } from "react-redux";
import Image from 'react-bootstrap/Image'
// import {ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'


// import bootstrap Nav
import { Nav, Navbar } from "react-bootstrap";

// to style the componet
import styled from "styled-components";

// logo image 

import logo from "../images/logo.png"

const Styles = styled.div`
  .Navbar {
    background-color: #fff;
    position: sticky !important;
    top: 0;
  }
  .Navbar fixed-top {
    position: fixed !important;
  }
  .navbar-brand,
  .navbar-nav .nav-link {
    font-size: 1.3rem;

    &:hover {
      color: red;
    }
   ..navbar-toggler-icon{
     display: 2px solid red !important;
   } 
  }
`;

class NavbarHeader extends Component {
  state = {
    token: null,
  };
  render() {
    const { authenticated } = this.props;
    
    return (
      <Styles>
         
        <Navbar
          style={{ backgroundColor: "black", position: "sticky", fixed: "top" }}
          expand="lg"
          fixed="top"
          className="text-success"
        >
          <Navbar.Brand href="/" id="img_logo" className="img_logo htl-title-text">
          <Image src={logo} className="logo"  alt="logo" title="logo"  style={{ width:"100px" , height: "70px" }} roundedCircle />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar ham-burger" />

          <Navbar.Collapse id="basic-navbar-nav ham-burger">
            <Nav className="ml-auto">
              <Nav.Item>
                <Nav.Link href="/"  className="home text-white mr-2">
                  Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                
              </Nav.Item>
              {authenticated && (
                <Nav.Item className="task">
                  <Nav.Link href="/tasks" className="task text-white  mr-2">
                    Tasks
                  </Nav.Link>
                </Nav.Item>
              )}

              <Nav.Item>
                <Nav.Link href="/about" className="text-white  mr-2">
                  About
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/contact" className="text-white  mr-2">
                  Contact
                </Nav.Link>
              </Nav.Item>

              {!authenticated && (
                <Nav.Item>
                  <Nav.Link href="/register" className="text-white  mr-2">
                    Register
                  </Nav.Link>
                </Nav.Item>
              )}
              {authenticated ? (
                <Nav.Link
                  href="/logout"
                  className="text-white  mr-2"
                  title="Logout"
                >
                  Logout
                </Nav.Link>
              ) : (
                <Nav.Link href="/login" className="text-white  mr-2">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
       
      </Styles>
    );
  }
}

// map the global state (authenticated ) to the props.
const mapStateToProps = (state) => ({
  user: state.user,
  authenticated: state.user.authenticated,
});

// connect to the global state and export the component.
export default connect(mapStateToProps)(NavbarHeader);
