const express = require('express')
const {connectToDb} = require('./connection')
const urlRoute = require('./routes/url')

const PORT = process.env.PORT || 8001;

app = express();

connectToDb("mongodb://127.0.0.1:27017/url-shortner")
.then(() => console.log("MongoDB Connected"))

app.use(express.json())
app.use('/url', urlRoute);

app.listen(PORT, () => console.log(`Server Started at PORT : ${PORT}`));