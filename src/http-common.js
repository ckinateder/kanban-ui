import axios from "axios";

export default axios.create({
  baseURL: "https://kanban-cjk-api.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});