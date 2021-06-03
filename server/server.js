const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const gqlSchema = require('./graphQL/schema');

// initialize express server
const app = express();

// routers for various function
const metricsServerRouter = require('./restAPI/router/metricsServerRouter');
const prometheusRouter = require('./restAPI/router/prometheusRouter');

const PORT = 3000;

// Serve all compiled files when running the production build
app.use(express.static(path.resolve(__dirname, '../client')));
app.use('/build', express.static(path.join(__dirname, '../build')));

// Parse json & urlencoded body content from incoming requests and place it in req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/metrics', metricsServerRouter);
app.use('/prometheus', prometheusRouter);

// Wrap the express server in an ApolloServer to include Apollo GraphQL functionality
// https://www.apollographql.com/docs/apollo-server/api/apollo-server/#applymiddleware
const apollo = new ApolloServer(gqlSchema);
apollo.applyMiddleware({ app });

// Catchall Routes, GET request 404s handled on cleint-side by React Router & 
// All remained 404s are handled server-side
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '../client/index.html')));
app.use('/*', (req, res) => res.status(404).send('Resource Not Found'));

// Global Error Handler for Express
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  if (process.env.DEMO_MODE) console.log('~~~ D E M O   M O D E   A C T I V A T E D ~~~');
  console.log(`Chillin' on port ${PORT} 😎`);
});

// if testing using supertest
module.exports = app;
