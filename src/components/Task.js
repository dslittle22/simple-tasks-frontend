import React, { useState } from 'react';
import EditButtons from './EditButtons';
import Icon from './SVG';

const Task = ({ data, fakeDelete }) => {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(data.title);
  const { title } = data;

  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (!editMode) {
      setNewTitle(title);
    }
  };

  return (
    <div style={gridStyle}>
      <Icon icon='edit' toggleEditMode={toggleEditMode} />
      {editMode ? (
        <>
          <input value={newTitle} onChange={e => setNewTitle(e.target.value)} />
          <EditButtons
            data={data}
            newTitle={newTitle}
            fakeDelete={fakeDelete}
            toggleEditMode={toggleEditMode}
          />
        </>
      ) : (
        <>{title}</>
      )}
    </div>
  );
};

export default Task;

const gridStyle = {
  height: '40px',
  display: 'flex',
  alignItems: 'center',
};
