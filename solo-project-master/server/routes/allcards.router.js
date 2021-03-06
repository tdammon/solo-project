const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//GET settings from database filter by id
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log(req.query)
    console.log(req.body)
    let id = req.query.id;
    console.log(id)
    let sqlText = `SELECT * FROM words WHERE account_id = $1 ORDER BY id DESC`
    pool.query(sqlText,[id])
    .then( response => {
        res.send(response.rows)
    })
    .catch(err => {
        console.log('Error getting settings', err)
    })
});


module.exports = router;