import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import { addTask, deleteSingleTask, editSingleTask, getAllTasks, addGroup, getAllGroups, editSingleGroup, deleteSingleGroup} from '../../api';
import "./HomePage.css"
import { Modal } from '../../context/Modal';

function HomePage(){
    const user = useSelector(state => state.session.user)
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
    const [selectedGroupId, setSelectedGroupId] = useState(null)

    
    const getTaskList = () => {
        if(selectedGroupId){
            return taskList.filter((task) => task.groupId === selectedGroupId)
        }
        else return taskList
    }

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
        loadGroups()
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
            await addTask({title:inputValue, description:inputValue, completed:false, groupId:groupInputValue || null}, user.id)
            setInputValue(null)
            setGroupInputValue(null)
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
        setEditingGroup(null)
    }
    
    const handleGroupDeleteButton = async(groupId) => {
        await deleteSingleGroup(groupId)
        await loadGroups()
        setSelectedGroupId(null)
    }

    const groupById = (groupId) => {
        return groupList.find(group => group.id === groupId) || null
    }

    const startGroupEdit = (groupId) =>{
        setEditingGroup(groupById(groupId))
        setIsEditingGroup(true)
        setShowGroupForm(true)
    }

    const groupFormSubmit = async () =>{
        setShowGroupForm(false)
        if(isEditingGroup){
            await editSingleGroup(editingGroup)
        } else {
            await addGroup({name:groupInputValue}, user.id)
        }
        await loadGroups()
    }


    const groupDidChange = async (groupId) =>{
        if(isEditing){
            setEditingTask({...editingTask, groupId: (groupId || null)})
        } else {
            setGroupInputValue(groupId || null)
        }
    }

    const groupTitleDidChange = async (name) =>{
        if(isEditingGroup){
            setEditingGroup({...editingGroup, name})
        } else {
            setGroupInputValue(name)
        }
    }

    const didSelectGroupId = (groupId) =>{
        setSelectedGroupId(groupId)
    }

    const selectedGroup = () => {
        if (selectedGroupId) {
            return groupById(selectedGroupId)
        } else {
            return null
        }
    }


    return (
        <div className='list'>
            <h1>WHAT'S NEXT?</h1>

            <button className='btn' onClick={handleNewButton}> New Task </button>

            <button className='btn' onClick={newGroupButton}> New Group </button>

            <div className='header'>
                {!!selectedGroup() && <h2 style={{display: 'block'}}>{selectedGroup().name}</h2>}

                <select 
                    onChange={(e)=>didSelectGroupId(parseInt(e.target.value))} 
                    name='grouplist'>
                    <option value=''>All</option>
                    {groupList.map((group)=>(
                    <option 
                    key = {group.id}
                    selected={selectedGroupId === group.id} 
                    value={group.id}>{group.name}
                    </option>
                    ))}
                </select>

                {!!selectedGroup() && (
                    <div>
                        <button className='groupbuttons' type='submit' onClick={()=>startGroupEdit(selectedGroupId)}>Edit</button>
                        <button className='groupbuttons' type='submit' onClick={()=>handleGroupDeleteButton(selectedGroupId)}>Delete</button>
                    </div>
                )}
            </div>

            
            {getTaskList().map((task) => (  ///add classnames for styling
                <div key={task.id}>
                    {task.title}
                    <button type='submit' className='btn' onClick={()=>handleDeleteButton(task.id)}>Delete</button>
                    <button type='submit' className='btn' onClick={()=>startEdit(task)}>Edit</button>
                </div>
            ))}

            {showForm &&
            <Modal onClose={() => setShowForm(false)}>
            <form onSubmit={formSubmit}>
        <div className='task-dropdown'>
            <select onChange={(e)=> groupDidChange(e.target.value)} name="groups">
                <option value=''>All</option>
                {groupList.map((group)=>(<option key={ group.id } selected={isEditing && editingTask.groupId === group.id} value={group.id}>{group.name}</option>))}
            </select>
            <div className='inputbox'>
                <textarea
                type='text'
                maxLength='130'
                value={isEditing ? editingTask.title : inputValue}
                onChange={(e)=> titleDidChange(e.target.value)}
                required
                />
                <button className='btn' type='submit'>Save</button>
            </div>
        </div>
            </form>
            </Modal>}

            {showGroupForm &&
            <Modal onClose={() => setShowGroupForm(false)}>
            <form onSubmit={groupFormSubmit}>
            <div className='inputbox'>
                <input
                type='text'
                value={isEditingGroup ? editingGroup.name : groupInputValue}
                onChange={(e)=> groupTitleDidChange(e.target.value)}
                required
                />
            
                <button className='btn' type='submit'>Save</button>
            </div>
            </form>
            </Modal>}
        </div>
    )
}

export default HomePage