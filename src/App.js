import logo from './logo.svg';
import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import TodoList from './components/TodoList';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos,setTodos] = useState([])
  const [display,setDisplay] = useState('all')
  const todoNameRef = useRef()

  const [classAll, setClassAll] = useState("Underline");
  const [classCompleted, setClassCompleted] = useState();
  const [classActive, setClassActive] = useState();

  useEffect(() => { //If there is data in LocalStorage, retreive it
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])


  useEffect(() => { //Fetch Data from website if first-time visit
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) return

    function fetchData(number){
      fetch('https://jsonplaceholder.typicode.com/todos/'+number)
        .then(function(response){
          return response.json()
        })
        .then((response) => {
          setTodos(prevTodos => {
            return [...prevTodos, { id: Math.random()*1000000, name: response.title, complete: response.completed}]
          })
  
          if (number < 10)
            fetchData(number+1);
        })
    }

    fetchData(1);
  }, [])

  useEffect(() => { //Store data into LocalStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function deleteTodo(id){
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  function handleAllButton(){
    setDisplay("all");

    setClassAll("Underline");
    setClassCompleted();
    setClassActive();
  }
  function handleCompletedButton(){
    setDisplay("completed");

    setClassAll();
    setClassCompleted("Underline");
    setClassActive();
  }
  function handleActiveButton(){
    setDisplay("active");

    setClassAll();
    setClassCompleted();
    setClassActive("Underline");
  }

  function handleAddTodo(){
    const name = todoNameRef.current.value
    if (name === '') return

    setTodos(prevTodos => {
      return [...prevTodos, { id: Math.random()*1000000, name: name, complete: false}]
    })
    todoNameRef.current.value = null
    console.log(todos)
  }

  return (
    <>
      <center>
        To Do List
        <div class="button-wrapper">
          <input type="text" ref={todoNameRef} />
          <button onClick={handleAddTodo}>Add</button>

          
        </div>

        <div class="list">
          <TodoList todos={todos} toggleTodo={toggleTodo} display={display} deleteTodo={deleteTodo} />
        </div>

        🌎<span onClick={handleAllButton} className={classAll}>All</span> 
        ✔️<span onClick={handleCompletedButton} className={classCompleted}>Completed</span> 
        ⏱️<span onClick={handleActiveButton} className={classActive}>Active</span>
      </center>
    </>
  );
}

export default App;
