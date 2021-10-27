import { set } from 'js-cookie'
import React, {useEffect, useState} from 'react'

import { useDrag } from 'react-dnd'
import { useParams } from 'react-router-dom'

import './task.css'

const TaskComponent = ({task, onEdit, onDelete}) =>{
    return (
                <div key={task.id}>
                    {task.title}
                    <button type='submit' className='btn' onClick={onDelete}>Delete</button>
                    <button type='submit' className='btn' onClick={onEdit}>Edit</button>
                </div>
    )}



export default TaskComponent;