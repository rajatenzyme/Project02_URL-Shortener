const express = require('express')
const {handleGenerateNewShortURL, handleAnalyticsbyShortID} = require('../controllers/url')



const router = express.Router()

router.post('/', handleGenerateNewShortURL);

// router.get('/:id', handleGetURLbyShortID);

router.get('/analytics/:id', handleAnalyticsbyShortID);


module.exports = router;