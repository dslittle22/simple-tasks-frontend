const { REACT_APP_SERVER_URL } = process.env;
const server_url = 'https://' + REACT_APP_SERVER_URL;

export const getTasks = async user_Id => {
  const response = await fetch(`${server_url}/tasks/${user_Id}`);
  const data = await response.json();
  return data;
};

const getRealTaskId = async (title, user_Id) => {
  const req1 = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, user_Id }),
  };

  const response = await fetch(`${server_url}/tasks/get_id`, req1);
  const realTask = await response.json();
  return realTask.id;
};

export const deleteTask = async ({ id, fake, title }, user_Id) => {
  try {
    const request = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, user_Id }),
    };
    if (fake === true) {
      const real_Id = await getRealTaskId(title, user_Id);
      const deletedTask = await fetch(
        `${server_url}/tasks/${real_Id}`,
        request
      );
      if (deletedTask.ok) console.log(deletedTask.status);
      window.location.reload();
    } else {
      const deletedTask = await fetch(`${server_url}/tasks/${id}`, request);
      if (deletedTask.ok) console.log(deletedTask.status);
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const editTask = async ({ title, id, fake }, newTitle, user_Id) => {
  try {
    const request = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newTitle, user_Id }),
    };
    let real_Id = id;
    if (fake === true) {
      real_Id = await getRealTaskId(title, user_Id);
    }
    const editTask = await fetch(`${server_url}/tasks/${real_Id}`, request);
    if (editTask.ok) console.log(editTask.status);
    window.location.reload();
  } catch (error) {
    console.error(error.message);
  }
};

export const newTask = async (title, user_Id, tasksContainsFake) => {
  try {
    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, user_Id }),
    };
    const addTask = await fetch(`${server_url}/tasks/`, request);
    if (addTask.ok) console.log(addTask.status);
    if (tasksContainsFake) {
      window.location.reload();
    } else {
      const fakeTask = {
        title: title,
        fake: true,
        id: 'fake',
      };
      return fakeTask;
    }
  } catch (error) {
    console.error(error.message);
  }
};
