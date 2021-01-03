import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { insertNewTask } from '../api';
import useTasksState from './useTasksCtx';
const InputTasks = () => {
  const { user } = useAuth0();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const { tasks, setTasks } = useTasksState();

  const newTaskHelper = async () => {
    const fakeTask = {
      title: newTaskTitle,
      id: new Date(),
      fake: true,
    };

    setTasks([...tasks, fakeTask]);
    setNewTaskTitle('saving task in database...');
    await insertNewTask(newTaskTitle, user.sub);
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
        {newTaskTitle ? <button onClick={newTaskHelper}>Save Task</button> : ''}
      </div>
    </div>
  );
};

export default InputTasks;
