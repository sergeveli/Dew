import React, { useState, useEffect } from 'react';
import { addTask, deleteSingleTask, editSingleTask, getAllTasks } from '../../api';

function HomePage(){
    const [showForm, setShowForm] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [taskList, setTaskList] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [editingTask, setEditingTask] = useState(null)
    

    const loadTasks = async () => {
        const tasks = await getAllTasks(1)
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
        <div>
            'What are we doing?'
            <button onClick={handleNewButton}> New Task </button>
            {showForm &&
            <form onSubmit={formSubmit}>
                <input
                type='text'
                value={isEditing ? editingTask.title : inputValue}
                onChange={(e)=> titleDidChange(e.target.value)}
                required
                />
                <button type='submit'>Save</button>
            </form>}
            {taskList.map((task) => (
                <div>
                    {task.title}
                    <button type='submit' onClick={()=>handleDeleteButton(task.id)}>Delete</button>
                    <button type='submit' onClick={()=>startEdit(task)}>Edit</button>
                </div>
            ))}
        </div>
    )
}

export default HomePage