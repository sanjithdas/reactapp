/**
 * @author [Sanjith]
 * @email [sanjith.das@gmail.com]
 * @create date 2021-03-05 07:54:26
 * @modify date 2021-03-05 07:54:26
 * @desc [Lising Task passing props from AllTask]
 * 
 * 
 * 
 */

import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./css/task.css";

// react toastify - flash message
import { toast } from 'react-toastify';

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  addTask,
  getTasks,
  deleteTask,
  setTaskCompleted,
} from "../../actions/taskActions";

import _map from "lodash/map";
import Joi from "joi";
import PropTypes from "prop-types";

class Task extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        title: "",
        description: "",
      },
      errors: {},
      done: false,
      name: "",
      user_id: "",
      isChecked: false,
      rowId: "",
      backgroundColor: 'green',
      themeDefaultStyle:{
        isThemeChanged: false,
        backgroundColor: "green"
      }
    };
  }


  schema = Joi.object({
    title: Joi.string().min(3),
    description: Joi.string().min(6),
  });

  validate = () => {
    const errors = {};
    const result = this.schema.validate(this.state.data, {
      abortEarly: false,
    });
    if (!result.error) return null;
     
    result.error.details.map((item) => {
      return (errors[item.path[0]] = item.message);
    });
    console.log(errors);
    return errors;
  };

  validateInput = (currentTarget) => {
    const object = { [currentTarget.name]: currentTarget.value };
    const result = this.schema.validate(object);
    if (!result.error) return null;
    return result.error.details[0].message;
  };

  onChange = (event) => {
    const errors = { ...this.state.errors };
    const errorMsg = this.validateInput(event.currentTarget);
    if (errorMsg) {
      errors[event.currentTarget.name] = errorMsg;
    } else {
      delete errors[event.currentTarget.name];
    }

    const data = { ...this.state.data };
    data[event.currentTarget.name] = event.currentTarget.value;
    this.setState({ data, errors });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.FBIdToken;
    const errors = this.validate();
    this.setState({ errors } || {});
    if (errors) return;
    const { title, description } = this.state.data;
    let user_id = 0;

    _map(this.props.singletask, (s) => (user_id = s.user_id));

    const newTask = {
      title: title,
      description: description,
      user_id,
    };

    if (token) {
      this.props.addTask(token, newTask);
      this.props.getTasks(token);
      toast.success("Task created successfully")
    }
  };

  handleDelete = (id) => {
    const token = localStorage.FBIdToken;
    this.props.deleteTask(id, token);
    this.props.getTasks(token);
    toast.success("Task deleted successfully")
  };

  handleCompleteTask = (event, taskId, title) => {
   
    event.preventDefault();
    this.setState({ rowId: taskId });
    const token = localStorage.FBIdToken;
    this.props.setTaskCompleted(event.target.value, token);
    this.props.getTasks(token);
    toast.success(`Task '${title}' completed..`)
  };

 
  render() {

      
    let { singletask, user , completedIcon ,notCompletedIcon } = this.props;
    
    let name = "";
    _map(singletask, (s) => (name = s.name));

    if (name !== "") user = name;

    const { authenticated } = this.props;

    const { title, description } = this.state.data;
    const { errors } = this.state;

    return (
     <>
<div className="container ml-5">
  
  <div className="row">
    <div className="col-sm-12 col-md-9">
      <div className="card">
        <div className="card-body">
        <h4 className="card-title">Todo list for {user}</h4>
        {singletask ? "" : "No task found !! create some task "}
        </div>
      </div>
    </div>
  </div>
  <form  onSubmit={this.handleSubmit} noValidate>
  <div className="row" >
    <div className="col-sm-12 col-md-4 ">
      
       <input
              type="text"
              className=" form-control title--input  todo-list-input "
              placeholder="Enter the title"
              value={title && title}
              onChange={this.onChange}
              name="title"
        /> 
    </div>

    <div className="col-sm-12 col-md-8">

      <div className="row">
        <div className="col-sm-12 col-md-6">
          <textarea
            className="form-control title--input"
            placeholder="What do you need to do today?"
            value={description}
            onChange={this.onChange}
            error={errors && errors.description}
            name="description"
          ></textarea> {" "}
        </div>
        <div className="col-sm-12 col-md-4">
          <button
              type="submit"
              className={
                "add btn btn-primary font-weight-bold todo-list-add-btn"
              }
              disabled={!authenticated}
            >
              Add
            </button>{" "}
              <div></div>
        </div>
      </div>
      
    </div>
 
  </div> 
  <div className="row" >
        <div className="col-sm-12 col-md-4 ">
        {errors && errors.title && (
            <small className="text-danger">
              {errors.title}
            </small>
          )}
        </div>
        <div className="col-sm-12 col-md-8 ">
        {errors && errors.description && (
            <small className="text-danger">
              {errors.description}
            </small>
          )}
        </div>
      </div>   
  </form>
  {this.props.singletask &&
                        singletask.map((t, index) => (
  <div className="row mt-2 mb-3" id={t.id} key={index}
   >
    <div className="col-md-5 col-sm-12 col-xs-12" style = { this.state.rowId === t.id || t.completed ? {backgroundColor:"#51AD19"}: {} }
       >
    <div className="form-check">
        {" "}
        <label className="form-check-label">
          {" "}
          <input
            className="checkbox"        
            type="checkbox"
            id={t.id}
            value={t.id}
            onChange={(event) => this.handleCompleteTask(event,t.id, t.title)}
            checked={t.completed}
          />
          {t.title} <i className="input-helper"></i>
        </label>{" "}
      </div>{" "}
    </div>
    
    <div className="col-md-4 col-sm-12 col-xs-12" style = { this.state.rowId === t.id || t.completed ? {backgroundColor:"#51AD19"}: {} }>
      <Link to={`task/view/${t.id}`}
            className="btn-small m-1 btn btn-primary link-class"
          >
            <span
              className="glyphicon glyphicon-eye-open"
              aria-hidden="true"
            ></span>
            <span>
              <strong>View</strong>
            </span>
      </Link>

      <Link  to={`task/edit/${t.id}`}
      className={t.completed ? 
         ("btn-right btn btn-primary a-btn-slide-text btn-small m-1 disabled-link link-class") : ("btn-right btn btn-primary a-btn-slide-text btn-small m-1 link-class") }
      >
      <span
        className="glyphicon glyphicon-edit"
        aria-hidden="true"
      ></span>
      <span>
        <strong>Edit</strong>
      </span>
    </Link>
        <Link to="/tasks"
        className="btn btn-primary  btn-small m-1 link-class"
        onClick={() => this.handleDelete(t.id)}
      >
        <span
          className="glyphicon glyphicon-remove"
          aria-hidden="true"
        ></span>
        <span>
          <strong>Delete</strong>
        </span>
      </Link>
      <span>
        <strong>{ t.completed ? (<img src={completedIcon} alt={t.title} style={{width:"50px"}} title={t.title} />): (<img src={notCompletedIcon} title={t.title} alt={t.title} style={{width:"40px" , height:"40px"}}/>) }</strong>
      </span>
    </div>
  </div>
  ))}
   
</div>
     </>
    );
  }
}

Task.propTypes = {
  addTask: PropTypes.func.isRequired,
  getTasks: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  setTaskCompleted: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  isTaskCompleted: state.task.isTaskCompleted,
  task: state.task.completedTask,
});

const mapActionsToProps = {
  addTask,
  getTasks,
  deleteTask,
  setTaskCompleted,
};

export default connect(mapStateToProps, mapActionsToProps)(Task);
