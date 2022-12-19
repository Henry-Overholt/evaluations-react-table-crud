import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function UserGridRowComponent({ user, handleCheckboxClick }) {
  const navigate = useNavigate();
  function handleOnClick(event) {
    if (event.target.className != 'checkbox') {
      navigate('/edit/' + user.email);
      console.log(event.target.className);
    }
  }

  return (
    <tr onClick={handleOnClick}>
      <td>
        <input
          type="checkbox"
          name=""
          id=""
          className="checkbox"
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
