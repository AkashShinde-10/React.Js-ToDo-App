import React, { useEffect, useReducer, useState } from 'react'
import AddToDo from './Components/AddToDo'
import reducer from './Reducer/TodoReducer'
import ToDoItem from './Components/ToDoItem'
import styles from './ToDoApp.module.css'
import Toast from './Components/Toast'

const saved = localStorage.getItem('todos')
const initialState = saved ? JSON.parse(saved) : [{id:1, title: "one", complete: false}]

function ToDoApp() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [input, setInput] = useState('')
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState('')
  const [filter, setFilter] = useState("All")
  const [error, setError] =useState('')

  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(state))
  },[state])

  useEffect(() => {
  if (error) {
    const timer = setTimeout(() => setError(''), 3000);
    return () => clearTimeout(timer);
  }
}, [error]);


  function handleAddTodo(){
    const inpt = input.trim();
    const isDuplicate = state.some((todo)=>todo.title.toLowerCase() === inpt.toLowerCase());

    if(!inpt){
      setError("Please enter a task.");
      return;
    }

    if(isDuplicate){
      setError("This task already exists.");
      setInput("")
      return;
    }
  
    dispatch({type: 'AddToDo', title: inpt})
    setInput('')
    setError('')
    
  }

  function handleEdit(id){
    const inpt = editText.trim();
    const duplicateText = state.some((todo)=> todo.title.toLowerCase() === editText.toLowerCase() && todo.id !== id);

    if(!inpt){
      setError("Task cannot be empty.");
      return;
    }

    if(duplicateText){
      setError("This task already exists.");
      setEditText("")
      return;
    }

    dispatch({type: 'EditToDo', id, title: editText})
    setEditId(null)
    setEditText('')
    setError('')
  }

  function handleDelete(todo){
    dispatch({type: 'DeleteToDo', id: todo.id})
  }

  function handleComplete(todo){
    dispatch({type: "Complete", id: todo.id})
  }

  const filteredToDos = state.filter((todo)=>{
    if (filter === "Active") return !todo.complete;
    if (filter === "Completed") return todo.complete;
    return true
  })

  function handleKey(e){
    if (e.key === 'Enter'){
      handleAddTodo()
    }
  }

  const allCount = state.length;
  const activeCount = state.filter((todo)=> !todo.complete).length
  const completedCount = state.filter((todo)=> todo.complete).length

  const counts = {
    'All': allCount,
    'Active': activeCount,
    'Completed': completedCount
  }
  
  return (
    <div className={styles.heroContainer}>
      <h1>To Do List</h1>
      <Toast msg={error} />
      <AddToDo input={input} addTodo={handleAddTodo} setInput={setInput} setFilter={setFilter} filter={filter} handleKey={handleKey} counts = {counts}/>
      
      <h2>{filteredToDos.length > 1? `${filteredToDos.length} Tasks` : `${filteredToDos.length} Task`}</h2>
      {
       filteredToDos.length > 0 ? 
       ( filteredToDos.map((todo)=>
         ( <ToDoItem 
          key={todo.id}
          todo = {todo}
          isEditing={editId === todo.id}
          editText={editText}
          setEditText ={setEditText}
          onComplete={()=>handleComplete(todo)}
          onDelete= {()=>handleDelete(todo)}
          onStartEdit={() => {
           setEditId(todo.id)
           setEditText(todo.title)
           }}
          onEdit={() => editText.trim() ? handleEdit(todo.id) : input}
          onCancelEdit={() => {
           setEditId(null)
           setEditText('')
          }}
          
          />
        )))
        : 
        (
          <p className={styles.noItemMsg}>
            {filter === 'Active' ? 'No Active Task' : filter === "Completed" ? 'No Completed Task' : 'No Task added yet'}
          </p>
        )
      }
    </div>
  )
}

export default ToDoApp