require('./db/connect')
console.log('Task Manager App')
const express = require('express');
const app  = express();
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config


// middlewarew

app.use(express.json())


app.get('/hello', (req,res) =>  {
    res.send('Task manager')
});

app.use('/api/v1/tasks', tasks)



const port = 4000;


const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI); 
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };

  start()