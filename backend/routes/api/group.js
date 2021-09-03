const { Router } = require('express');
const express = require('express');
const {check} = require('express-validator');
const {handleValidationErrors} = require('../../utils/validation')
const expressAsyncHandler = require('express-async-handler');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {restoreUser, requireAuth} = require('../../utils/auth');
const { Group, Task } = require('../../db/models');

//(C)CREATE A NEW GROUP 
router.post('/new',
    asyncHandler(
        async (req, res) => {
                name = req.body.name
                userId = req.body.userId

            const newGroup = await Group.create({
                name, 
                userId,
            })
            return await res.json({})
    }))

// //(R)FETCH ALL GROUPS
// router.get('/:id/groups',
//     asyncHandler(
//         async (req, res) => {
//             userId = req.params.userId
//             const groups = await Group.findAll(
//                 {include: 
//               {
//                 model: Task
//               }});
//             return await res.json(groups);
//     })
// );

//(U)EDITING A GROUP,
router.put('/:groupId',
    asyncHandler(
        async(req, res) => {
            groupId = req.params.groupId
            name = req.body.name
            const group = await Group.findByPk(groupId)
            await group.update({name})
            return res.json('')                              
}))

//(D)DELETE GROUP
router.delete('/:groupId',
        asyncHandler(
            async (req, res) => {
            groupId = req.params.groupId
                const group = await Group.findByPk(groupId, 
                    {include:
                {model: Task}
                })
                if(group){
                await Promise.all(group.Tasks.map((task)=>task.update({groupId: null})))
                await group.destroy(); 
                    return await res.json('Finito');
                }
        })
    )

module.exports = router;
