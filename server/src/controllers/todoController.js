const Todo = require("../models/Todo");

module.exports = {
  async show(req, res) {
    const showTodo = await Todo.find();

    res.json(showTodo);
  },
  async createTodo(req, res) {
    const { text } = req.body;

    const todo = await Todo.create({
      text,
    });

    res.json(todo);
  },

  async updateTodo(req, res) {
    const { todo_id } = req.params;
    const { text } = req.body;

    const todo = await Todo.findByIdAndUpdate(todo_id, { text });

    res.json(todo);
  },

  async deleteTodo(req, res) {
    const { todo_id } = req.params;

    const todo = await Todo.findByIdAndRemove(todo_id);

    res.json(todo);
  },
};
