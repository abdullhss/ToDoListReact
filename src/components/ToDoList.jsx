import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ToDo from "./ToDo.jsx"
import "./styles/ToDoList.css"
import TasksContext from './TasksContext.jsx'
import { toDoContext } from './ToDoContext.jsx';
import EditToDo from './EditToDo'
import { useEffect } from 'react';
export default function TodoList() {

    let [newTask , setNewTask] = useState({id:null , title:null , description:null , done:false});
    let [allTasks , setAllTasks] = useState([]);
    let [nextId , setNextId] = useState(0);
    let addTaskHandler = ()=>{
        let temp = [...allTasks , newTask ] ; 
        setAllTasks(temp)
        localStorage.setItem("todos" , JSON.stringify(temp) ); 
        setNewTask({id:null , title:'' , description:'' , done:false})
    }
    let [type , setType] = useState("all") ;
    let typeHandler = (typeParam)=>{
        let temp = [] ;
        if(typeParam == "all" ){
            allTasks.map((m)=>{
                temp.push(
                    <toDoContext.Provider key={m.id} value={{num:m.id}}>
                            <ToDo id={m.id} title={m.title} description={m.description} done={false} ></ToDo>                                    
                    </toDoContext.Provider>
                )
            })
        }
        else if(typeParam == "done"){
            allTasks.map((m)=>{
                if(m.done){
                    temp.push(
                        <toDoContext.Provider key={m.id} value={{num:m.id}}>
                                <ToDo id={m.id} title={m.title} description={m.description} done={false} ></ToDo>                                    
                        </toDoContext.Provider>
                    )
                }
            })
        }
        else {
            allTasks.map((m)=>{
                if(! m.done){
                    temp.push(
                        <toDoContext.Provider key={m.id} value={{num:m.id}}>
                                <ToDo id={m.id} title={m.title} description={m.description} done={false} ></ToDo>                                    
                        </toDoContext.Provider>
                    )
                }
            })
        }
        return temp
    }
    let GetFromlocalStorage = ()=>{
        let fromStorage = JSON.parse(localStorage.getItem("todos")) ?? [];
        setAllTasks(fromStorage);
    }
    useEffect(GetFromlocalStorage , []) ; 
  return (
        <TasksContext.Provider value={{ allTasks , setAllTasks }}>
            <Container maxWidth="sm" id="AppContaner">
                <h1>my tasks</h1>
                    <Stack direction={"row"} spacing={2} justifyContent={"center"} >
                        <Button size="small" variant="outlined" onClick={()=>{setType("all")}}> All Tasks </Button>
                        <Button size="small" variant="outlined" onClick={()=>{setType("done")}} >Done</Button>
                        <Button size="small" variant="outlined" onClick={()=>{setType("yet")}} >not Yet</Button>
                    </Stack>
                <div>
                    {typeHandler(type)}
                </div>
                <Stack spacing={1} direction="row" variant="contained" justifyContent="center" >
                    <TextField size='small' label="Add New Task" value={newTask.title} onChange={(e)=>{setNewTask({ id:nextId , title:e.target.value , description:null , done:false}) ; setNextId( nextId + 1 )} } variant="outlined" sx={{flexGrow:6 }}/>
                    <Button size='small'variant="contained" onClick={()=>{if(newTask.title )addTaskHandler()}}>add task</Button>
                </Stack>
                
                <EditToDo ></EditToDo>
            </Container>
        </TasksContext.Provider>
  )
}