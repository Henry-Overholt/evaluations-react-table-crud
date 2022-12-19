import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import UserGridComponent from './user-grid';

const ALL_USERS_QUERY = gql`
  query {
    allUsers {
      email
      name
      role
    }
  }
`;

function Users() {
  const { loading, error, data } = useQuery(ALL_USERS_QUERY);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <main id="users-container">{!loading && <UserGridComponent users={data.allUsers} />}</main>
  );
}

export default Users;
