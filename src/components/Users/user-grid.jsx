import React, { useState, useEffect } from 'react';
import UserGridRowComponent from './user-grid-row';

function UserGridComponent({ users }) {
  const [deleteEnabled, setDeleteEnabled] = useState(true);
  const [deleteEmails, setDeleteEmails] = useState([]);
  let deleteEmailsButton = true;

  const handleCheckboxClick = (email) => {
    const isFoundEmail = deleteEmails.find((deleteEmail) => deleteEmail === email);
    if (isFoundEmail) {
      setDeleteEmails((prev) => prev.filter((emails) => emails !== email));
    } else {
      setDeleteEmails((prev) => [...prev, email]);
    }
  };

  useEffect(() => {
    setDeleteEnabled(deleteEmails.length === 0);
  }, [deleteEmails]);

  return (
    <section id="user-grid-section">
      <header id="user-grid-header">
        <h2>User</h2>
        <button disabled={deleteEnabled}>Delete</button>
      </header>
      <table>
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>EMAIL</th>
            <th>NAME</th>
            <th>ROLE</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <UserGridRowComponent
              key={index}
              user={user}
              handleCheckboxClick={(email) => handleCheckboxClick(email)}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default UserGridComponent;
