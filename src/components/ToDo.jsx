import React, { useContext, useEffect, useState } from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import "./styles/ToDo.css"
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import DoneIcon from '@mui/icons-material/DoneOutlined';
import TasksContext from './TasksContext';
import { toDoContext } from './ToDoContext';
import EditAppereContext from './EditTaskContext';

export default function ToDo({id , title , description , done}) {
    let [expand , SetExpand] = useState() ;
    let handelEnter = ()=>{
        SetExpand(true);
    }
    let handelLeave = ()=>{
        SetExpand(null) ; 
    }
    let TaskCtx = useContext(TasksContext);
    let ToDoCtx  = useContext(toDoContext);
    let handelDeleteClick = (DelteID)=>{
        let temp = [] ;
        for(let i =0 ; i < TaskCtx.allTasks.length ; i++ ){
            if(TaskCtx.allTasks[i].id != DelteID){
                temp.push(TaskCtx.allTasks[i]) ;
            }
        }
        TaskCtx.setAllTasks(temp);
        localStorage.setItem("todos" , JSON.stringify(temp) ); 
    }
    let EditContext = useContext(EditAppereContext)
    
    let handelEditClick = (EditID)=>{
        EditContext.setID(EditID) ; 
        EditContext.setAppereance(true);
    }
    let handelDoneClick = (DoneID) => {
        for(let i = 0 ; i < TaskCtx.allTasks.length ; i ++ ){
            if(TaskCtx.allTasks[i].id == DoneID){
                TaskCtx.allTasks[i].done = !TaskCtx.allTasks[i].done  ;
            }
        }
        let fromStorage = JSON.parse(localStorage.getItem("todos")) ;
        for(let i =0 ; i < fromStorage.length ; i++ ){
            if(fromStorage[i].id == DoneID){
                fromStorage[i].done = ! fromStorage[i].done ;
            }
        }
        localStorage.setItem("todos" , JSON.stringify(fromStorage) )
    }
    return (
            <Stack onMouseEnter={handelEnter} justifyContent={"space-between"} onMouseLeave={handelLeave} className='task' direction={"row"} alignItems={"center"} sx={{transition:"transform 0.5s ease" , transform : expand? "scale(1.05)" : "scale(1)" }}>
                
                <Stack className='content' justifyContent={"center"} alignItems={"self-start"} spacing={3} >
                    <h1>{title}</h1>
                    <p>{description}</p>
                </Stack>
                
                <Stack spacing={2} className='btns' direction={"row"} alignItems={"self-end"} >
                    <DoneIcon className='DoneIcon' onClick={()=>{handelDoneClick(id)}} />
                    <EditIcon className='EditIcon'  onClick={()=>{handelEditClick(id)}}  />
                    <DeleteIcon className='DeleteIcon' onClick={()=>{handelDeleteClick(id)}} />
                </Stack>
                
            </Stack>
)
}
