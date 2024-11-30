import React, { useState } from 'react';
import { addUser, updateUser } from '../services/userService';
import Joi from 'joi';

const UserForm = ({ userToEdit, onFormSubmit, handleFormClose, setUsers }) => {
  const [user, setUser] = useState(
    userToEdit || { name: '', email: '', department: '' }
  );
  let [error, setError] = useState("");

  const schema = Joi.object({
    name: Joi.string().min(3).required().label('Name'),
    email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
    department: Joi.string().min(3).optional().label('Department'),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    let inputValidation = schema.validate({ ...user, [name]: value });
    if(inputValidation.error){
      setError(inputValidation.error.message);
    }else{
      setError("");
    }
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
        window.alert("user edited");
      } else {
        let response = await addUser(user);
        setUsers((prev)=>([...prev,response]));
        window.alert("user added");
      }
      onFormSubmit();
    } catch (error) {
      console.error(error);
      window.alert("Error: ",error);
      //show error to user
    }
  };

  return (
    <div style={{
      border: "2px solid gray",
      top: "50vh",
      left: "30vw",
      width: "50vw",
      height: "50vh"
    }}>
      <div style={{
        width: "100%",
        height:"50px",
      }}>
        <button style={{
          float: "right",
        }} onClick={handleFormClose}>X</button>
      </div>
      <form style={{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        height:"80%",
        rowGap:"10%"
      }} onSubmit={handleSubmit} className="user-form">
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
      {error && 
        <p style={{color:"red"}}>{error}</p>
      }
    </div>
  );
};

export default UserForm;
