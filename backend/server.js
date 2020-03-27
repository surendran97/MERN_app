const express =require('express');
const cors =require('cors');
const mongoose = require('mongoose');



require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())
app.options('*',cors())

const uri = process.env.ATLAS_URI;

mongoose.connect(uri,{useCreateIndex:true,useNewUrlParser:true,useUnifiedTopology:true});
const connection = mongoose.connection;

connection.once('open',()=>{
    console.log("mongoose connected successfully")
})

const exercisesRoutes = require('./routes/exercises');
const userRoutes = require('./routes/user')


app.use('/exercises',exercisesRoutes)
app.use('/user',userRoutes)

app.listen(port,()=>{
    console.log("server started success fully:"+port)
})