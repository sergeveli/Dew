import React, { useState, useEffect } from 'react';
import { addTask, getAllTasks } from '../../api';

function HomePage(){
    const [showNewForm, setShowNewForm] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [taskList, setTaskList] = useState([])

    const loadTasks = async () => {
        const tasks = await getAllTasks(1)
        setTaskList(tasks)
    }
    
    useEffect(async ()=>{
        loadTasks()
    }, [])

    const handleNewButton = () =>{
        setShowNewForm(true)
    } 

    const formSubmit = async () =>{
        setShowNewForm(false)
        await addTask({title:inputValue, description:inputValue,completed:false, })
        loadTasks()
    }

    return (
        <div>
            'What are we doing?'
            <button onClick={handleNewButton}> New Task </button>
            {showNewForm &&
            <form onSubmit={formSubmit}>
                <input
                type='text'
                value={inputValue}
                onChange={(e)=>setInputValue(e.target.value)}
                required
                />
                <button type='submit'>Add</button>
            </form>}
            {taskList.map((task) => (
                <div>
                    {task.title}
                </div>
            ))}
        </div>
    )
}

export default HomePage