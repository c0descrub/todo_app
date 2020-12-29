import styled from "styled-components";

const TodoList = (props) => {

    const todoArray = props.todoArray
    const setTodoArray = props.setTodoArray

    const handleDelete = (index) => {
        // Create a copy of the current array by spreading it into a new array
        const arrayCopy = [...todoArray]
        //remove the todo item from the array
        // the first argument of splice tells you where you are removing the item. The second tells oyu how many items to delete.
        arrayCopy.splice(index, 1)

        //set our array copy (that we've removed the todofrom) as our new todoarray.
        setTodoArray(arrayCopy)
    }

    function handleComplete(todoIndex) {
        console.log('button clicked')
        const newArraywithCompletedItem = todoArray.map((item, index) => {
            
            console.log(item)

            if(index === todoIndex) {
                return {
                    ...item,
                    completed: !item.completed 
                }
            }
            return item
        })

        setTodoArray(newArraywithCompletedItem)
    }

    const TaskList = styled.div`
    div {
        background: #e0e0e0;
        width:99%;
        margin: 0 auto;
        height: 40px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-bottom: 10px;
        color: #111111;
        
    }

    button {
        height: 100%;
        border-radius: 0px;
        border: none;
        color: white;
        :focus-visible {
            border: none;
        }

    }
    p {
        width: 100%;
    }
    `
    const StateButton = styled.button`
    background: #68bd57;
    width: 100px;
    `
    const DeleteButton = styled.button`

    background: #8a1a1a;
    
    `
    return (
        <TaskList>
            {todoArray.map((item, index) => {
                return (
                    <div key={index}>
                    <p>{item.name}</p>
                    <StateButton onClick={() => handleComplete(index)}>
                        {item.completed ? 'Task complete!' : 'Mark as complete'}
                    </StateButton>
                    <DeleteButton onClick={() => handleDelete(index)}> Delete </DeleteButton>
                    </div>
                )
            })}
        </TaskList>
    )
}

export default TodoList