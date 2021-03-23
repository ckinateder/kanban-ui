import axios from "axios";

export default axios.create({
  baseURL: (process.env.REACT_APP_SERVER_URL || "https://kanban-cjk-api.herokuapp.com")+"/api",
  headers: {
    "Content-type": "application/json"
  }
});