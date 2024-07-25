const express = require('express');
const { getTasks, createTask, updateTask, deleteTask, patchTask, singleTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .get(protect, getTasks)
  .post(protect, createTask);

router.route('/:id')
  .get(protect,singleTask)
  .put(protect, updateTask)
  .delete(protect, deleteTask);

module.exports = router;
