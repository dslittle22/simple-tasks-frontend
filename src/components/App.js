import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';
import InputTasks from './InputTasks';
import TaskList from './TaskList';
import Header from './Header';
import Footer from './Footer';

export const TasksCtx = React.createContext();

function App() {
  const { isLoading, isAuthenticated } = useAuth0();
  const [tasks, setTasks] = useState([]);

  const TasksCtxValue = {
    tasks: tasks,
    setTasks: setTasks,
    editTaskState: (id, newTitle) => {
      const otherTasks = tasks.filter(task => task.id !== id);
      const thisTask = tasks.filter(task => task.id === id)[0];
      thisTask.title = newTitle;
      setTasks([...otherTasks, thisTask]);
    },
  };

  return isLoading ? (
    <div>Loading user...</div>
  ) : (
    <>
      <Header />
      {isAuthenticated && (
        <>
          <div>
            <TasksCtx.Provider value={TasksCtxValue}>
              <TaskList tasks={tasks} setTasks={setTasks} />
              <InputTasks />
            </TasksCtx.Provider>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
