import React, { useState, useEffect } from 'react';
import './App.css';
import { FaRegTrashCan } from "react-icons/fa6";

const TodoItem = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
      />
      <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
      <button onClick={() => deleteTodo(todo.id)}><FaRegTrashCan /> </button>
    </div>
  );
};

const TodoList = ({ todos, toggleComplete, deleteTodo }) => {
  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
};

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('All');
  const [newTodoText, setNewTodoText] = useState('');

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodoText.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: newTodoText,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setNewTodoText('');
    }
  };

  const toggleComplete = id => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filterTodos = () => {
    switch (filter) {
      case 'Active':
        return todos.filter(todo => !todo.completed);
      case 'Completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const showClearCompletedButton = todos.some(todo => todo.completed);

  return (
    <div className="app">
      <h1>#todo</h1>
      <div className='todo-item'>
        <button className='btn' onClick={() => setFilter('All')}>All</button>
        <button className='btn' onClick={() => setFilter('Active')}>Active</button>
        <button className='btn' onClick={() => setFilter('Completed')}>Completed</button>
      </div>
      
      <div className="add-todo">
        <input
          type="text"
          placeholder="add details"
          value={newTodoText}
          onChange={e => setNewTodoText(e.target.value)}
        />
        <button onClick={addTodo}>Add </button>
      </div>
      {showClearCompletedButton && (
        <button className='btnDel' onClick={clearCompleted}>Delete all</button>
      )}
      <TodoList
        todos={filterTodos()}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
      />
      
    </div>
  );
};

export default App;
