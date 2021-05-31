const express = require("express");
const path = require("path");
const app = express();
const { graphqlHTTP } = require('express-graphql');

//import GraphQL Schema
const GQLSchema = require('./graphQL/schema.js');

//routers for various function
const metricsServerRouter = require('./router/metricsServerRouter.js');
const prometheusRouter = require('./router/prometheusRouter.js');

// const bodyParser = require('body-parser');
const PORT = 3000;

//** Serve all compiled files when running the production build **/
app.use(express.static(path.resolve(__dirname, "../client")));
app.use("/build", express.static(path.join(__dirname, "../build")));

//** Automatically parse urlencoded body content from incoming requests and place it in req.body **//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/metrics', metricsServerRouter);
app.use('/prometheus', prometheusRouter);

app.use('/graphql', graphqlHTTP({
  schema: GQLSchema,
  graphiql: true,
}));

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.get("/getStarted", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.get("/LogIn", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});



//** 404 error **//
app.use("*", (req, res) => res.status(404).send("Wrong Address"));

//** Global Error **//
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Chillin' on port ${PORT} 😎`);
});

//if testing using supertest
module.exports = app;
