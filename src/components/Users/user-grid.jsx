import React, { useState, useEffect } from 'react';
import UserGridRowComponent from './user-grid-row';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const DELETE_USERS = gql`
  mutation DeleteUsers($emails: [ID]!) {
    deleteUsers(emails: $emails) {
      emails
    }
  }
`;

function UserGridComponent({ users }) {
  const [deleteEnabled, setDeleteEnabled] = useState(true);
  const [deleteEmails, setDeleteEmails] = useState([]);
  const [deleteUsers, { data, loading, error }] = useMutation(DELETE_USERS);

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

  function onDeleteClick() {
    deleteUsers({ variables: { emails: deleteEmails } });
  }
  return (
    <section id="user-grid-section">
      <header id="user-grid-header">
        <h2>User</h2>
        <button disabled={deleteEnabled} onClick={onDeleteClick}>
          Delete
        </button>
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
