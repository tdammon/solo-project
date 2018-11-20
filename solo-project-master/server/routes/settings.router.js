const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET settings from database filter by id
router.get('/', (req, res) => {
    console.log(req.query)
    let id = req.query.id;
    let sqlText = `SELECT nat_lang.language_code as native_language_code, nat_lang.language as native_language, trans_lang.language_code as translated_language_code, trans_lang.language as translated_language, settings.session_frequency, settings.cards_per_session FROM settings 
    JOIN languages as nat_lang ON settings.native_language = nat_lang.id 
    JOIN languages as trans_lang ON settings.translated_language = trans_lang.id
    WHERE account_id = $1;`
    pool.query(sqlText,[id])
    .then( response => {
        res.send(response.rows)
    })
    .catch(err => {
        console.log('Error getting settings', err)
    })
});

// POST new settings to the database
// router.post('/', (req, res) => {
//     console.log(req.body)
//     let account_id = req.body.id
//     let input = req.body.inputText;
//     let translation = req.body.translation
//     let sqlText = `INSERT INTO words("account_id", "native_word", "translation", "frequency", "language_id")
//     VALUES($1, $2, $3, 0.9, 13)`
//     pool.query(sqlText,[account_id,input,translation])
//     .then(response=> {
//         res.sendStatus(201)
//     }).catch(err=>{
//         console.log(err)
//     })
// });

module.exports = router;