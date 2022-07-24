import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Add from './components/Add';
import TodoList from './components/TodoList';
import './App.css';
import Config from './services/Config';

// import * as StotageHelper from './services/StorageHelper.js'
// useEffect(() => {
//   const localTodos = StotageHelper.getItem('__todos__')
//   if (localTodos) setTodo(prevState => ([...prevState, ...localTodos]))
// }, [])

// useEffect(() => {
//   StotageHelper.setItem('__todos__', todo)
// }, [todo])


function App() {
  const [todo, setTodo] = useState([])

  useEffect(() => {
    const getBackend = async () => {
      const { data } = await Config.get('/')
      setTodo(data)
    }
    getBackend()
  }, [])

  const addTodo = async (textFromInput) => {
    const add = { id: Date.now(), text: textFromInput, status: false }
    textFromInput && await Config.post(`/${add.id}`, add) && setTodo((prev) => [...prev, add])
  }

  const delTodo = async (idFromTodo) => {
    const remainsTodo = todo.filter((f) => f.id !== idFromTodo)
    await Config.delete(`/${idFromTodo}`)
    setTodo(remainsTodo)
  }

  const doneTodo = (idFromTodo) => {
    const remainsTodo = todo.map((m) => {
      if (m.id === idFromTodo) return { ...m, status: !m.status }
      return m
    })
    const requestBody = remainsTodo.reduce((acc,cur)=> {
      if(cur.id === idFromTodo) return {...cur}
      return acc
    },{})
    Config.put(`/${idFromTodo}`, requestBody)
    setTodo(remainsTodo)
  }

  const editTodo = (idFromTodo, textFromEdit) => {
    const remainsTodo = todo.map((m) => {
      if (m.id === idFromTodo) return { ...m, text: textFromEdit }
      return m
    })
    const requestBody = remainsTodo.reduce((acc,cur)=> {
      if(cur.id === idFromTodo) return {...cur}
      return acc
    },{})
    Config.put(`/${idFromTodo}`, requestBody)
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
