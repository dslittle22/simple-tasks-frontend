import React, { useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import './App.css';
import InputTasks from './InputTasks';
import TaskList from './TaskList';
import Header from './Header';

export const TasksCtx = React.createContext();

function App() {
  const { isLoading, isAuthenticated } = useAuth0();
  const [tasks, setTasks] = useState([]);

  const editTaskState = (id, newTitle) => {
    const otherTasks = tasks.filter(task => task.id !== id);
    const thisTask = tasks.filter(task => task.id === id)[0];
    thisTask.title = newTitle;
    setTasks([...otherTasks, thisTask]);
  };

  const TasksCtxValue = {
    tasks: tasks,
    setTasks: setTasks,
    editTaskState: editTaskState,
  };

  return isLoading ? (
    <div>Loading data...</div>
  ) : (
    <>
      <Header />
      {isAuthenticated && (
        <TasksCtx.Provider value={TasksCtxValue}>
          <TaskList tasks={tasks} setTasks={setTasks} />
          <InputTasks />
        </TasksCtx.Provider>
      )}
    </>
  );
}

export default App;
