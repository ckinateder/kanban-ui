import React, { Component } from "react";
import { Link } from "react-router-dom";
import TaskDataService from "../services/task.service";

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangePoints = this.onChangePoints.bind(this);

    this.getTask = this.getTask.bind(this);
    //this.updatePublished = this.updatePublished.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);

    this.state = {
      currentTask: {
        id: null,
        title: "",
        description: "",
        type: "to do",
        priority: "in progress",
        user: "root",
        points: 1,
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getTask(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTask: {
          ...prevState.currentTask,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentTask: {
        ...prevState.currentTask,
        description: description
      }
    }));
  }

  onChangeType(e) {
    const type = e.target.value;
    
    this.setState(prevState => ({
      currentTask: {
        ...prevState.currentTask,
        type: type
      }
    }));
  }

  onChangePriority(e) {
    const priority = e.target.value;
    
    this.setState(prevState => ({
      currentTask: {
        ...prevState.currentTask,
        priority: priority
      }
    }));
  }

  onChangeUser(e) {
    const user = e.target.value;
    
    this.setState(prevState => ({
      currentTask: {
        ...prevState.currentTask,
        user: user
      }
    }));
  }

  onChangePoints(e) {
    const points = e.target.value;
    
    this.setState(prevState => ({
      currentTask: {
        ...prevState.currentTask,
        points: points
      }
    }));
  }

  getTask(id) {
    TaskDataService.get(id)
      .then(response => {
        this.setState({
          currentTask: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTask() {
    TaskDataService.update(
      this.state.currentTask.id,
      this.state.currentTask
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The task was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTask() {    
    TaskDataService.delete(this.state.currentTask.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/tasks')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTask } = this.state;

    return (
      <div>
        {currentTask ? (
          <div className="edit-form">
            <h4>Task</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentTask.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="title">Assign to</label>
                <input
                  type="text"
                  className="form-control"
                  id="user"
                  value={currentTask.user}
                  onChange={this.onChangeUser}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentTask.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="type">type</label>
                <select
                type="text"
                className="form-control"
                id="type"
                required
                value={currentTask.type}
                onChange={this.onChangeType}
                >

                <option value="to do">To Do</option>
                <option value="in progress">In Progress</option>
                <option value="done">Done</option>
             </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="priority">priority</label>
                <select
                type="text"
                className="form-control"
                id="priority"
                required
                value={currentTask.priority}
                onChange={this.onChangePriority}
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="points">Story Points</label>
                <input
                  type="text"
                  className="form-control"
                  id="points"
                  value={currentTask.points}
                  onChange={this.onChangePoints}
                />
              </div>
            </form>
            
            <a href="/">
            <button
              type="submit"
              className="badge badge-dark mr-2"
            >
              Back
            </button></a>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTask}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTask}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Select a task...</p>
          </div>
        )}
      </div>
    );
  }
}