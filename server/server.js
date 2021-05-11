const express = require('express');
const path = require('path');
const app = express();

// const bodyParser = require('body-parser');

const PORT = 3000;

//** Serve all compiled files when running the production build **/
app.use(express.static(path.resolve(__dirname, '../client')));
app.use('/build', express.static(path.join(__dirname, '../build')));

//** Automatically parse urlencoded body content from incoming requests and place it in req.body **//
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//** 404 error **//
app.use('*', (req, res) => res.status(404).send('Wrong'));

//** Global Error **//
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

app.listen(PORT, () =>{console.log(`Listening at port ${PORT}.`)});

//if testing using supertest
module.exports = app;