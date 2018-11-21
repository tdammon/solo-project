const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const router = express.Router();

//GET request to Google Translate API
router.get('/', (req,res)=>{

    console.log(req.query);
    axios.get(`https://translation.googleapis.com/language/translate/v2?q=${req.query.q}&target=no&source=en&key=${process.env.GOOGLE_API_KEY}`)
    .then(response => {
        res.send(response.data)
    }).catch(err=> {
        console.log(err)
    })
})

router.get('/reverse', (req,res)=>{
    console.log('running')
    console.log(req.query);
    axios.get(`https://translation.googleapis.com/language/translate/v2?q=${req.query.q}&target=en&source=no&key=${process.env.GOOGLE_API_KEY}`)
    .then(response => {
        console.log(response.data)
        res.send(response.data)
    }).catch(err=> {
        console.log(err)
    })
})

module.exports = router;