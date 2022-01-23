import React from 'react';

function Todo({todo,toggleTodo,display,deleteTodo}) {

    function handleTodoClick(){
        toggleTodo(todo.id)
    }

    function handleDeleteTodo(){
        deleteTodo(todo.id)
    }

    if (display == 'all' || todo.complete && display == 'completed' || !todo.complete && display == 'active'){
        return (
            <div class="list-items">
                <label>
                <input type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
                    {todo.name}
                </label>
                <span class="closeTodo" onClick={handleDeleteTodo}>❌</span>
            </div>
        );
    }
    else
        return (null);
}

export default Todo;
