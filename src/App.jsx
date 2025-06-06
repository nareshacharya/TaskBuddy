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

  const groupedTasks = tasks.reduce((groups, task, index) => {
    const group = groups[task.date] || [];
    group.push({ ...task, index });
    groups[task.date] = group;
    return groups;
  }, {});

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
      <div className="task-groups">
        {Object.entries(groupedTasks).map(([date, items]) => (
          <div key={date} className="task-group">
            <div className="task-group-header">{date}</div>
            <ul className="task-list">
              {items.map((task) => (
                <li key={task.index} className={task.completed ? 'completed' : ''}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.index)}
                  />
                  <span>{task.text}</span>
                  <button onClick={() => removeTask(task.index)}>X</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
