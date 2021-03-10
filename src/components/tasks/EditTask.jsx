import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Form, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// proptypes
import PropTypes from "prop-types";

import { getTask, updateTask, getTasks } from "../../actions/taskActions";
class EditTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      id: 0,
    };
  }

  componentWillReceiveProps(nextProps, nextState) {
    const { title, description, user_id, id } = nextProps.task;

    this.setState({
      id,
      title,
      description,
      user_id,
    });
  }

  componentWillMount() {
    const taskId = this.props.match.params.id;
    const token = localStorage.FBIdToken;
    this.props.getTask(taskId, token);
    console.log(this.props.task.id);
  }

  componentDidMount() {
    const taskId = this.props.match.params.id;
    const token = localStorage.FBIdToken;
    this.props.getTask(taskId, token);
    console.log(this.props);
    const { title, description, user_id, id } = this.props;
    console.log(user_id);
    this.setState({ title, description, user_id, id });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { title, description, user_id, id } = this.state;

    const updatedTask = {
      id,
      title,
      description,
      user_id,
    };
    console.log(updatedTask);
    // const taskId = this.props.match.params.id;
    const token = localStorage.FBIdToken;
    if (updatedTask) {
      this.props.updateTask(token, updatedTask);
      this.props.getTasks(token);
      //   dispatch(updateTask(token, updatedTask), getTasks(token));
      this.props.history.push("/tasks");
    }
  };

  render() {
    console.log(this.props.task);
    const { title, description } = this.state;

    // const { title, description } = this.props;
    console.log(title);

    return (
      <>
        <Row className="mt-5 mb-5">
          <Col md={6} className="mx-auto">
            <Card>
              <Card.Header>
                <h1 className="pb-4, pt-3">
                  <FontAwesomeIcon icon="loc" className="text-primary" />{" "}
                  <span className="text-primary">Edit Task</span>
                </h1>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      id="title"
                      type="text"
                      placeholder="Enter the title"
                      name="title"
                      value={title}
                      onChange={this.onChange}
                    />
                    {/* <span style={{ color: "red" }}>{errors.email} </span> */}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Enter the description"
                      name="description"
                      value={description}
                      onChange={this.onChange}
                    />

                    {/* <span style={{ color: "red" }}>{errors.password} </span> */}
                  </Form.Group>

                  {/* {errors.general && (
                  <span style={{ color: "red" }}>{errors.general} </span>
                )} */}

                  {/* {errors.error === "auth/weak-password" && (
                  <span style={{ color: "red" }}>
                    Please use a strong password{" "}
                  </span>
                )} */}

                  <Button
                    type="submit"
                    variant="black"
                    className="btn btn-block btn-primary"
                  >
                    Edit
                    {/* {loading && <div class="spinner-grow text-warning"></div>} */}
                  </Button>
                  <br></br>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

EditTask.propTypes = {
  updateTask: PropTypes.func.isRequired,
  getTasks: PropTypes.func.isRequired,
  getTask: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  task: state.task.task,
});

const mapActionsToProps = {
  getTask,
  getTasks,
  updateTask,
};

export default connect(mapStateToProps, mapActionsToProps)(EditTask);
