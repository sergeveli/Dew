import React, { useState, useEffect, useSelector } from 'react';
import { addTask, deleteSingleTask, editSingleTask, getAllTasks, addGroup, getAllGroups, editSingleGroup, deleteSingleGroup} from '../../api';
import "./HomePage.css"

function HomePage(props){
    const user = props.user
    const [showForm, setShowForm] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [taskList, setTaskList] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [editingTask, setEditingTask] = useState(null)

    const [showGroupForm, setShowGroupForm] = useState(false)
    const [groupList, setGroupList] = useState([])
    const [editingGroup, setEditingGroup] = useState(null)
    const [isEditingGroup, setIsEditingGroup] = useState(false)
    
    

    const loadTasks = async () => {
        const tasks = await getAllTasks(user.id) //TO DO: CONNECT THIS TO AUTHORIZED USER
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



    const loadGroups = async () => {
        const groups = await getAllGroups(user) //TO DO: CONNECT THIS TO AUTHORIZED USER
        setGroupList(groups)
    }

    useEffect(async ()=>{
        loadGroups()
    }, [])

    const newGroupButton = () =>{
        setShowGroupForm(true)
        setIsEditingGroup(false)
    }
    
    const handleGroupDeleteButton = async(groupId) => {
        await deleteSingleGroup(groupId)
        loadGroups()
    }

    const handleGroupEditButton = async(group) =>{
        setEditingGroup(group)
        setShowGroupForm(true)
    }

    const startGroupEdit = (group) =>{
        setEditingGroup(group)
        setIsEditingGroup(true)
        setShowGroupForm(true)
    }

    const groupFormSubmit = async (group) =>{
        setShowGroupForm(false)
        if(isEditingGroup){
            await editSingleGroup(editingGroup)
        } else {
            await addGroup({name:inputValue})
        }

        loadGroups()
    }

    const groupTitleDidChange = async (group) =>{
        if(isEditingGroup){
            setEditingGroup({...editingGroup, group})
        } else {
            setInputValue(group.name)
        }
    }
    return (
        <div className='list'>
            <h1>'What's Next?'</h1>
            <button className='btn' onClick={handleNewButton}> New Task </button>
            {showForm &&
            <form onSubmit={formSubmit}>
                <input
                type='text'
                value={isEditing ? editingTask.title : inputValue}
                onChange={(e)=> titleDidChange(e.target.value)}
                required
                />
                <button className='btn' type='submit'>Save</button>
            </form>}
            {taskList.map((task) => (  ///add a key prop (typically id) to each one
                <div key={task.id}>
                    {task.title}
                    <button type='submit' className='btn' onClick={()=>handleDeleteButton(task.id)}>Delete</button>
                    <button type='submit' className='btn' onClick={()=>startEdit(task)}>Edit</button>
                </div>
            ))}
        </div>
    )
}

export default HomePage