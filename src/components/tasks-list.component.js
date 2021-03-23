import React, { Component } from "react";
import TaskDataService from "../services/task.service";
import { Link } from "react-router-dom";

export default class TasksList extends Component {
  constructor(props) {
    super(props);

    this.retrieveToDo = this.retrieveToDo.bind(this);
    this.retrieveInProgress = this.retrieveInProgress.bind(this);
    this.retrieveDone = this.retrieveDone.bind(this);

    this.refreshList = this.refreshList.bind(this);
    this.setActiveTask = this.setActiveTask.bind(this);
    this.removeAllTasks = this.removeAllTasks.bind(this);
    this.deleteTask = this.deleteTask.bind(this);

    this.state = {
      tasks_todo: [],
      tasks_inprogress: [],
      tasks_done: [],
      currentTask: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveToDo();
    this.retrieveInProgress();
    this.retrieveDone();
  }

  retrieveToDo() {
    TaskDataService.getToDo()
      .then(response => {
        this.setState({
            tasks_todo: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  retrieveInProgress() {
    TaskDataService.getInProgress()
      .then(response => {
        this.setState({
            tasks_inprogress: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  retrieveDone() {
    TaskDataService.getDone()
      .then(response => {
        this.setState({
            tasks_done: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveToDo();
    this.retrieveInProgress();
    this.retrieveDone();
    this.setState({
      currentTask: null,
      currentIndex: -1,
    });
  }

  setActiveTask(task, index) {
    this.setState({
      currentTask: task,
      currentIndex: index,
    });
  }  

  removeAllTasks() {
    TaskDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTask() {    
    TaskDataService.delete(this.state.currentTask.id)
      .then(response => {
        console.log(response.data);
        this.refreshList()
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { tasks_todo, tasks_inprogress, tasks_done, currentTask, currentIndex} = this.state;

    return (
      <div className="list row">
          
        <div className="col-md-3">
          <div className="d-flex justify-content-between align-items-center">            
            <h4>To Do</h4>
            <Link
                className="btn-sm btn-secondary"
                to={"/add"}
              >
                  +
            </Link>
          </div>

          <ul className="list-group">
            {tasks_todo &&
              tasks_todo.map((task, index) => (
                <li
                  className={
                    "list-group-item " +
                    ((index === currentIndex && task === currentTask)? "active" : "")
                  }
                  onClick={() => this.setActiveTask(task, index)}
                  key={index}
                >
                  {task.title}
                </li>
                
              ))}
          </ul></div>

        <div className="col-md-3">

          <div className="d-flex justify-content-between align-items-center">            
            <h4>In Progress</h4>
            <Link
                className="btn-sm btn-secondary"
                to={"/add"}
              >
                  +
            </Link>
          </div>

          <ul className="list-group">
            {tasks_inprogress &&
              tasks_inprogress.map((task, index) => (
                <li
                  className={
                    "list-group-item " +
                    ((index === currentIndex && task === currentTask)? "active" : "")
                  }
                  onClick={() => this.setActiveTask(task, index)}
                  key={index}
                >
                  {task.title}
                  
                </li>
                
              ))}
              
          </ul>
          </div>
        <div className="col-md-3">

          <div className="d-flex justify-content-between align-items-center">            
            <h4>Done</h4>
            <Link
                className="btn-sm btn-secondary"
                to={"/add"}
              >
                  +
            </Link>
          </div>

          <ul className="list-group">
            {tasks_done &&
              tasks_done.map((task, index) => (
                <li
                  className={
                    "list-group-item " +
                    ((index === currentIndex && task === currentTask)? "active" : "")
                  }
                  onClick={() => this.setActiveTask(task, index)}
                  key={index}
                >
                  {task.title}
                  
                </li>
              ))}
          </ul>
          
        </div>
        <div className="col-md-3">
          {currentTask ? (
            <div>
              <h4>Task</h4>
              
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentTask.title}
              </div>

              <div>
                <label>
                  <strong>Assigned to:</strong>
                </label>{" "}
                {currentTask.user}
              </div>
              {currentTask.description &&
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentTask.description}
              </div>
              }

              <div>
                <label>
                  <strong>Type:</strong>
                </label>{" "}
                {currentTask.type}
              </div>

              <div>
                <label>
                  <strong>Priority:</strong>
                </label>{" "}
                {currentTask.priority}
              </div>

              <div>
                <label>
                  <strong>Story Points:</strong>
                </label>{" "}
                {currentTask.points}
              </div>

              <div>
                <label>
                  <strong>Updated:</strong>
                </label>{" "}
                {currentTask.updatedAt.replace(/T/, ' ').replace(/\..+/, '')}
              </div>

              <div>
                <label>
                  <strong>Created:</strong>
                </label>{" "}
                {currentTask.createdAt.replace(/T/, ' ').replace(/\..+/, '')}
              </div>

              <Link
                to={"/tasks/" + currentTask.id}
                className="badge badge-warning"
              >
                Edit
              </Link>

              <button
              className="badge badge-danger" id="del-on-list"
              onClick={this.deleteTask}
            >
              Delete
            </button>

            </div>
          ) : (
            <div>
              <br />
              <p>Select a task...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}