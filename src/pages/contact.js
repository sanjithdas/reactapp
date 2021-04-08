/**
 * @author [Sanjith]
 * @email [sanjith.das@gmail.com]
 * @create date 2020-11-06 13:15:57
 * @modify date 2021-04-07 12:20:38
 * @desc [Contact page]
 */
 import React, { Component } from "react";
 import { toast } from 'react-toastify';
 import emailjs from "emailjs-com";
 //init("user_JoXMOLyUnnZS9K58BUWGB");
 
 /**
  * custom component insert
  */
 //import HeaderImage from "../components/HeaderImage";
 // google map
 import GoogleMap from "../components/gMap";

 import Joi from "joi";
 
 
 
 class Contact extends Component {
   constructor(props) {
     super(props);
     this.state = {
       data:{
       name: "",
       email: "",
       subject: "",
       message: "",
        },
       errors: {},
     };
   }
     schema = Joi.object({
     name: Joi.string().min(5).messages({'string.empty': "Name cannot be empty"}),
     email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).messages({'string.empty': "Email cannot be empty"}),
     subject: Joi.string().min(6).messages({'string.empty': "Subject cannot be empty"}) ,
     message: Joi.string().min(20).messages({'string.empty': "Message cannot be empty"}),
        
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
 
   // form validation on submit
   handleSubmit = (e) => {
     e.preventDefault();
     const errors = this.validate();
     console.log(errors);
     this.setState({errors:errors} );
     
    if (errors) return;
     this.sendEmail(e);
     toast.success("Email sent successfully.. We will be in touch with you soon..")
   };
 
   sendEmail = (e) => {
     e.preventDefault();
     emailjs
       .sendForm(
         "gmail",
         "template_bycrbsg",
         e.target,
         "user_JoXMOLyUnnZS9K58BUWGB"
       )
       .then(
         (result) => {
            
           //  window.location.reload(); //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior)
         },
         (error) => {
           console.log(error.text);
         }
       );
   };
 
   render() {
     let  { name, email, subject, message } 
            
      = this.state.data;
     let { errors } = this.state;
     console.log(errors);
     
     return (
       <section className="bg-light mt-0 mb-0">
        
         <div className="container">
           <div className="row no-gutters slider-text d-flex align-itemd-end justify-content-center">
             <div className="col-md-9  text-center d-flex align-items-end justify-content-center">
               <div className="text ">
                 <h1 className="mt-5 bread   htl-title-text">Contact us</h1>
               </div>
             </div>
           </div>
         </div>
         <section className="bg-light">
           <div className="container">
             <div className="row d-flex mb-5 contact-info">
               <div className="col-md-12 mb-4">
                 <h2 className="h3 text-success">Contact Information</h2>
               </div>
               <div className="w-100"></div>
               <div className="col-md-3 d-flex">
                 <div className="info bg-white p-4">
                   <p>
                     <span>Address:</span> 205 My street, Doveton Australia
                   </p>
                 </div>
               </div>
               <div className="col-md-3 d-flex">
                 <div className="info bg-white p-4">
                   <p>
                     <span className="nowrap">Phone:</span>{" "}
                     <a className="nowrap" href="tel://1234567920">
                       + 1235 2355 98
                     </a>
                   </p>
                 </div>
               </div>
               <div className="col-md-3 d-flex">
                 <div className="info bg-white p-4">
                   <p>
                     <span>Email:</span>{" "}
                     <a href="mailto:info@yoursite.com">info@yoursite.com</a>
                   </p>
                 </div>
               </div>
               <div className="col-md-3 d-flex">
                 <div className="info bg-white p-4">
                   <p>
                     <span>Website</span> <a href="/">yoursite.com</a>
                   </p>
                 </div>
               </div>
             </div>
 
             <div className="row block-9">
               <div className="col-md-6 order-md-last d-flex">
                 <form
                   className="bg-white p-5 contact-form"
                   onSubmit={this.handleSubmit}
                 >
                   <div className="form-group">
                     <input
                       type="text"
                       name="name"
                       value={name}
                       className="form-control"
                       placeholder="Your Name"
                       onChange={this.onChange}
                      
                     />
                     <span>
                      {errors && errors.name && (
                      <small className="text-danger">
                        {errors.name}
                      </small>
                        )}
                     </span>
                   </div>
                   <div className="form-group">
                     <input
                       name="email" 
                       value={email}
                       type="mail"
                       className="form-control"
                       placeholder="Your Email"
                       onChange={this.onChange}
                     
                     />
                     <span style={{ color: "red" }}>
                      {errors && errors.email && (
                      <small className="text-danger">
                        {errors.email}
                      </small>
                        )}
                     </span>
                   </div>
                   <div className="form-group">
                     <input
                       type="text"
                       name="subject" 
                       value={subject}
                       className="form-control"
                       placeholder="Subject"
                       onChange={this.onChange}
                     
                     />
                     <span style={{ color: "red" }}> 
                     {errors && errors.subject && (
                      <small className="text-danger">
                        {errors.subject}
                      </small>
                        )}
                     </span>
                   </div>
                   <div className="form-group">
                     <textarea
                      name="message" 
                       cols="30"
                       rows="7"
                       className="form-control"
                       value={message}
                       placeholder="Message"
                       onChange={this.onChange}
                        
                     ></textarea>
                     <span style={{ color: "red" }}>
                     {errors && errors.message && (
                      <small className="text-danger">
                        {errors.message}
                      </small>
                        )}
                     </span>
                   </div>
                   <div className="form-group">
                     <input
                       type="submit"
                       value="Send Message"
                       className="btn btn-success py-3 px-5"
                     />
                   </div>
                   <div className="row" >
        <div className="col-sm-12 col-md-4 ">
         
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
               </div>
 
               <div className="col-md-6 d-flex">
                 <div id="map" className="bg-white">
                   <GoogleMap />
                 </div>
               </div>
             </div>
           </div>
         </section>
         <br></br>
       </section>
     );
   }
 }
 // validation option for JOI
  
 
 export default Contact;
 