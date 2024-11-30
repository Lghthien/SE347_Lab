const { gql } = require('apollo-server');
const db = require('./db');


const typeDefs = gql`
  type User {
    username: String!
    description: String
  }

  type Query {
    getUser(username: String!): User
  }

  type Mutation {
    addUser(username: String!, description: String): User
    updateUserDescription(username: String!, description: String!): User
  }
`;

const resolvers = {
  Query: {
    getUser: (_, { username }) => {
      return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
          if (err) reject(err);
          resolve(row || null);
        });
      });
    },
  },
  Mutation: {
    addUser: (_, { username, description }) => {
      return new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO users (username, description) VALUES (?, ?)',
          [username, description || ''],
          (err) => {
            if (err) reject(new Error('Username already exists'));
            resolve({ username, description });
          }
        );
      });
    },
    updateUserDescription: (_, { username, description }) => {
      return new Promise((resolve, reject) => {
        db.run(
          'UPDATE users SET description = ? WHERE username = ?',
          [description, username],
          function (err) {
            if (err) reject(err);
            if (this.changes === 0) reject(new Error('User not found'));
            resolve({ username, description });
          }
        );
      });
    },
  },
};

module.exports = { typeDefs, resolvers };
