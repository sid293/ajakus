import React, { useState, useEffect } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import { getUsers, deleteUser } from './services/userService';

const App = () => {
  const [editingUser, setEditingUser] = useState(null);
  const [users, setUsers] = useState([]);

    //DO: on edit button click change state to show dialog
  const handleEdit = (user) => {
    setEditingUser(user);
    //making post request to backend, or put request
  };

  const handleFormSubmit = () => {
    //DO: closing form on save button
    setEditingUser(null);
  };


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error(error);
        // setError(error.message);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="app">
      <h1>User Management Dashboard</h1>
      {editingUser ?
        <UserForm setUsers={setUsers} userToEdit={editingUser} handleFormClose={handleFormSubmit} onFormSubmit={handleFormSubmit} />
      :(
        <UserList users={users} setUsers={setUsers} onEdit={handleEdit} />
      )}
    </div>
  );
};

export default App;
