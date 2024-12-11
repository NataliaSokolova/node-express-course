const getAllTasks = (req,res) => {
    res.send('all items from controllers')
}

const createTask = (req,res) => {
    res.send('create tasks')
}

const getTask = (req,res) => {
    res.send('get single task')
}

const updateTask = (req,res) => {
    res.send('update tasks')
}

const deleteTask = (req,res) => {
    res.send('delete task')
}

module.exports = {
   getAllTasks, 
   createTask,
   getTask,
   updateTask,
   deleteTask,
}