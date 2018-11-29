const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET settings from database filter by id
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log(req.query)
    let sqlText = `SELECT * FROM languages ORDER BY language`
    pool.query(sqlText)
    .then( response => {
        res.send(response.rows)
    })
    .catch(err => {
        console.log('Error getting settings', err)
    })
});

module.exports = router;