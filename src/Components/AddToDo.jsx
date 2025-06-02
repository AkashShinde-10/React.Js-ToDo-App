import React from 'react'
import styles from './AddToDo.module.css'


function AddToDo({input, addTodo, setInput, setFilter, filter, handleKey, counts}) {
  
  return (
    <div className={styles.mainContainer}>
       
    <div className={styles.inptContainer}>
      <input list='todoList' placeholder='Add a new task...' className={styles.inpt} type="text" value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={handleKey}/>
      <datalist id='todoList'>
        <option value="Buy groceries" />
        <option value="Study for exam" />
        <option value="Clean the house" />
        <option value="Read a book" />
        <option value="Check emails" />
        <option value="Workout" />
        <option value="Call mom" />
      </datalist>
      <button className={styles.addBtn}  onClick={addTodo}>Add</button>
    </div>
     <div className={styles.filterBtns}>
        {["All", "Active", "Completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`${styles.filterBtn} ${filter === f ? styles.active : ""}`}
          >
            {f} ({counts[f]})
          </button>
        ))}
      </div>
    </div>
  )
}

export default React.memo(AddToDo)