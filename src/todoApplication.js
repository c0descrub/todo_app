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

`;

const TaskInputButton = styled.button`
    border: none;
    background: #008ec4;
    border-radius: 0px;
    color: white;
    padding: 14px 20px 12px 20px;
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
  
  const [taskCounter, setTaskCounter] = useState('You have no tasks.')
  useEffect(() => {
    if(todoArray.length == 0) {
      setTaskCounter(`You have no tasks.`)
    } else if(todoArray.length == 1) {
      setTaskCounter(`You have ${todoArray.length} task to complete`)
    } else if(todoArray.length >= 2) {
      setTaskCounter(`You have ${todoArray.length} tasks to complete`)
    }
  }, [todoArray])

  return (
    <TodoApplicationContainer darkmode={darkmode}>
      <input type="checkbox" checked={darkmode} onChange={() =>setDarkmode(d => !d)}/> Dark / Light
      <h1>Your tasks</h1>
      <h2>{taskCounter}</h2>
      <TaskInput placeholder="Add a new task"  onChange={textInput} value={inputValue} type="text"></TaskInput>
      <TaskInputButton onClick={addTodo}> + </TaskInputButton>

    <TodoList todoArray={todoArray} setTodoArray={setTodoArray}/>
    </TodoApplicationContainer>>
  );
};

export default TodoApplication;
