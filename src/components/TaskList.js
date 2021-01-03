import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Task from './Task';
import { getTasks } from '../api';

const TaskList = ({ tasks, setTasks }) => {
  const { user } = useAuth0();

  const renderTasks = () => {
    if (tasks.length > 0) {
      return tasks.map(task => {
        return <Task data={task} key={task.id} fakeDelete={fakeDelete} />;
      });
    } else {
      return <h4>You don't have any tasks right now. Impressive!</h4>;
    }
  };

  const fakeDelete = id => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await getTasks(user.sub);
        setTasks(data);
      } catch (error) {
        console.error(error.message);
      }
    })();
  }, [setTasks, user.sub]);

  return (
    <div>
      <h2>Your Tasks:</h2>
      {renderTasks()}
    </div>
  );
};

export default TaskList;
