import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { deleteTask, editTask } from '../api';
import useTasksState from './useTasksCtx';

const EditButtons = ({ data, newTitle, fakeDelete, toggleEditMode }) => {
  const { user } = useAuth0();
  const { editTaskState } = useTasksState();

  const handleEditTask = () => {
    editTask(data, newTitle, user.sub);
    editTaskState(data.id, newTitle);
    toggleEditMode();
  };

  return (
    <div>
      <button
        onClick={() => {
          deleteTask(data, user.sub);
          fakeDelete(data.id);
        }}
      >
        Delete
      </button>
      {newTitle !== data.title && (
        <button onClick={handleEditTask}>Save Changes</button>
      )}
    </div>
  );
};

export default EditButtons;
