import styled from 'styled-components'

const TaskList = styled.div`
    div {
        background: #e0e0e0;
        width: 99%;
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
        &:focus {
            border: none;
            outline: none;
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

const TodoList = ({ todoList, setTodoList, filter }) => {
    const handleDelete = index => {
        // Create a copy of the current array by spreading it into a new array
        const newTodoList = [...todoList]
        //remove the todo item from the array
        // the first argument of splice tells you where you are removing the item. The second tells you how many items to delete.
        newTodoList.splice(index, 1)

        window.localStorage.setItem('todos', JSON.stringify(newTodoList))

        //set our array copy (that we've removed the todofrom) as our new todoList.
        setTodoList(newTodoList)
    }

    function handleComplete(todoIndex) {
        console.log('button clicked')
        const newArraywithCompletedItem = todoList.map((item, index) => {
            console.log(item)

            if (index === todoIndex) {
                return {
                    ...item,
                    completed: !item.completed,
                }
            }
            return item
        })

        window.localStorage.setItem('todos', JSON.stringify(newArraywithCompletedItem))

        setTodoList(newArraywithCompletedItem)
    }

    return (
        <TaskList>
            {todoList
                .filter((item, index) => {
                    if (filter === 'completed') {
                        return item.completed
                    } else if (filter === 'incomplete') {
                        return !item.completed
                    } else {
                        return true
                    }
                })
                .map((item, index) => {
                    return (
                        <div key={index}>
                            <p>{item.name}</p>
                            <StateButton onClick={() => handleComplete(index)}>
                                {item.completed ? 'Task complete!' : 'Mark as complete'}
                            </StateButton>
                            <DeleteButton onClick={() => handleDelete(index)}>
                                {' '}
                                Delete{' '}
                            </DeleteButton>
                        </div>
                    )
                })}
        </TaskList>
    )
}

export default TodoList

// On first load check local storage and nothing is stored.
// Use defaults. (false)
// Subsiqent loads, something is stored.
// Use those insead of defaults.