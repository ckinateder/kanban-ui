import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTask from "./components/add-task.component";
import Task from "./components/task.component";
import TasksList from "./components/tasks-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-purple">
          <a href="/tasks" className="navbar-brand">
            Kanban
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/tasks"} className="nav-link">
                Tasks
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
          <div class="me text-white">
          Built by
            <a class="text-white" href="https://ckinateder.github.io/"> Calvin Kinateder</a>
          </div>
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/tasks"]} component={TasksList} />
            <Route exact path="/add" component={AddTask} />
            <Route path="/tasks/:id" component={Task} />
          </Switch>
        </div>
      </div>
      
    );
  }
}

export default App;