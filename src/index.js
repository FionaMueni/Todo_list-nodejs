const express = require('express');
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const todoRoute = require("./routes/todo.route")
const userRoute = require("./routes/user.route");
const Logger = require("./middlewares/loggers/logger")
dotenv.config()


const PORT = process.env.PORT || 8000;

const corsOption = {
    origin:"*"
}

mongoose.connect(process.env.MONGODB_STRING).then(function(){
    Logger.info('Database connection established')
}).catch(function(error){
    Logger.error(error)
})

const app = express();
app.use(cors())
app.use (express.json())

app.use("/todo", todoRoute)
app.use("/user", userRoute)




app.listen(PORT, ()=>{
    Logger.http(`listening on http://localhost:${PORT}`)
});

// todo && user
// http://localhost:8000/todo