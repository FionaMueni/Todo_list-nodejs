const express = require('express');
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const todoRoute = require("./routes/todo.route")

dotenv.config()


const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGODB_STRING).then(function(){
    console.log('Database connection established')
}).catch(function(error){
    console.log(error)
})

const app = express();
app.use (express.json())

app.use("/todo", todoRoute)




app.listen(PORT, ()=>{
    console.log(`listening on http://localhost:${PORT}`)
});

// todo && user
// http://localhost:8000/todo