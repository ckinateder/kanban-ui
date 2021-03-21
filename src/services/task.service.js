import http from "../http-common";

class TaskDataService {
  getAll() {
    return http.get("/tasks");
  }
  
  getToDo() {
    return http.get("/tasks/todo");
  }
  
  getInProgress() {
    return http.get("/tasks/inprogress");
  }
  
  getDone() {
    return http.get("/tasks/done");
  }

  get(id) {
    console.log(`trying to get ${id}`);///api/tasks/605799b3d40c1519302fd90c
    return http.get(`/tasks/${id}`);
  }

  create(data) {
    return http.post("/tasks", data);
  }

  update(id, data) {
    return http.put(`/tasks/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tasks/${id}`);
  }

  deleteAll() {
    return http.delete(`/tasks`);
  }

  findByTitle(title) {
    return http.get(`/tasks?title=${title}`);
  }
}

export default new TaskDataService();