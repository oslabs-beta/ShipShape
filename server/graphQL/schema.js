// const { makeExecutableSchema } = require('apollo-server')
const typeDefs = require('./typeDef/typeDef');
const resolvers = require('./resolvers/resolvers');
const dataSources = require('./datasources/dataSources');
const schemaDirectives = require('./directives/directives');

module.exports = {
  typeDefs,
  resolvers,
  schemaDirectives,
  dataSources,
};