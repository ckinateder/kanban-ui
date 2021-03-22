import React, { Component } from "react";
import TaskDataService from "../services/task.service";

export default class AddTask extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.saveTask = this.saveTask.bind(this);
    this.newTask = this.newTask.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "", 
      type: "to do",
      priority: "low",
      user: "root",

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

  saveTask() {
    var data = {
      title: this.state.title,
      description: this.state.description,
      type: this.state.type,
      priority: this.state.priority,
      user: this.state.user
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
      user: "root",

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newTask}>
              Add
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
            <input
                type="text"
                className="form-control"
                id="type"
                required
                value={this.state.type}
                onChange={this.onChangeType}
                name="type"
            />
            </div>
  
            <div className="form-group">
            <label htmlFor="description">Priority</label>
            <input
                type="text"
                className="form-control"
                id="priority"
                required
                value={this.state.priority}
                onChange={this.onChangePriority}
                name="priority"
            />
            </div>

            <button onClick={this.saveTask} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}