const { nanoid } = require('nanoid')
const URL = require('../models/url')
async function handleGenerateNewShortUrl(req,res) {
    const body = req.body;
    if(!body.url){
        return res.status(400).json({
            "msg" : "url required"
        })
    }
    const shortId = nanoid(8);
    await URL.create({
        shortId : shortId,
        redirectUrl : body.url,
        visitHistory: []
    });

    //instead of returning id now we will return the html 
    const allUrls = await URL.find({});
    return res.render("Home", {
        id : shortId, //this id we will render on html now
        urls : allUrls
    })

    // return res.json({
    //     id : shortId //ths is the short id which got generated
    // })
}


module.exports = {
    handleGenerateNewShortUrl
}