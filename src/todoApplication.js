import React, { useState } from "react";
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

  background-color: ${props => props.darkmode ? '#111111' : 'white'};
  color: ${props => props.darkmode ? 'white' : '#111111'};

`;

const TodoApplication = () => {
  const [inputValue, setInputValue] = useState("");

  const [todoArray, setTodoArray] = useState([]);

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

    
    const lowercaseArray =  todoArray.map(function(item, index){
        return item.name.toLowerCase()
    })

    if(lowercaseArray.includes(inputValue.toLowerCase())) {
        setInputValue("")
        return alert('You already have this task!')
    }

    const newItem = {name: inputValue, completed: false}

    //Add the todo need current input value then add that to the todo array. (spread thingy)
    //Create new array. Spreading old array into new array. Adding input value as the last item in the new array.
    setTodoArray([...todoArray, newItem]);
    setInputValue("");
  }

  function taskCount() {
    if(todoArray.length === 1) {
      document.getElementById('task-count').innerHTML = "task"
    } else if(todoArray.length > 1) {
      document.getElementById('task-count').innerHTML = "tasks"
    }
  }

  taskCount()

  return (
    <TodoApplicationContainer darkmode={darkmode}>
    <input type="checkbox" checked={darkmode} onChange={() =>setDarkmode(d => !d)}/> Dark / Light
      <h1>Your tasks</h1>
      <h2>You have {todoArray.length} <span id="task-count">tasks</span> to complete</h2>
      <TodoList todoArray={todoArray} setTodoArray={setTodoArray}/>
      <input onChange={textInput} value={inputValue} type="text"></input>
      <button onClick={addTodo}> Add item </button>
    </TodoApplicationContainer>
  );
};

export default TodoApplication;
