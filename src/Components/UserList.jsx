import React from 'react';

function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          <img src={user.avatar_url} alt="" width="50"/>
          <p>{user.login}</p>
        </li>
      ))}
    </ul>
  );
}

export default UserList;
