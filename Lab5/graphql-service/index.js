const { ApolloServer } = require('apollo-server');
const { typeDefs, resolvers } = require('./schema');

// Tạo Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Khởi động server
server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
