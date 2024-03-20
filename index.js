const express = require('express')
const path = require("path")
const {connectToDb} = require('./connection')
const urlRoute = require('./routes/url')
const staticRoute = require('./routes/staticRouter')

const URL = require("./models/url")


const PORT = process.env.PORT || 8001;

app = express();

connectToDb("mongodb://127.0.0.1:27017/url-shortner")
.then(() => console.log("MongoDB Connected"))

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.static("./views"));


app.use(express.json())
app.use(express.urlencoded({extended : false}));



// app.get("/test", async (req, res) => {
//     const allUrls = await URL.find({});
//     return res.render("home", {
//         urls:allUrls
//     });
// })

app.use('/', staticRoute);
app.use('/url', urlRoute);



app.get('/url/:id', async (req, res) => {
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