//login signup here 
const express = require('express')
const {handleUserSignup,handleUserLogin} = require('../controllers/user')


const router = express.Router()

router.post('/', handleUserSignup) //this will handle the user creation

router.post('/login', handleUserLogin);

module.exports = router