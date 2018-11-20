const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET settings from database filter by id
router.get('/', (req, res) => {
    console.log(req.query)
    let id = req.query.id;
    let sqlText = `SELECT history.date, history.correct, history.incorrect, 
    words.native_word, words.translation FROM history 
    JOIN words ON words.id = history.word_id 
    WHERE history.account_id = $1;`
    pool.query(sqlText,[id])
    .then( response => {
        res.send(response.rows)
    })
    .catch(err => {
        console.log('Error getting settings', err)
    })
});

module.exports = router;