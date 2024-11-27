import React, { useState, useEffect } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import { getUsers } from './services/userService';
// import { ToastContainer, toast } from 'react-toastify';

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
    //addUser 
    // setEditingUser({ name: '', email: '', department: '' });
    setShowForm(true);
        // console.log("toast");
        // toast("user added", {position:"bottom-right",autoClose:1000});

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
        // setError(error.message);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="app">
      <h1>User Management Dashboard</h1>
      {showForm ?
        <UserForm setUsers={setUsers} userToEdit={editingUser} handleFormClose={handleFormSubmit} onFormSubmit={handleFormSubmit} />
      :(
        <div>
          <UserList users={users} setUsers={setUsers} onEdit={handleEdit} />
          <button onClick={handleAddUser}>Add User</button>
        </div>
      )}
      <div style={{ width:"100%",height:"20%"}}>
      {/* <ToastContainer
      style={{border:"2px solid blue", width:"100%",height:"20%"}}
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      /> */}
      </div>
    </div>
  );
};

export default App;
