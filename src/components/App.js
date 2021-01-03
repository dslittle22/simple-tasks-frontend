import React, { useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import './App.css';
import InputTasks from './InputTasks';
import TaskList from './TaskList';
import Header from './Header';

function App() {
  const { isLoading, isAuthenticated } = useAuth0();
  const [tasks, setTasks] = useState([]);
  return isLoading ? (
    <div>Loading data...</div>
  ) : (
    <>
      <Header />
      {isAuthenticated && (
        <>
          <TaskList tasks={tasks} setTasks={setTasks} />
          <InputTasks tasks={tasks} setTasks={setTasks} />
        </>
      )}
    </>
  );
}

export default App;
