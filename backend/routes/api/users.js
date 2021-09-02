const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Timer, Task, Group } = require('../../db/models');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('userName')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('userName')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

// Sign up
router.post(
  '',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, userName } = req.body;
    
    const user = await User.signup({ email, userName, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

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
//(R) FETCH ALL GROUPS
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

module.exports = router;