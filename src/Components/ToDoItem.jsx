import React from 'react'
import styles from './ToDoItem.module.css'

function ToDoItem({
  todo,
  isEditing,
  editText,
  setEditText,
  onStartEdit,
  onEdit,
  onCancelEdit,
  onComplete,
  onDelete
}) {
  
  return (
    <div className={styles.mainContainer}>
      <label className={styles.itemLabel}>
        <input type="checkbox" checked={todo.complete} onChange={onComplete} disabled={isEditing}/>
        {todo.complete ? <del>{todo.title}</del> : todo.title}
      </label>

       <input
        type="text"
        className={`${styles.editInput} ${isEditing ? styles.show : styles.hide}`}
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        autoFocus={isEditing}
        onKeyDown={(e)=> {if(e.key === "Enter"){
                onEdit();
        }}}
      />
      

      {isEditing ? 
         (
          <div className={styles.itemBtns}>
          <button disabled={!editText.trim()} style={{backgroundColor:'#2ecc71' , cursor: !editText.trim() ? 'not-allowed' : 'pointer',
    opacity: !editText.trim() ? 0.5 : 1}} onClick={onEdit}>Save</button>
          <button style={{backgroundColor:'#e74c3c'}} onClick={onCancelEdit}>Cancel</button>
          </div>
         ) 
         :
         (<div className={styles.itemBtns}>
        <button style={{backgroundColor:'red'}} onClick={onDelete}>X</button>
        <button  onClick={onStartEdit} disabled={todo.complete && !isEditing} style={{ cursor: (todo.complete && !isEditing) ? 'not-allowed' : 'pointer', opacity: (todo.complete && !isEditing) ? 0.7 : 1 , backgroundColor:'#3498db'}}> Edit </button>

         </div>)
      }
    </div>
  )
}

export default React.memo(ToDoItem)
