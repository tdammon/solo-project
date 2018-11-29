const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const router = express.Router();

//GET request to Google Translate API
router.get('/', (req,res)=>{

    console.log(req.query);
    let encodedWord = encodeURIComponent(req.query.q);
    console.log(encodedWord)
    axios.get(`https://translation.googleapis.com/language/translate/v2?q=${encodedWord}&target=${req.query.target}&source=${req.query.source}&key=${process.env.GOOGLE_API_KEY}`)
    .then(response => {
        if(req.query.q == response.data.data.translations[0].translatedText){
            res.send('reverse')
        } else {
            console.log(response.data.data)
            res.send(response.data)
        }
        
    }).catch(err=> {
        console.log(err)
    })
})

router.get('/reverse', (req,res)=>{
    console.log('running')
    console.log(req.query);
    let encodedWord = encodeURIComponent(req.query.q);
    console.log(encodedWord)
    axios.get(`https://translation.googleapis.com/language/translate/v2?q=${encodedWord}&target=${req.query.source}&source=${req.query.target}&key=${process.env.GOOGLE_API_KEY}`)
    .then(response => {
        console.log(response.data.data)
        res.send(response.data)
    }).catch(err=> {
        console.log(err)
    })
})

module.exports = router;