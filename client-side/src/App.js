import React, { useState } from 'react';
import Header from './components/Header';
import Add from './components/Add';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [todo, setTodo] = useState([])

  const addTodo = (textFromInput) => {
    const add = { id: Date.now(), text: textFromInput, status: false }
    textFromInput && setTodo((prev) => [...prev, add])
  }

  const delTodo = (idFromTodo) => {
    const remainsTodo = todo.filter((f) => f.id !== idFromTodo)
    setTodo(remainsTodo)
  }

  const doneTodo = (idFromTodo) => {
    const remainsTodo = todo.map((m) => {
      if (m.id === idFromTodo) return { ...m, status: !m.status }
      return m
    })
    setTodo(remainsTodo)
  }

  const editTodo = (idFromTodo, textFromEdit) => {
    const remainsTodo = todo.map((m) => {
      if (m.id === idFromTodo) return { ...m, text: textFromEdit }
      return m
    })
    setTodo(remainsTodo);
  }

  return (
    <div className="App">
      <Header />
      <Add addFunc={addTodo} />
      <TodoList todos={todo} delFunc={delTodo} doneFunc={doneTodo} editFunc={editTodo} />
    </div>
  )
}

export default App;
