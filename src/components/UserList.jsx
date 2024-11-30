import React, { useEffect, useState } from 'react';
import { deleteUser } from '../services/userService';
import ErrorMessage from './ErrorMessage';

const UserList = ({ onEdit, users, setUsers }) => {
  const [error, setError] = useState(null);
  let [page, setPage] = useState(1);
  let [filteredUser, setFilteredUser] = useState([{"id":23,"name":"name","email":"egmail","department":"dept"}]);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
      window.alert("user deleted");
    } catch (error) {
      setError(error.message);
      window.alert("Error: ",error);
    }
  };

  const handlePage = (direction)=>{
    if(direction === "prev"){
      setPage((prev)=>{
        return prev>1?--prev:prev
      })
    }else{
      let limit = Math.round(users.length/5);
      let startPage = page * 5;
      setPage((prev)=>{
        if(users[startPage]){
          return ++prev;
        }else{
          return prev;
        }
      })
    }
  }

  if (error) return <ErrorMessage message={error} />;

  useEffect(() => {
    let filteredUsers = [];
    for (let i = (page-1) * 5; i < page * 5; i++) {
      if(!users[i]) break;
      filteredUsers.push(users[i]);
    }
    setFilteredUser(filteredUsers);
  },[page, users])

  return (
    <div className="user-list">
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUser && filteredUser.map((user) => (
            <tr key={user.id || "id"}>
              <td>{user.id || "id"}</td>
              <td>{user.name || "name"}</td>
              <td>{user.email || "email"}</td>
              <td>{user.department || 'Unknown'}</td>
              <td>
                <button onClick={() => onEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
      }}>
        <button onClick={()=>{handlePage("prev")}}>prev</button>
        <p>{page}</p>
        <button onClick={()=>{handlePage("next")}}>next</button>
      </div>
    </div>
  );
};

export default UserList;
