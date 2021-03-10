/**
 * @author [Sanjith]
 * @email [sanjith.das@gmail.com]
 * @create date 2020-11-06 14:52:15
 * @modify date 2021-03-09 14:07:54
 * @desc [Authorization Routes]
 */
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

/**
 * if authenticated redirect to create room section, else the same component will load
 *  */
const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
   <Route
    {...rest}
    render={(props) =>
       authenticated === true ? (
        <Redirect to="/tasks" />
      ) : (
        <Component {...props} />
      )
    }
  />
);
const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(AuthRoute);
