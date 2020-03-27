const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const exercisesSchema = new Schema(
    {
        username:{type:String,required:true},
        description:{type:String,required:true},
        duration:{type: Number, required:true},
        
        date:{type:Date,required:true},

    },{
        timestamps:true
    }
    
)


const Exercises = mongoose.model("Excercises",exercisesSchema);

module.exports= Exercises