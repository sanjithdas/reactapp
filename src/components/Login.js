/**
 * @author [Sanjith]
 * @email [sanjith.das@gmail.com]
 * @create date 2020-10-23 16:36:03
 * @modify date 2021-03-09 10:41:18
 * @desc [Login Component]
 */
//react
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// styles
import { Row, Col, Form, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
// user action
import { loginUser } from "../actions/userActions";
//props
import PropTypes from "prop-types";

class Login extends Component {
  // initialise the local state
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.UI.errors) this.setState({ errors: nextProps.UI.errors });
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) this.setState({ errors: nextProps.UI.errors });
  }

  onHandleSubmit = (e) => {
    e.preventDefault();

    if (this.state.email === "") {
      this.setState({
        errors: { email: "Email cannot be empty" },
      });
      return;
    }

    if (this.state.password === "") {
      this.setState({
        errors: { password: "Password cannot be empty" },
      });
      return;
    }

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData, this.props.history);
    //this.props.history.push(".../tasks")
  };

  onHandleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const {
      UI: { loading },
    } = this.props;

    const { message } = this.props.user;

    return (
      <div>
        <Row className="mt-5 mb-5">
          <Col md={6} className="mx-auto">
            <Card>
              <Card.Header>
                <h1 className="pb-4, pt-3">
                  <FontAwesomeIcon icon="lock" className="text-primary" />{" "}
                  <span className="text-primary">Login</span>
                </h1>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={this.onHandleSubmit}>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className={classnames("form-control", {
                        "is-invalid": this.state.errors.email,
                      })}
                      value={this.state.email}
                      onChange={this.onHandleChange}
                    />

                    {this.state.errors.email && (
                      <div className="invalid-feedback">
                        {this.state.errors.email}
                      </div>
                    )}

                    {/* <span style={{ color: "red" }}>
                      {user.validation_errors &&
                        user.validation_errors.password}{" "}
                    </span> */}

                    {/* {errors && (
                      <span style={{ color: "red" }}>{errors.message} </span>
                    )} */}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      name="password"
                      className={classnames("form-control", {
                        "is-invalid": this.state.errors.password,
                      })}
                      value={this.state.password}
                      onChange={this.onHandleChange}
                    />

                    {this.state.errors.password && (
                      <div className="invalid-feedback">
                        {this.state.errors.password}
                      </div>
                    )}

                    {/* <span style={{ color: "red" }}>
                      {user.validation_errors &&
                        user.validation_errors.password}{" "}
                    </span> */}
                  </Form.Group>
                  {this.props.user.token && (
                    <span style={{ color: "red" }}>{message} </span>
                  )}
                  {this.props.UI.errors ? (
                    <span style={{ color: "red" }}>
                      {this.props.UI.errors.message}{" "}
                    </span>
                  ) : (
                    <span style={{ color: "red" }}>{} </span>
                  )}

                  <Button
                    type="submit"
                    variant="black"
                    className="btn-block btn-primary"
                  >
                    Login
                    {loading && (
                      <div className="spinner-grow text-warning"></div>
                    )}
                  </Button>
                  <br></br>
                  <small>
                    {" "}
                    Don't have an account ? sign up{" "}
                    <Link to="/register"> here </Link>
                  </small>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

// declare the prop types
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  //authenticated: PropTypes.bool.isRequired,
};

// map state to props
const mapStateToProps = (state) => {
  return {
    user: state.user,
    UI: state.UI,
    authenticated: state.user.authenticated,
  };
};

// map action to props
const mapActionsToProps = {
  loginUser,
};

// connect to the globas state and export
export default connect(mapStateToProps, mapActionsToProps)(Login);
