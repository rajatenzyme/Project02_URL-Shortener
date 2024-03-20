const express = require('express')
const {connectToDb} = require('./connection')
const urlRoute = require('./routes/url')
const URL = require("./models/url")


const PORT = process.env.PORT || 8001;

app = express();

connectToDb("mongodb://127.0.0.1:27017/url-shortner")
.then(() => console.log("MongoDB Connected"))

app.use(express.json())
app.use('/url', urlRoute);

app.get('/:id', async (req, res) => {
    const shortID = req.params.id;
    const entry = await URL.findOneAndUpdate(
        {
            shortID,
        },
        {
        $push: {
            visitHistory : {
                timestamp : Date.now(),
                IP_Address : req.ip,
            },
            },
        }
    );
    return res.redirect(entry.redirectURL)
})


app.listen(PORT, () => console.log(`Server Started at PORT : ${PORT}`));