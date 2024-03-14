const shortID = require('shortid')
const URL = require("../models/url")


async function handleGenerateNewShortURL(req, res){
    const body = req.body;
    console.log(body)
    if(!body.url)
        return res.status(400).json({msg : "URL is required"})
    const smallID = shortID();
    await URL.create({
        shortID : smallID,
        redirectURL:body.url,
        visitHistory : [],
    });

    return res.json({id : smallID})
}


// async function handleGetURLbyShortID(req, res){
//     const shortID = req.params.id;
//     // console.log(shortID)
//     const entry = await URL.findOneAndUpdate(
//         {
//             shortID,
//         },
//         {
//         $push: {
//             visitHistory : {
//                 timestamp : Date.now(),
//             },
//             },
//         }
//     );

//     console.log(entry.redirectURL)

//     return res.redirect(entry.redirectURL)
// }


async function handleAnalyticsbyShortID(req, res){
    const shortID = req.params.id;
    const entry = await URL.findOne({shortID});
    return res.json({"totalClicks" : entry.visitHistory.length, "visitHistory" : entry.visitHistory})
}

module.exports= {handleGenerateNewShortURL, handleAnalyticsbyShortID};