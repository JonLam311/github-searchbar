import React, { useContext } from "react";
import { UnactiveUsersContext } from "../App.js";


const UserList = ({ users }) => {
  let [unactiveUserIds, setUnactiveUserIds] = useContext(UnactiveUsersContext);

  const handleClick = e => {
    const userId = parseInt(e.target.id);

    setUnactiveUserIds(
      unactiveUserIds.includes(userId)
        ? unactiveUserIds.filter(activeUser => activeUser !== userId)
        : [
            ...unactiveUserIds,
            userId
          ]
    );
  }

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          <input
            type="checkbox"
            id={user.id}
            checked={!unactiveUserIds.includes(user.id)}
            onChange={handleClick}
          ></input>
          <img src={user.avatar_url} alt="" width="50" />
          <p>{user.login}</p>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
