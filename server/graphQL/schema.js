// const { makeExecutableSchema } = require('apollo-server')
const typeDefs = require('./typeDef/typeDef');
const resolvers = require('./resolvers/resolvers');
const dataSources = require('../datasources/dataSources');
const schemaDirectives = require('./directives/directives.js');
const PrometheusUpDirective = require("./directives/prometheusDirective.js")

module.exports = {
  typeDefs,
  resolvers,
  schemaDirectives,
  dataSources,
};