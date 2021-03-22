import React, { Component } from "react";
import TaskDataService from "../services/task.service";
import { Link } from "react-router-dom";

export default class TasksList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);

    this.retrieveToDo = this.retrieveToDo.bind(this);
    this.retrieveInProgress = this.retrieveInProgress.bind(this);
    this.retrieveDone = this.retrieveDone.bind(this);

    this.refreshList = this.refreshList.bind(this);
    this.setActiveTask = this.setActiveTask.bind(this);
    this.removeAllTasks = this.removeAllTasks.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      tasks_todo: [],
      tasks_inprogress: [],
      tasks_done: [],
      currentTask: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveToDo();
    this.retrieveInProgress();
    this.retrieveDone();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
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

  searchTitle() {
    TaskDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          tasks: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, tasks_todo, tasks_inprogress, tasks_done, currentTask, currentIndex} = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>To Do</h4>

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
          </ul>
          <h4>In progress</h4>

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
          
          <h4>Done</h4>

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

                
          <Link
            className="m-3 btn btn-sm btn-primary"
            to={"/add"}
          >
              Add
        </Link>
          
        </div>
        <div className="col-md-6">
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
                  <strong>Assign to:</strong>
                </label>{" "}
                {currentTask.user}
              </div>

              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentTask.description}
              </div>

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

              <Link
                to={"/tasks/" + currentTask.id}
                className="badge badge-warning"
              >
                Edit
              </Link>

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