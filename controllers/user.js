const User = require('../models/user'); //since it was the only export from the models
const { v4:uuidV4 } = require('uuid')
const {getUser,setUser} = require('./service/auth')
async function handleUserSignup(req,res) {
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password,
    })

    return res.render("Home"); //send to the home page
}


async function handleUserLogin(req,res) {
    //frist get the body 
    const { email, password } = req.body;
    const user = await User.findOne({ email, password })
    if(!user) {
        return res.render('login', {error : 'Invalid Username or Password'});
    }
    //if everything is correct then a session id will be created for you
    // const sessionID = uuidV4(); //this is how we craete the session id
    //forthe login we have to set the user
    const token = setUser(user); //this is how we will store the session
    res.cookie('uid', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000  // 24 hours
    }) //this is how we are sending cookies
    return  res.render("Home") //send to home page
}

module.exports = {
    handleUserSignup,
    handleUserLogin
}