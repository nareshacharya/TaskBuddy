import { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() === '') return;
    const task = {
      text: newTask,
      completed: false,
      date: new Date().toLocaleDateString()
    };
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const toggleTask = (index) => {
    const updated = tasks.map((t, i) => i === index ? { ...t, completed: !t.completed } : t);
    setTasks(updated);
  };

  const removeTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <div className="app">
      <h1>TaskBuddy</h1>
      <div className="new-task">
        <input
          type="text"
          value={newTask}
          placeholder="Add a task"
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(index)}
            />
            <span>{task.text}</span>
            <small className="task-date">{task.date}</small>
            <button onClick={() => removeTask(index)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
