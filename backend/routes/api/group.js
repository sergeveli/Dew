const { Router } = require('express');
const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const router = express.Router();

const asyncHandler = require('express-async-handler');

const { Group, Task } = require('../../db/models');

//(C)CREATE A NEW GROUP 
router.post('/new',
    asyncHandler(
        async (req, res) => {

                userId = req.body.userId
                taskId = req.body.taskId  

            const newGroup = await Group.create({ 
                userId,
                taskId
            })
            return await res.json({})
    }))

//(R)FETCH ALL GROUPS
router.get('/:id/groups',
    asyncHandler(
        async (req, res) => {
            userId = req.params.userId
            const groups = await Group.findAll(
                {include: 
              {
                model: Task
              }});
            return await res.json(groups);
    })
);

//(U)EDITING A GROUP,
router.put('/:groupId',
    asyncHandler(
        async(req, res) => {
            const inputGroup = req.params.group
            groupId = req.params.groupId
            taskId = req.params.taskId
            const group = await Group.findByPk(groupId)
            await group.update({groupId})
            return res.json('')                              
}))

//(D)DELETE GROUP
router.delete('/:groupId',
        asyncHandler(
            async (req, res) => {
            groupId = req.params.taskId
                const group = await Group.findByPk(groupId)
                await group.destroy(); 
                    return await res.json('Finito');
        })
    )

module.exports = router;
