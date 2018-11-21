const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET settings from database filter by id
router.get('/', (req, res) => {
    console.log(req.query)
    let id = req.query.id;
    let sqlText = `SELECT nat_lang.id as lang_id, nat_lang.language_code as native_language_code, nat_lang.language as native_language, trans_lang.language_code as translated_language_code, trans_lang.language as translated_language, settings.session_frequency, settings.cards_per_session FROM settings 
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

//PUT new settings to the database
router.put('/update', (req, res) => {
    console.log(req.body)
    let account_id = req.body.user_id;
    let native = Number(req.body.native);
    let translated = Number(req.body.translated);
    let sessions = Number(req.body.sessions);
    let words = Number(req.body.words);
    console.log(typeof account_id, typeof native, typeof translated, typeof sessions, typeof words)
    let sqlText = `UPDATE settings SET "native_language" = $1, "translated_language" = $2, "session_frequency" = $3, "cards_per_session" = $4 WHERE id = $5;`
    pool.query(sqlText,[native, translated, sessions, words, account_id])
    .then(response=> {
        res.sendStatus(201)
    }).catch(err=>{
        console.log(err)
    })
});

//POST new settings to database
router.post('/', (req,res) => {
    console.log(req.body)
    let account_id = req.body.user_id;
    let native = Number(req.body.native);
    let translated = Number(req.body.translated);
    let sessions = Number(req.body.sessions);
    let words = Number(req.body.words);
    let sqlText = `INSERT INTO settings ("native_language", "translated_language", "session_frequency", "cards_per_session", "account_id") VALUES($1,$2,$3,$4,$5)`;
    pool.query(sqlText,[native, translated, sessions, words, account_id])
    .then(response=> {
        res.sendStatus(201)
    }).catch(err=>{
        console.log(err)
    })
})

module.exports = router;