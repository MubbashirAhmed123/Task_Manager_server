const express = require('express');
const { getTasks, createTask, updateTask, deleteTask, patchTask, singleTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const { getUser } = require('../controllers/userController');
const router = express.Router();

router.route('/').get(protect, getUser)


module.exports = router;
