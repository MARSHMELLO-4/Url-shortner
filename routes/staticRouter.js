const express = require('express')
const router = express.Router();
const URL = require("../models/url")

//here we will write the code for all the static routes that will render the frontend which we will return

router.get('/', (req, res) => {
    if(!req.user) return res.redirect('/login')
    const allUrls = URL.find({ createdBy : req.user._id })
    return res.render("Home", {
        urls : allUrls
    })
})

router.get('/signup', (req,res) => {
    return res.render("signup");
})


router.get('/login', (req,res) => {
    return res.render("login")
})



module.exports = router;