const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const taskRouter = require('./task.js')

// router.post("/test", function (req, res) {
//   res.json({ requestBody: req.body });
// });

router.use('/session', sessionRouter);

router.use('/task', taskRouter)

router.use('/users', usersRouter);

module.exports = router;