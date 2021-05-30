// const { makeExecutableSchema } = require('@graphql-tools/schema'); //removed since upgrading to apollo
const typeDefs = require('./typeDef/typeDef');
const resolvers = require('./resolvers/resolvers');
const dataSources = require('../datasources/dataSources');

module.exports = {
  typeDefs,
  resolvers,
  dataSources
};