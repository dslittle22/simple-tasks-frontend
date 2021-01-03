import React, { useState, useEffect, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { insertNewTask } from '../api';
import useTasksState from './useTasksCtx';
const InputTasks = () => {
  const { user } = useAuth0();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const { tasks, setTasks } = useTasksState();

  const memoizedNewTask = useCallback(async () => {
    if (newTaskTitle === '') return;
    const fakeTask = {
      title: newTaskTitle,
      id: new Date(),
      fake: true,
    };

    setTasks([...tasks, fakeTask]);
    setNewTaskTitle('saving task in database...');
    await insertNewTask(newTaskTitle, user.sub);
    setNewTaskTitle('');
  }, [newTaskTitle, setTasks, tasks, user.sub]);

  useEffect(() => {
    const hitEnter = e => {
      if (e.code !== 'Enter') return;
      memoizedNewTask();
    };

    document.addEventListener('keydown', hitEnter);
    return () => {
      document.removeEventListener('keydown', hitEnter);
    };
  }, [memoizedNewTask]);

  return (
    <div>
      <h2>Add New Tasks:</h2>
      <div style={{ height: '40px', display: 'flex', alignItems: 'center' }}>
        <input
          value={newTaskTitle}
          onChange={e => setNewTaskTitle(e.target.value)}
        />
        {newTaskTitle ? (
          <button onClick={memoizedNewTask}>Save Task</button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default InputTasks;
