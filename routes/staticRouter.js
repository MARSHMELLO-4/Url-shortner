const express = require('express')
const router = express.Router();
const URL = require("../models/url")

//here we will write the code for all the static routes that will render the frontend which we will return

router.get('/', (req, res) => {
    const allUrls = URL.find({})
    return res.render("Home", {
        urls : allUrls
    })
})



module.exports = router;