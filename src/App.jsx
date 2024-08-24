import './App.css'
import TodoList from './components/ToDoList'
import EditTaskContext from './components/EditTaskContext'
import { useState } from 'react'  
function App() {
  let [appear , SetAppere] = useState(false) ;
  let [ID , setID] = useState(null) ;
  return (
    <EditTaskContext.Provider value={{appearance:appear , setAppereance:SetAppere , ID : ID , setID : setID }}>
      <div id='FinalApp'>
        <TodoList></TodoList>
      </div>
    </EditTaskContext.Provider>
  )
}

export default App
