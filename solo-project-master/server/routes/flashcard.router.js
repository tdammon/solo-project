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

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;