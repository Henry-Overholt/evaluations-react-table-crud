import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import React from 'react';
import ReactDOM from 'react-dom';
import env from './env/env';
import Users from './components/Users/Users';
import EditUserComponent from './components/Edit-User/edit-user';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

const client = new ApolloClient({
  uri: env.GRAPHQL_ENDPOINT,
  request: (operation) => {
    operation.setContext({
      headers: {
        'x-api-key': env.GRAPHQL_API_KEY,
      },
    });
  },
});

const Root = () => (
  <Router>
    <ApolloProvider client={client}>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/edit/:email" element={<EditUserComponent />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ApolloProvider>
  </Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));
