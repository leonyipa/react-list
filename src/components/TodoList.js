import React from 'react';
import Todo from './Todo'

function TodoList({todos,toggleTodo,display,deleteTodo}) {
  return (
    todos.map(todo => {
      return <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} display={display} deleteTodo={deleteTodo} />
    })
  )
}

export default TodoList;
