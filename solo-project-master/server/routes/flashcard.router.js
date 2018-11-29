const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//GET flashcards from database filter by id and 
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log(req.query)
    let id = req.query.id;
    let filter = req.query.filter;
    let sqlText = `SELECT * FROM words WHERE account_id = $1 AND frequency != 0 ORDER BY $2 LIMIT (20)`
    pool.query(sqlText,[id,filter])
    .then( response => {
        res.send(response.rows)
    })
    .catch(err => {
        console.log('Error getting flashcards', err)
    })
});

//GET only weekly mastered card count
router.get('/mastered', rejectUnauthenticated, (req,res) => {
    console.log('mastered',req.query)
    let id = req.query.id || req.query.user_id;
    console.log(id)
    let sqlText = `SELECT COUNT(*) FROM words WHERE date_mastered >= date_trunc('week', now()) AND account_id = $1;`
    pool.query(sqlText, [id])
    .then( response => {
        res.send(response.rows)
    })
    .catch(err => {
        console.log('Error getting mastered count', err)
    })
})

//this GET route will check if a flashcard exists with the given words
router.get('/duplicate', rejectUnauthenticated, (req,res) => {
    console.log('checking for duplicate', req.query)
    let ids = Number(req.query.id);
    let word = req.query.word;
    let translation = req.query.translation;
    let sqlText = `SELECT * FROM words WHERE account_id = $1 AND native_word = $2 AND translation = $3`
    pool.query(sqlText,[ids, word, translation])
    .then( response => {
        console.log('duplicate',response.rows)
        res.send(response.rows)
    })
    .catch(err => {
        console.log('Error checking for duplicate', err)
    })
})

// POST new flashcards to the database
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('flashcard', req.body)
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

router.put('/update', rejectUnauthenticated, (req, res)=> {
    console.log('updatting',req.body)
    let word_id = req.body.word_id;
    let freqUpdated = req.body.frequencyUpdate.frequency;
    let date_mastered = req.body.frequencyUpdate.date_mastered;
    console.log(date_mastered)
    let sqlText = `UPDATE words SET  frequency = ${freqUpdated}, date_mastered = $2 WHERE id= $1`
    pool.query(sqlText,[word_id, date_mastered])
    .then(response => {
        res.sendStatus(201)
    }).catch(err => {
        console.log(err)
    })
})


router.put('/edit', rejectUnauthenticated, (req,res)=> {
    console.log(req.body)
    let word = req.body.word
    let translation = req.body.translation
    let word_id = req.body.word_id
    let sqlText = `UPDATE words SET native_word = $1, translation= $2 WHERE id=$3`
    pool.query(sqlText, [word, translation, word_id])
    .then(response => {
        res.sendStatus(201)
    }).catch(err => {
        console.log(err)
    })
})
module.exports = router;