import React, { Component } from "react";
 
import { connect } from "react-redux";
import { getTask } from "../../actions/taskActions";
class ViewTask extends Component {
  componentDidMount() {
    const taskId = this.props.match.params.id;
    const token = localStorage.FBIdToken;
    console.log(taskId, token);
    if (token) {
      this.props.getTask(taskId, token);
    }
  }

  render() {
    console.log(this.props.task);
    const { id, title, description, user_id } = this.props.task;
    console.log(id, title, description);
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">User</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{id}</th>
              <td>{user_id}</td>
              <td>{title}</td>
              <td>{description}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

// ViewTask.propTypes = {
//   //shortcut ptfr and ptar
//   user: PropTypes.object.isRequired,
//   UI: PropTypes.object.isRequired,
//   getTask: PropTypes.func.isRequired,
//   task: PropTypes.object.isRequired,
// };

// map state to props
const mapStateToProps = (state) => ({
  task: state.task.task,
  authenticated: state.user.authenticated,
  user: state.user,
});

export default connect(mapStateToProps, { getTask })(ViewTask);
