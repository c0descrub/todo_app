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

    return (
        <div>
            {todoArray.map((item, index) => {
                return (
                    <div key={index}>
                    <button onClick={() => handleComplete(index)}>
                        {item.completed ? 'Completed' : 'mark as complete'}
                    </button>
                    {item.name} 
                        <button onClick={() => handleDelete(index)}> Delete </button>
                    </div>
                )
            })}
        </div>
    )
}

export default TodoList