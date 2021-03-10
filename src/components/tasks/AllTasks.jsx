/**
 * @author [Sanjith]
 * @email [sanjith.das@gmail.com]
 * @create date 2021-03-05 11:24:52
 * @modify date 2021-03-05 11:24:52
 * @desc [Getting All Tasks]
 */

// react stuff
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

// pro types
import PropTypes from "prop-types";

/**
 * custom component insert
 */
import { getTasks } from "../../actions/taskActions";

import Task from "../../components/tasks/Task";

class AllTasks extends Component {
  componentDidMount() {
    const token = localStorage.FBIdToken;
    if (token) {
      this.props.getTasks(token);
    }
  }

  render() {
    const {
      tasks: { info },
    } = this.props;

    const user = localStorage.user;

    return (
      <section className="ftco-section bg-light ftco-room">
        <div className="container-fluid ">
          <div>
            <Fragment>
              {[info].map((task) => (
                // console.log(task)
                <Task singletask={task} key={task} user={user} />
              ))}
            </Fragment>
          </div>
        </div>
      </section>
    );
  } // End of Render
} // End of Component AllTasks

//Prop declaration

AllTasks.propTypes = {
  //shortcut ptfr and ptar
  getTasks: PropTypes.func.isRequired,
  // tasks: PropTypes.Object.isRequired,
};

// map state to props
const mapStateToProps = (state) => {
  return {
    tasks: state.task.tasks,
    authenticated: state.user.authenticated,
  };
};

// connect to the global state and export
export default connect(mapStateToProps, { getTasks })(AllTasks);
