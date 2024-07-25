const Task = require('../models/Task');



exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





exports.createTask = async (req, res) => {
  const { title, description, column, dueDate } = req.body;

  try {
    const task = await Task.create({
      title,
      description,
      column,
      dueDate,
      user: req.user.id
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



exports.singleTask = async (req, res) => {
  
    try {
      const singleTask = await Task.findById(
        req.params.id,

      );
      res.status(200).json(singleTask);
    } catch (error) {
      console.error(error); // Log error to console for debugging
      res.status(500).json({ error: 'Failed to fetch task.' });
    }
  };

exports.updateTask = async (req, res) => {
  const { title, description, column, dueDate } = req.body;

  try {
    const task = await Task.findById(req.params.id);

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.column = column || task.column;
    task.dueDate = dueDate || task.dueDate;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }


    res.status(200).json({ message: 'Task removed.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
