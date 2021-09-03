const { Router } = require('express');
const express = require('express');
const {check} = require('express-validation');
const {handleValidationErrors} = require('../../utils/validation')
const expressAsyncHandler = require('express-async-handler');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {restoreUser, requireAuth} = require('../../utils/auth')
const { Task, Timer } = require('../../db/models');

//(C)CREATE A NEW TASK 
router.post('/new',
    requireAuth,
    asyncHandler(
        async (req, res) => {
                userId = req.body.userId 
                title = req.body.title 
                groupId = req.body.groupId
                description = req.body.description
                completed = req.body.completed
                reps = req.body.reps
                taskDate = req.body.taskDate

            const newTask = await Task.create({ 
                userId, 
                title, 
                groupId,
                description,
                completed,
                reps,
                taskDate
            })
            return await res.json({})
    }))

//(R)FETCH ALL TASKS
router.get('/:id/tasks',
    requireAuth,
    asyncHandler(
        async (req, res) => {
            userId = req.params.id
            const tasks = await Task.findAll(
                {
                    where: {userId},
                    model: Timer
              });
            return await res.json(tasks);
    })
);

//(U)EDITING A TASK,
router.put('/:taskId',
    requireAuth,
    asyncHandler(
        async(req, res) => {
            const inputTask = req.params.task
            taskId = req.params.taskId
            title = req.body.title
            groupId = req.body.groupId
            description = req.body.description
            completed = req.body.completed
            reps = req.body.reps
            taskDate = req.body.reps
            const task = await Task.findByPk(taskId)
            await task.update({title, description, groupId, completed, reps, taskDate})
            return res.json('')                              
}))

//(D)DELETE TASK
router.delete(
    '/:taskId',
    requireAuth,
    asyncHandler(
        async (req, res) => {
        taskId = req.params.taskId
            const task = await Task.findByPk(taskId)
            await task.destroy(); 
                return await res.json('Finito');
        })
    )

module.exports = router;
