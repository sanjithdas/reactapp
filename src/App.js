/**
 * @author [Sanjith]
 * @email [sanjith.das@gmail.com]
 * @create date 2021-03-09 10:42:22
 * @modify date 2021-03-18 20:11:29
 * @desc [description]
 */

/**
 * import react and installed modules.
 */
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// react toasify - flash message
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

// import provider - will mak available to the  global state to all the components given in the provider tag.
import { Provider } from "react-redux";
/**
 * import all styles
 */
import "./css/style.css";
import "bootstrap/dist/css/bootstrap.css";

// import store - acces the global store (state) object
import store from "./store";

// Font awestuff
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPencilAlt,
  faTimes,
  faHome,
  faPlus,
  faQuestion,
  faSortDown,
  faExclamationTriangle,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

  

import Home from "./pages/home";
import Login from "../src/components/Login";
import Logout from "../src/components/Logout";

import NavbarHeader from "./components/NavbarHeader";

import Footer from "../src/components/FooterC";
import AuthRoute from "./util/AuthRoute";

import Tasks from "./components/tasks/AllTasks";

import ViewTask from "./components/tasks/ViewTask";

import Register from "../src/pages/register";

import About from "../src/pages/about";

import Contact from "../src/pages/contact";

import NotFound from "./pages/notfound";
import EditTask from "./components/tasks/EditTask";

 
/**
 * checking the user is logged in (token based checking)
 * if not login redirect to login page, else set the user
 * authenticated and get the user data.
 *  */
const token = localStorage.FBIdToken;
if (token) {
  store.dispatch({ type: "SET_AUTHENTICATED" });
} else {
  store.dispatch({ type: "SET_UNAUTHENTICATED" });
}
// }
function App() {
  library.add(
    faPencilAlt,
    faTimes,
    faHome,
    faPlus,
    faQuestion,
    faSortDown,
    faExclamationTriangle,
    faLock
  );
  return (
    <div>
     {/* <ToastContainer /> */}
    <Provider store={store}>
       <Router>
         
         <NavbarHeader />
        <Switch>
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/tasks" component={Tasks} />
          <Route exact path="/task/view/:id" component={ViewTask} />
          <Route exact path="/task/edit/:id" component={EditTask} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>

        <Footer />
      </Router>
    </Provider>
   
    </div>
  );
}

export default App;
