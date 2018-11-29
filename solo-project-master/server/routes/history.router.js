const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET settings from database filter by id
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log(req.query)
    let id = req.query.id;
    let sqlText = `SELECT history.date, history.correct, history.incorrect, 
    words.native_word, words.translation FROM history 
    JOIN words ON words.id = history.word_id 
    WHERE history.account_id = $1 ORDER BY date DESC;`
    pool.query(sqlText,[id])
    .then( response => {
        res.send(response.rows)
    })
    .catch(err => {
        console.log('Error getting settings', err)
    })
});

router.post('/', rejectUnauthenticated, (req,res)=> {
    console.log('adding to history', req.body)
    let user_id = req.body.user_id;
    let word_id = req.body.word_id;
    let correct = req.body.frequencyUpdate.correct;
    let incorrect = req.body.frequencyUpdate.incorrect
    let sqlText = `INSERT INTO history("correct", "incorrect", "word_id", "account_id")
    VALUES($1, $2, $3, $4)`;
    pool.query(sqlText,[correct, incorrect, word_id, user_id])
    .then(response => {
        res.sendStatus(201)
    })
    .catch(err => {
        console.log('Error posting to history', err)
    })
})

module.exports = router;