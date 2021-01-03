import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { newTask } from '../api';
const InputTasks = ({ tasks, setTasks }) => {
  const { user } = useAuth0();
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const newTaskHelper = async () => {
    let tasksContainsFake = false;
    for (var task of tasks) {
      if (task.fake === true) {
        tasksContainsFake = true;
        break;
      }
    }
    const fakeTask = await newTask(newTaskTitle, user.sub, tasksContainsFake);
    setTasks([...tasks, fakeTask]);
    setNewTaskTitle('');
  };

  return (
    <div>
      <h2>Add New Tasks:</h2>
      <div style={{ height: '40px', display: 'flex', alignItems: 'center' }}>
        <input
          value={newTaskTitle}
          onChange={e => setNewTaskTitle(e.target.value)}
        />
        {newTaskTitle ? (
          <button onClick={() => newTaskHelper()}>Save Task</button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default InputTasks;
