const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [
  {
    id: '1',
    title: 'Complete React Native Assignment',
    description: 'Finish the To-Do application',
    dateTime: '14 Sep 2026, 5:00 PM',
    deadline: '14 Sep 2026, 7:00 PM',
    priority: 'High',
    completed: false,
  },
];

// HOME TEST
app.get('/', (req, res) => {
  res.send('Todo API is running successfully');
});

// GET ALL TASKS
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// ADD TASK
app.post('/api/tasks', (req, res) => {
  const {
    title,
    description,
    dateTime,
    deadline,
    priority,
  } = req.body;

  const newTask = {
    id: Date.now().toString(),
    title,
    description,
    dateTime,
    deadline,
    priority: priority || 'Medium',
    completed: false,
  };

  tasks.unshift(newTask);

  res.status(201).json(newTask);
});

// UPDATE / COMPLETE TASK
app.put('/api/tasks/:id', (req, res) => {
  const task = tasks.find(
    item => item.id === req.params.id
  );

  if (!task) {
    return res.status(404).json({
      message: 'Task not found',
    });
  }

  Object.assign(task, req.body);

  res.json(task);
});

// DELETE TASK
app.delete('/api/tasks/:id', (req, res) => {
  const index = tasks.findIndex(
    item => item.id === req.params.id
  );

  if (index === -1) {
    return res.status(404).json({
      message: 'Task not found',
    });
  }

  tasks.splice(index, 1);

  res.json({
    message: 'Task deleted successfully',
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    `Todo Backend running on http://localhost:${PORT}`
  );
});