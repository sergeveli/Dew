import React, { useState, useEffect, useSelector } from 'react';
import { addTask, deleteSingleTask, editSingleTask, getAllTasks, addGroup, getAllGroups, editSingleGroup, deleteSingleGroup} from '../../api';
import "./HomePage.css"
import { Modal } from '../../context/Modal';

function HomePage(props){
    const user = props.user
    const [showForm, setShowForm] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [taskList, setTaskList] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [editingTask, setEditingTask] = useState(null)
    const [isGroupId, setIsGroupId] = useState(null)

    const [showGroupForm, setShowGroupForm] = useState(false)
    const [groupList, setGroupList] = useState([])
    const [editingGroup, setEditingGroup] = useState(null)
    const [isEditingGroup, setIsEditingGroup] = useState(false)
    const [groupInputValue, setGroupInputValue] = useState('')

    
    

    const loadTasks = async () => {
        const tasks = await getAllTasks(user.id) //TO DO: CONNECT THIS TO AUTHORIZED USER
        setTaskList(tasks)
    }

    const loadGroups = async () => {
        const groups = await getAllGroups(user.id)
        setGroupList(groups)
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


    const groupDidChange = async (groupId) =>{
        if(isEditing){
            setEditingTask({...editingTask, groupId})
        } else {
            setGroupInputValue(groupId)
        }
    }

    const groupTitleDidChange = async (name) =>{
        if(isEditingGroup){
            setEditingGroup({...editingGroup, name})
        } else {
            setGroupInputValue(name)
        }
    }
    return (
        <div className='list'>
            <h1>'What's Next?'</h1>

            <button className='btn' onClick={handleNewButton}> New Task </button>
            {showForm &&
            <Modal onClose={() => setShowForm(false)}>
            <form onSubmit={formSubmit}>
            <select onChange={(e)=> groupDidChange(e.target.value)} name="groups">
                <option value={null}>No Group</option>
                {groupList.map((group)=>(<option selected={isEditing && editingTask.groupId === group.id} value={group.id}>{group.name}</option>))}
            </select>
                <input
                type='text'
                value={isEditing ? editingTask.title : inputValue}
                onChange={(e)=> titleDidChange(e.target.value)}
                required
                />
                <button className='btn' type='submit'>Save</button>
            </form>
            </Modal>}

            <button className='btn' onClick={newGroupButton}> New Group </button>
            {showGroupForm &&
            <Modal onClose={() => setShowGroupForm(false)}>
            <form onSubmit={groupFormSubmit}>
                <input
                type='text'
                value={isEditingGroup ? editingGroup.name : groupInputValue}
                onChange={(e)=> groupDidChange(e.target.value)}
                required
                />
                <button className='btn' type='submit'>Save</button>
            </form>
            </Modal>}


            {taskList.map((task) => (  
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