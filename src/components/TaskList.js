import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getTasks } from '../api';
import useTasksCtx from './useTasksCtx';
import Task from './Task';

const TaskList = () => {
  const { user } = useAuth0();
  const [fetched, setFetched] = useState(false);
  const { tasks, setTasks } = useTasksCtx();
  const renderTasks = () => {
    if (fetched) {
      if (tasks.length > 0) {
        return tasks.map(task => {
          return <Task data={task} key={task.id} />;
        });
      } else {
        return <h4>You don't have any tasks right now. Impressive!</h4>;
      }
    } else {
      return <p>loading...</p>;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await getTasks(user.sub);
        setFetched(true);
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
