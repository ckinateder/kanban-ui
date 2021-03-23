import React, { Component } from "react";
import TaskDataService from "../services/task.service"
import { Link } from "react-router-dom";

export default class AddTask extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangePoints = this.onChangePoints.bind(this);

    this.saveTask = this.saveTask.bind(this);
    this.newTask = this.newTask.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "", 
      type: "",
      priority: "",
      user: "",
      points: 1,

      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeType(e) {
    this.setState({
      type: e.target.value
    });
  }

  onChangePriority(e) {
    this.setState({
      priority: e.target.value
    });
  }

  onChangeUser(e) {
    this.setState({
      user: e.target.value
    });
  }

  onChangePoints(e) {
    this.setState({
      points: e.target.value
    });
  }

  saveTask() {
    var data = {
      title: this.state.title,
      description: this.state.description,
      type: this.state.type,
      priority: this.state.priority,
      user: this.state.user,
      points: this.state.points
    };

    TaskDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          type: response.data.type,
          priority: response.data.priority,
          user: response.data.user,
          points: response.data.points,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTask() {
    this.setState({
      id: null,
      title: "",
      description: "",
      type: "to do",
      priority: "low",
      user: "",
      points: 1,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Task added successfully!</h4>
            <Link
            className="btn btn-dark"
            to={"/"}
          >
              Back
            </Link>
            <button className="btn btn-primary" onClick={this.newTask}>
              Add Another
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>
  
            <div className="form-group">
            <label htmlFor="description">Assign to</label>
            <input
                type="text"
                className="form-control"
                id="user"
                required
                value={this.state.user}
                onChange={this.onChangeUser}
                name="user"
            />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>
  
            <div className="form-group">
            <label htmlFor="description">Type</label>
            <select
                type="text"
                className="form-control"
                id="type"
                required
                value={this.state.type}
                onChange={this.onChangeType}
                name="type"
            >

                <option value="to do">To Do</option>
                <option value="in progress">In Progress</option>
                <option value="done">Done</option>
            </select>
            </div>
  
            <div className="form-group">
            <label htmlFor="description">Priority</label>
            <select
                type="text"
                className="form-control"
                id="priority"
                required
                value={this.state.priority}
                onChange={this.onChangePriority}
                name="priority"
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            </div>

            <div className="form-group">
            <label htmlFor="description">Story Points</label>
            <input
                type="text"
                className="form-control"
                id="points"
                required
                value={this.state.points}
                onChange={this.onChangePoints}
                name="points"
            />
            </div>
            <Link
            className="btn btn-dark"
            to={"/"}
          >
              Back
            </Link>

            <button onClick={this.saveTask} className="btn btn-primary">
              Add
            </button>
          </div>
        )}
      </div>
    );
  }
}