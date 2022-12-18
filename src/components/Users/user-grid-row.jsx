import React from 'react';

function UserGridRowComponent({ user, handleCheckboxClick }) {
  function handleOnClick(event) {
    console.log(event);
  }

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          name=""
          id=""
          onClick={() => {
            handleCheckboxClick(user.email);
          }}
        />
      </td>
      <td>{user.email}</td>
      <td>{user.name}</td>
      <td>{user.role}</td>
    </tr>
  );
}

export default UserGridRowComponent;
