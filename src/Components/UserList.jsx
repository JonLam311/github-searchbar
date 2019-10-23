import React, { useContext } from "react";
import { ActiveUsersContext } from "../App.js";

const UserList = ({ users, ...props }) => {
  // const activeUsers = useContext(activeUsersContext);
  const value = useContext(ActiveUsersContext);
  console.log(props, value);
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          <input
            type="checkbox"
            id={user.id}
            // checked={activeUsers.includes(user.id)}
          ></input>
          <img src={user.avatar_url} alt="" width="50" />
          <p>{user.login}</p>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
