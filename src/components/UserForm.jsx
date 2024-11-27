import React, { useState } from 'react';
import { addUser, updateUser } from '../services/userService';

const UserForm = ({ userToEdit, onFormSubmit, handleFormClose, setUsers }) => {
  const [user, setUser] = useState(
    userToEdit || { name: '', email: '', department: '' }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userToEdit) {
        let response = await updateUser(userToEdit.id, user);
        setUsers((prev)=>{
            let filtered = prev.filter((ele)=> (ele.id !== response.id));
            return [response ,...filtered];
        })
      } else {
        await addUser(user);
      }
      onFormSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  return (
        <div style={{
                border: "2px solid green",
                top:"50vh",
                left:"30vw",
                width:"50vw",
                height:"50vh"
        }}>
            <button onClick={handleFormClose}>X</button>
            <form onSubmit={handleSubmit}  className="user-form">
                <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="text"
                    name="department"
                    value={user.department}
                    onChange={handleChange}
                    placeholder="Department"
                />
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default UserForm;
