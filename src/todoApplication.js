import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TodoList from "./TodoList"

const TodoApplicationContainer = styled.div`
  margin: 0 auto;
  height: 100vh;
  max-width: 50%;
  text-align: center;
  padding: 15px;
  
  h1{
      font-size: 32px;
      font-family: "helvetica", "open sans", "arial";
      padding: 15px;
  }

  h2 {
    padding-bottom: 20px;
  }

  background-color: ${props => props.darkmode ? '#111111' : 'white'};
  color: ${props => props.darkmode ? 'white' : '#111111'};

  input {
    &:focus {
      outline: none;
      border: none;
    }
  }

`;

const TaskInputButton = styled.button`
    border: none;
    background: #008ec4;
    border-radius: 0px;
    color: white;
    padding: 14px 20px 12px 20px;
    &:focus{
            border: none;
            outline: none;
        }
`

const TaskInput = styled.input`
  width: 70%;
  border: none;
  background: #e0e0e0;
  border-radius: 0px;
  font-size: 18px;
  padding: 10px 150px 10px 15px;
  margin-bottom: 20px;

`

/*
        
        window.localStorage.setItem('someKeyValue', 'Some data as a string');
        window.localStorage.getItem('someKeyValue');
        window.localStorage.removeItem('someKeyValue');
        window.localStorage.clear();

*/


const TodoApplication = () => {
  const [inputValue, setInputValue] = useState("");

  const storedTodos = (window.localStorage.getItem('todos') || null)

  const [todoList, setTodoList] = useState(storedTodos ? JSON.parse(storedTodos) : []);

  const [darkmode, setDarkmode] = useState(false);

  function textInput(event) {
    setInputValue(event.target.value);
  }

  function renderTodoItem(item, index) {
      const handleDelete = (event => {
          console.log('Item Deleted')
      })
    return <div key={index}> {item} <button onClick={handleDelete}>Delete</button> </div>;
  }

  function addTodo() {
    if(inputValue === '') {
        return alert('You need to enter a task!')
    } 

    const lowercaseArray =  todoList.map(function(item, index){
        return item.name.toLowerCase()
    })

    if(lowercaseArray.includes(inputValue.toLowerCase())) {
        setInputValue("")
        return alert('You already have this task!')
    }

    const newItem = { name: inputValue, completed: false }
    const newTodoList = [...todoList, newItem]
    
    window.localStorage.setItem('todos', JSON.stringify(newTodoList));

    //Add the todo need current input value then add that to the todo array. (spread thingy)
    //Create new array. Spreading old array into new array. Adding input value as the last item in the new array.   
    setTodoList(newTodoList);

    setInputValue("");
  }
  
  const [taskCounter, setTaskCounter] = useState('You have no tasks.')
  useEffect(() => {
    if(todoList.length == 0) {
      setTaskCounter(`You have no tasks.`)
    } else if(todoList.length == 1) {
      setTaskCounter(`You have ${todoList.length} task to complete`)
    } else if(todoList.length >= 2) {
      setTaskCounter(`You have ${todoList.length} tasks to complete`)
    }
  }, [todoList])

  const [filter, setFilter] = useState('all')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <TodoApplicationContainer darkmode={darkmode}>
      <input type="checkbox" checked={darkmode} onChange={() =>setDarkmode(d => !d)}/> Dark / Light
      <h1>Your tasks</h1>
      <h2>{taskCounter}</h2>
      <RadioField currentSelectedFilter={filter} handleChange={handleFilterChange} label="Incomplete Tasks" id="incomplete" />
      <RadioField currentSelectedFilter={filter} handleChange={handleFilterChange} label="Completed Tasks" id="completed" />


      <input onChange={handleFilterChange} name="filters" type="radio" id="all" value="all" checked={filter === 'all'} />
      <label htmlFor="all">All</label>

      <br />
      <br />
      <TaskInput placeholder="Add a new task"  onChange={textInput} value={inputValue} type="text"></TaskInput>
      <TaskInputButton onClick={addTodo}> + </TaskInputButton>
      
      <TodoList filter={filter} todoList={todoList} setTodoList={setTodoList}/>
  
    </TodoApplicationContainer>
  );
};

const RadioField = ({label, id, handleChange, currentSelectedFilter}) => {
  return (
    <>
      <input onChange={handleChange} name="filters" type="radio" id={id} value={id} checked={id === currentSelectedFilter} />
      <label htmlFor={id}>{label}</label>
    </>
  )
}

export default TodoApplication;
