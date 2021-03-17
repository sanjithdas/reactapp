/**
 * @author [Sanjith]
 * @email [sanjith.das@gmail.com]
 * @create date 2021-03-05 07:54:26
 * @modify date 2021-03-05 07:54:26
 * @desc [Lising Task passing props from AllTask]
 */

 import React, { Component } from "react";
 import "bootstrap/dist/css/bootstrap.css";
 import "../tasks/css/style.css";
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
 //import {CompletedIcon} from "../../images/completed1.jpg"
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
     console.log(result);
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
     }
   };
 
   handleDelete = (id) => {
     const token = localStorage.FBIdToken;
     this.props.deleteTask(id, token);
     this.props.getTasks(token);
   };
 
   handleCompleteTask = (event, taskId) => {
     event.preventDefault();
     const token = localStorage.FBIdToken;
     this.props.setTaskCompleted(event.target.value, token);
     console.log(this.props.task.completedTask);
     this.props.getTasks(token);
   };
 
   render() {
     let { singletask, user , completedIcon ,notCompletedIcon } = this.props;
     
     console.log(completedIcon);
 
     let name = "";
     _map(singletask, (s) => (name = s.name));
 
     if (name !== "") user = name;
 
     const { authenticated } = this.props;
 
     const { title, description } = this.state.data;
     const { errors } = this.state;
 
     return (
       <div className="page-content page-container" id="page-content">
         <div className="padding">
           <div className="row container d-flex justify-content-center">
             <div className="col-md-12">
               <div className="card px-3">
                 <div className="card-body">
                   <h4 className="card-title">Todo list for {user}</h4>
                   {singletask ? "" : "No task found !! create some task "}
                   <form className="" onSubmit={this.handleSubmit} noValidate>
                     <div className=" d-flex">
                       {" "}
                       <input
                         type="text"
                         className="title--input    todo-list-input"
                         placeholder="Enter the title"
                         value={title && title}
                         onChange={this.onChange}
                         error={errors && errors.title}
                         name="title"
                       />{" "}
                       <textarea
                         className="form-control todo-list-input"
                         placeholder="What do you need to do today?"
                         value={description}
                         onChange={this.onChange}
                         error={errors && errors.description}
                         name="description"
                       ></textarea>{" "}
                       <button
                         type="submit"
                         className={
                           "add btn btn-primary font-weight-bold todo-list-add-btn"
                         }
                         disabled={!authenticated}
                       >
                         Add
                       </button>{" "}
                     </div>
 
                     <div className="error--message">
                       <div className="child2">
                         {errors && errors.title && (
                           <small className="text-danger float-right p-2">
                             {errors.title}
                           </small>
                         )}
                       </div>
                       <div className="child1">
                         {errors && errors.description && (
                           <small className="text-danger float-right p-2">
                             {errors.description}
                           </small>
                         )}
                       </div>
                     </div>
                   </form>
 
                   <div className="list-wrapper">
                     <ul className="d-flex flex-column-reverse todo-list">
                       {this.props.singletask &&
                         singletask.map((t) => (
                           <li key={t.id}>
                             <div className="form-check">
                               {" "}
                               <label className="form-check-label">
                                 {" "}
                                 <input
                                   className="checkbox"
                                   type="checkbox"
                                   id={t.id}
                                   value={t.id}
                                   onChange={this.handleCompleteTask}
                                   checked={t.completed}
                                 />
                                 {t.title} <i className="input-helper"></i>
                               </label>{" "}
                             </div>{" "}
                             <div className="btn--edit">
                               <Link
                                 to={`task/view/${t.id}`}
                                 className="btn-small m-1 btn btn-primary a-btn-slide-text"
                               >
                                 <span
                                   className="glyphicon glyphicon-eye-open"
                                   aria-hidden="true"
                                 ></span>
                                 <span>
                                   <strong>View</strong>
                                 </span>
                               </Link>
                               <Link
                                 to={`task/edit/${t.id}`}
                                 className={t.completed ? ("btn-right btn btn-primary a-btn-slide-text btn-small m-1 disabled-link") : ("btn-right btn btn-primary a-btn-slide-text btn-small m-1") }
                                >
                                 <span
                                   className="glyphicon glyphicon-edit"
                                   aria-hidden="true"
                                 ></span>
                                 <span>
                                   <strong>Edit</strong>
                                 </span>
                               </Link>
 
                               <Link
                                 className="btn btn-primary a-btn-slide-text btn-small m-1"
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
 
                               {/* <button
                                 className="btn btn-success a-btn-slide-text btn-small m-1" >
                                 <span
                                   className="glyphicon glyphicon-remove"
                                   aria-hidden="true"
                                 ></span>  notCompletedIcon */}
                                 <span>
                                   <strong>{ t.completed ? (<img src={completedIcon} alt={t.title} style={{width:"50px"}} title={t.title} />): (<img src={notCompletedIcon} title={t.title} alt={t.title} style={{width:"40px" , height:"40px"}}/>) }</strong>
                                 </span>
                               {/* </button> */}
 
                               {/* <i className="remove mdi mdi-close-circle-outline "></i> */}
                             </div>
                           </li>
                         ))}
                     </ul>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
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
 