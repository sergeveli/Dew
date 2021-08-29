const { Router } = require('express');
const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const router = express.Router();

const asyncHandler = require('express-async-handler');

const { Task, Timer } = require('../../db/models');

//(C)CREATE A NEW TASK 
router.post('/new',
    asyncHandler(
        async (req, res) => {
                userId = req.body.userId 
                title = req.body.title 
                description = req.body.description
                completed = req.body.completed
                reps = req.body.reps
                taskDate = req.body.taskDate

            const newTask = await Task.create({ 
                userId, 
                title, 
                description,
                completed,
                reps,
                taskDate
            })
            return await res.json({})
    }))

//(R)FETCH ALL TASKS
router.get('/:id/tasks',
    asyncHandler(
        async (req, res) => {
            userId = req.params.id
            const tasks = await Task.findAll(
                {include: 
              {
                model: Timer
              }});
            return await res.json(tasks);
    })
);

//(U)EDITING A TASK,
router.put('/:id/tasks/:taskId',
    asyncHandler(
        async(req, res) => {
            taskId = req.params.taskId
            title = req.body.title
            description = req.body.description
            const task = await Task.findByPk(taskId)
            await task.update({title, description, completed, reps, taskDate})
            return res.json('')                              
}))

//(D)DELETE TASK
router.delete('/:id/tasks/:taskId',
        asyncHandler(
            async (req, res) => {
            taskId = req.params.taskId
                const task = await Task.findByPk(taskId)
                await task.destroy(); 
                    return await res.json('Finito');
        })
    )

module.exports = router;
