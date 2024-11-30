import React, { useState, useEffect } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import { getUsers } from './services/userService';

const App = () => {
  const [editingUser, setEditingUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);

    //DO: on edit button click change state to show dialog
  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
    //making post request to backend, or put request
  };

  const handleAddUser = async (user) => {
    setShowForm(true);
  }

  const handleFormSubmit = () => {
    //DO: closing form on save button
    setEditingUser(null);
    setShowForm(false);
  };


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error(error);
        window.alert("Error: ",error);
        // setError(error.message);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="app">
      <h1>User Management Dashboard</h1>
      {showForm ?
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <UserForm setUsers={setUsers} userToEdit={editingUser} handleFormClose={handleFormSubmit} onFormSubmit={handleFormSubmit} />
        </div>
        : (
          <div>
            <UserList users={users} setUsers={setUsers} onEdit={handleEdit} />
            <button onClick={handleAddUser}>Add User</button>
          </div>
        )}
      <div style={{ width: "100%", height: "20%" }}>
      </div>
    </div>
  );
};

export default App;
