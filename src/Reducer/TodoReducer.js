
function reducer(state, action){
  switch(action.type){
    case 'AddToDo':
      return [
        ...state,
        {
          id: Date.now(),
          title: action.title,
          complete: false
        }
      ]

    case 'DeleteToDo':
      return state.filter((todo)=> todo.id !== action.id);

    case 'EditToDo':
      return state.map((todo)=>(
        todo.id === action.id ? {...todo, title: action.title} : todo
      ))

    case 'Complete':
      return state.map((todo)=>(
        todo.id === action.id ? {...todo, complete: !todo.complete} : todo
      ))

    default:
      return state
  }
}

export default reducer