const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
         unique: true,
         trim:true
    }},{
        timestamps:true
    }
)


const user =mongoose.model('user',userSchema);
module.exports = user;