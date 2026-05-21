const mongoose = require('mongoose');

const userScehma = new mongoose.Schema({
    //here we will create the scehma of the user
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true
    }
},
     {timestamps : true})

const User = mongoose.model('user', userScehma); //this is how we create the collection in the db that we will target while connecting mongoose


module.exports = User