import { Button, Container, Stack, TextField } from "@mui/material"
import "./styles/EditToDo.css"
import React, { useContext, useState } from 'react'
import EditTaskContext from "./EditTaskContext"
import TasksContext from "./TasksContext"
export default function EditToDo() {

  let tasks = useContext(TasksContext) ;
  let EditContext = useContext(EditTaskContext) ;
  
  let [title , setTitle] = useState("") ;
  let [description , setDescription] = useState("") ;

  let EditBtnHandler = ()=>{
    for(let i = 0 ; i < tasks.allTasks.length ; i ++){

      if(tasks.allTasks[i].id == EditContext.ID && (title || description)){
        if(title == ""){ 
          tasks.allTasks[i].description = description ;
        }
        else if(description == ""){
          tasks.allTasks[i].title = title ;
        }
        else{
          tasks.allTasks[i].title = title ;
          tasks.allTasks[i].description = description ;
        }
      };
    }
    localStorage.setItem("todos" , JSON.stringify(tasks.allTasks) )
    
    setTitle("") ;
    setDescription("");
    EditContext.setAppereance(false) ;
  }
  
  
  return (
      <Container style={{backgroundColor: "#999" , display: EditContext.appearance ? "block" : "none" }} id="EditToDo">
        <h2>Edit Task . . . !</h2>
        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} sx={{flexGrow:1}}>
          <h3>change title </h3>
          <TextField variant="outlined" value={title} onChange={(e)=>{setTitle(e.target.value)}} size="small" sx={{width:"50%"}}></TextField>
        </Stack>

        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} sx={{flexGrow:1}}>
          <h3>change description </h3>
          <TextField  variant="outlined" value={description} onChange={(e)=>{setDescription(e.target.value)}} size="small" sx={{width:"50%"}}></TextField>
        </Stack>
        <Button size='small'variant="contained" onClick={(e)=>{EditBtnHandler()}} >Edit</Button>
      </Container>
  )
}
