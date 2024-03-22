const express = require('express')
const path = require("path")
const {connectToDb} = require('./connection')


const URL = require("./models/url")


const urlRoute = require('./routes/url')
const staticRoute = require('./routes/staticRouter')
const userRoute = require("./routes/user")
const cookieParser = require('cookie-parser')
const { restrictToLoggedInUserOnly, checkAuth } = require('./middlewares/auth')
const { handleUserLogOut } = require('./controllers/user')


const PORT = process.env.PORT || 8001;

app = express();

connectToDb("mongodb://127.0.0.1:27017/url-shortner")
.then(() => console.log("MongoDB Connected"))

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.static("./views"));



app.use(express.json())
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());



// app.get("/test", async (req, res) => {
//     const allUrls = await URL.find({});
//     return res.render("home", {
//         urls:allUrls
//     });
// })

app.use('/url', restrictToLoggedInUserOnly, urlRoute);
app.use('/user', userRoute);
app.use('/', checkAuth,  staticRoute);


// app.get('*', function(req, res){
//     return res.render("404")
//   });


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

app.get('/logout', handleUserLogOut);



app.listen(PORT, () => console.log(`Server Started at PORT : ${PORT}`));