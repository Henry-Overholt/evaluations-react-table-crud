import React, { useState, useEffect } from 'react';
import './edit-user.css';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import ToasterMessageComponent from './../toaster-message/toaster-message';

const USER_QUERY = gql`
  query getUserByEmail($email: ID!) {
    user(email: $email) {
      name
      role
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser($email: ID!, $newAttributes: UserAttributesInput!) {
    updateUser(email: $email, newAttributes: $newAttributes) {
      email
      name
      role
    }
  }
`;

function EditUserComponent() {
  const email = useParams().email;
  const { loading, error, data } = useQuery(USER_QUERY, { variables: { email: email } });
  const [roleValue, setRoleValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [showToaster, setShowToaster] = useState(false);
  const [color, setColor] = useState('');
  const [message, setMessage] = useState('');

  const roles = [
    { value: 'ADMIN', label: 'Admin' },
    { value: 'DEVELOPER', label: 'Developer' },
    { value: 'APP_MANAGER', label: 'App Manager' },
    { value: 'MARKETING', label: 'Marketing' },
    { value: 'SALES', label: 'Sales' },
  ];
  const [updateUser, { newData, updateLoading, updateError }] = useMutation(UPDATE_USER);

  useEffect(() => {
    if (data) {
      setRoleValue(data.user.role);
      setNameValue(data.user.name);
    }
  }, [data]);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  function onSaveClicked() {
    updateUser({
      variables: { email: email, newAttributes: { name: nameValue, role: roleValue } },
    }).then((response) => {
      if (response) {
        setColor('#4cad4c');
        setMessage('Updated User');
        setShowToaster(true);
      }
    });
  }

  return (
    <main id="edit-user-container">
      <header>
        <h1>{email}</h1>
        <button onClick={onSaveClicked}>Save</button>
      </header>
      <section>
        <div className="left-container">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={nameValue}
            onChange={(e) => {
              setNameValue(e.target.value);
            }}
          />
        </div>
        <div className="right-container">
          <p>Role</p>
          {roles.map((role, index) => (
            <div className="radioButtonDiv" key={index}>
              <input
                type="radio"
                name="role"
                id={role.value + index}
                value={role.value}
                onChange={(event) => {
                  setRoleValue(event.target.value);
                }}
                checked={roleValue === role.value}
              />
              <label htmlFor={role.value + index}>{role.label}</label>
            </div>
          ))}
        </div>
      </section>
      {showToaster && (
        <ToasterMessageComponent
          message={message}
          color={color}
          onButtonClicked={() => {
            setShowToaster(false);
          }}
        />
      )}
    </main>
  );
}

export default EditUserComponent;
