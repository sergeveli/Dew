import React, { useState, useEffect } from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'
import {useSelector} from 'react-redux';
import { addTask, deleteSingleTask, editSingleTask, getAllTasks, addGroup, getAllGroups, editSingleGroup, deleteSingleGroup} from '../../api';
import "./HomePage.css"
import { Modal } from '../../context/Modal';
import TaskComponent from '../Task';

function HomePage(){
    const [tasks, setTasks] = useState()
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


    
    const getTaskList = () => {///for changing task groups ---> figure how to check to see if groupId is there x if so, autosets tasks to have that groupId and render the tasks from the task state///
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


    const grid = 8

    
    const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,
        border: '1px solid #20C20E',
        display: 'flex',
        flexDirection: 'column',
        
    // change background colour if dragging
        // background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
        ...draggableStyle
    });

    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? "lightblue" : "black", padding: grid, width: 250
    });

    const onEnd = async (result) => {
        const source = taskList[result.source.index]
        const destination = taskList[result.destination.index]
        const sourceId = source.id
        const destinationId = destination.id
        destination.id = sourceId
        source.id = destinationId

        await editSingleTask(destination)
        await editSingleTask(source)

        loadTasks()
    }

    useEffect(()=>{
        getTaskList()

        // setTaskList((prev)=>{
        //     prev.sort(function (a, b) {
        //     return a.id - b.id;
        //     });
        // })
    }, [])

    useEffect(() =>{
        setTasks(taskList.filter((task) => task.groupId === selectedGroupId))
        
    }, [selectedGroupId])

    if(!taskList){
        return null
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
                    value={selectedGroupId === group.id} ///
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

            <DragDropContext onDragEnd={onEnd}>
                <Droppable droppableId='tasks'>
                    {(provided, snapshot)=>(
                        <div className='tasks' 
                            {...provided.droppableProps} 
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}> 
                            
                            {taskList ? taskList.map((task, i) => (  ///add classnames for styling
                                <Draggable draggableId={`${task.id}`} key={task.id} index={i}>
                                    {(provided, snapshot)=>(
                                    <TaskComponent provided={provided} snapshot={snapshot} task={task}
                                    getItemStyle={getItemStyle} innerRef={provided.innerRef} 
                                    onEdit={()=>startEdit(task)} 
                                    onDelete={()=>handleDeleteButton(task.id)}/>
                                    )}
                                </Draggable>
                            )):tasks.map((task, i) => (  ///add classnames for styling
                                <Draggable draggableId={`${task.id}`} key={task.id} index={i}>
                                    {(provided, snapshot)=>(
                                    <TaskComponent provided={provided} snapshot={snapshot} task={task}
                                    getItemStyle={getItemStyle} innerRef={provided.innerRef} 
                                    onEdit={()=>startEdit(task)} 
                                    onDelete={()=>handleDeleteButton(task.id)}/>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                            </div>)
                    }
                </Droppable>
            </DragDropContext>

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