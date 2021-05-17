const { makeExecutableSchema } = require('@graphql-tools/schema');
const typeDefs = require('./typeDef/typeDef');
const resolvers = require('./resolvers/resolvers');

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});