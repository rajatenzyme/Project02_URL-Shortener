const shortID = require('shortid')
const URL = require("../models/url")


async function handleGenerateNewShortURL(req, res){
    const body = req.body;
    // console.log(body)
    if(!body.url)
        // return res.render("404")
        return res.status(400).json({msg : "URL is required"})
    const smallID = shortID();
    await URL.create({
        shortID : smallID,
        redirectURL:body.url,
        visitHistory : [],
        createdBy : req.user._id,
    });
    return res.render("home", {id : smallID})
}


async function handleAnalyticsbyShortID(req, res){
    const shortID = req.params.id;
    const entry = await URL.findOne({shortID});
    if(!entry)
        return res.render("404")
        // return res.json("404 Error!")
    return res.json({"Original-URL" : entry.redirectURL,  "shortened-URL" : "http://localhost:8001/" + shortID, "totalClicks" : entry.visitHistory.length, "visitHistory" : entry.visitHistory})
}

module.exports= {handleGenerateNewShortURL, handleAnalyticsbyShortID};