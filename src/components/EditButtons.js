import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { deleteTask, editTask } from '../api';
const EditButtons = ({ data, newTitle, fakeDelete }) => {
  const { user } = useAuth0();

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
        <button onClick={() => editTask(data, newTitle, user.sub)}>
          Save Changes
        </button>
      )}
    </div>
  );
};

export default EditButtons;
