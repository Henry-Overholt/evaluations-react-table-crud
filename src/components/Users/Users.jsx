import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import UserGridComponent from './user-grid';

function Users() {
  const ALL_USERS_QUERY = gql`
    query {
      allUsers {
        email
        name
        role
      }
    }
  `;

  const { loading, error, data } = useQuery(ALL_USERS_QUERY);

  return <main>{!loading && <UserGridComponent users={data.allUsers} />}</main>;
}

export default Users;
