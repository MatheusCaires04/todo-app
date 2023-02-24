const express = require("express");

const TodoController = require("./controllers/todoController");

const routes = express.Router();

routes.get("/todos", TodoController.show);
routes.post("/create", TodoController.createTodo);
routes.put("/update-todo/:todo_id", TodoController.updateTodo);
routes.delete("/delete-todo/:todo_id", TodoController.deleteTodo);

module.exports = routes;
