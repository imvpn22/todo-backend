const Todo = require('../models/Todo');

const createTodo = (todo, cb) => {
  Todo.create(todo, cb);
};

const getTodos = cb => {
  Todo.find({ isDeleted: false }, cb);
};

// TODO: put condition for user
const getFilteredTodos = (query, cb) => {
  const re = new RegExp(query, 'i');
  Todo.find({ text: re }, cb);
};

const updateTodoById = (id, todo, cb) => {
  Todo.findByIdAndUpdate(id, todo, { new: true }, cb);
};

const deleteTodoById = (id, cb) => {
  console.log(id);
  Todo.findByIdAndDelete(id, cb);
};

const TodoController = {
  createTodo,
  getTodos,
  getFilteredTodos,
  updateTodoById,
  deleteTodoById
};
module.exports = TodoController;
