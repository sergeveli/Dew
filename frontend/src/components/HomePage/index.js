import React, { useState, useEffect } from 'react';
import { addTask, deleteSingleTask, editSingleTask, getAllTasks } from '../../api';
import "./HomePage.css"

function HomePage(){
    const [showForm, setShowForm] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [taskList, setTaskList] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [editingTask, setEditingTask] = useState(null)
    

    const loadTasks = async () => {
        const tasks = await getAllTasks(1) //TO DO: CONNECT THIS TO AUTHORIZED USER
        setTaskList(tasks)
    }
    
    useEffect(async ()=>{
        loadTasks()
    }, [])

    const handleNewButton = () =>{
        setShowForm(true)
        setIsEditing(false)
    } 

    const handleDeleteButton = async(taskId) => {
        await deleteSingleTask(taskId)
        loadTasks()
    }

    const handleEditButton = async(task) =>{
        setEditingTask(task)
        setShowForm(true)
    }

    const startEdit = (task) =>{
        setEditingTask(task)
        setIsEditing(true)
        setShowForm(true)
    }

    const formSubmit = async (task) =>{
        setShowForm(false)
        if(isEditing){
            await editSingleTask(editingTask)
        } else {
            await addTask({title:inputValue, description:inputValue,completed:false, })
        }

        loadTasks()
    }

    const titleDidChange = async (title) =>{
        if(isEditing){
            setEditingTask({...editingTask, title})
        } else {
            setInputValue(title)
        }
    }

    return (
        <div class='list'>
            'What are we doing?'
            <button class='btn' onClick={handleNewButton}> New Task </button>
            {showForm &&
            <form onSubmit={formSubmit}>
                <input
                type='text'
                value={isEditing ? editingTask.title : inputValue}
                onChange={(e)=> titleDidChange(e.target.value)}
                required
                />
                <button class='btn' type='submit'>Save</button>
            </form>}
            {taskList.map((task) => (  ///add a key prop (typically id) to each one
                <div>
                    {task.title}
                    <button type='submit' class='btn2' onClick={()=>handleDeleteButton(task.id)}>Delete</button>
                    <button type='submit' class='btn2' onClick={()=>startEdit(task)}>Edit</button>
                </div>
            ))}
        </div>
    )
}

export default HomePage