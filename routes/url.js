const express = require('express')
const {handleGenerateNewShortURL, handleGetURLbyShortID} = require('../controllers/url')



const router = express.Router()

router.post('/', handleGenerateNewShortURL);

router.get('/:id', handleGetURLbyShortID);


module.exports = router;