import React from 'react'
import Todo from './Todo'

const TodoList = ({ todos, delFunc, doneFunc, editFunc }) => {
  return (
    <div>
      {todos.map((todo) => <Todo {...todo} key={todo.id} delFunc={delFunc} doneFunc={doneFunc} editFunc={editFunc} />)}
    </div>
  )
}

export default TodoList