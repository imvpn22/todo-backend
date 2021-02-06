const express = require('express');
const TodoController = require('../controllers/todoController');
const router = express.Router();

router.get('/', (req, res) => {
  TodoController.getTodos((err, todos) => {
    if (err) {
      res.json({
        status: 'error',
        error: err,
        message: 'Todos fetch failed'
      });
    } else if (todos && todos.length > 0) {
      res.json({
        status: 'success',
        todos,
        message: 'Got all the data'
      });
    } else {
      res.json({
        status: 'error',
        todos: [],
        message: 'No data found'
      });
    }
  });
});

router.post('/', (req, res) => {
  const todo = req.body;
  TodoController.createTodo(todo, (err, newTodo) => {
    if (err) {
      res.json({
        status: 'error',
        error: err,
        message: 'Todos create failed'
      });
    } else {
      res.json({
        status: 'success',
        newTodo,
        message: 'Todo created successfully'
      });
    }
  });
});

router.put('/', (req, res) => {
  const todo = req.body;
  const id = todo._id;
  TodoController.updateTodoById(id, todo, (err, newTodo) => {
    if (err) {
      res.json({
        status: 'error',
        error: err,
        message: 'Todos update failed'
      });
    } else {
      res.json({
        status: 'success',
        todo: newTodo,
        message: 'Todo updated successfully'
      });
    }
  });
});

router.delete('/:id', (req, res) => {
  const todoId = req.params.id;
  TodoController.deleteTodoById(todoId, (err, newTodo) => {
    if (err) {
      res.json({
        status: 'error',
        error: err,
        message: 'Todos delete failed'
      });
    } else {
      res.json({
        status: 'success',
        todo: newTodo,
        message: 'Todo deleted successfully'
      });
    }
  });
});

module.exports = router;
