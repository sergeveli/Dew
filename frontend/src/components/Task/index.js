import { set } from 'js-cookie'
import React, {useEffect, useState} from 'react'

import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import { useParams } from 'react-router-dom'

import './task.css'

const TaskComponent = ({task, onEdit, onDelete, provided, innerRef, snapshot, getItemStyle}) =>{
    return (
            <div key={task.id}               
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={innerRef} 
                    style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                                    )}>
                {task.title}
                <button type='submit' className='btn' onClick={onDelete}>Delete</button>
                <button type='submit' className='btn' onClick={onEdit}>Edit</button>
            </div>
    )}


export default TaskComponent;