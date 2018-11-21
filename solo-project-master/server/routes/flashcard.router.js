const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET flashcards from database filter by id and 
router.get('/', (req, res) => {
    console.log(req.query)
    let id = req.query.id;
    let filter = req.query.filter;
    let sqlText = `SELECT * FROM words WHERE account_id = $1 ORDER BY $2 LIMIT (20)`
    pool.query(sqlText,[id,filter])
    .then( response => {
        res.send(response.rows)
    })
    .catch(err => {
        console.log('Error getting flashcards', err)
    })
});

// POST new flashcards to the database
router.post('/', (req, res) => {
    console.log(req.body)
    let account_id = req.body.id
    let input = req.body.inputText;
    let translation = req.body.translation
    let language = req.body.language_id
    let sqlText = `INSERT INTO words("account_id", "native_word", "translation", "frequency", "language_id")
    VALUES($1, $2, $3, 0.9, $4)`
    pool.query(sqlText,[account_id,input,translation,language])
    .then(response=> {
        res.sendStatus(201)
    }).catch(err=>{
        console.log(err)
    })
});

router.put('/update', (req, res)=> {
    console.log(req.body)
    let word_id = req.body.word_id;
    let freqUpdated = req.body.frequencyUpdate.frequency;
    let sqlText = `UPDATE words SET frequency = frequency+$2 WHERE id= $1`
    pool.query(sqlText,[word_id, freqUpdated])
    .then(response => {
        res.sendStatus(201)
    }).catch(err => {
        console.log(err)
    })
})
module.exports = router;