const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET settings from database filter by id
router.get('/', (req, res) => {
    console.log('settings',req.query)
    console.log(req.body)
    let id = req.query.id;
    let sqlText = `SELECT nat_lang.id as nat_lang_id, trans_lang.id as trans_lang_id, nat_lang.language_code as native_language_code, nat_lang.language as native_language, trans_lang.language_code as translated_language_code, trans_lang.language as translated_language, settings.words_per_week, settings.cards_per_session, settings.words_mastered FROM settings 
    JOIN languages as nat_lang ON settings.native_language = nat_lang.id 
    JOIN languages as trans_lang ON settings.translated_language = trans_lang.id
    WHERE account_id = $1;`
    pool.query(sqlText,[id])
    .then( response => {
        console.log('setings', response.rows)
        res.send(response.rows)
    })
    .catch(err => {
        console.log('Error getting settings', err)
    })
});

//PUT new settings to the database
router.put('/update', (req, res) => {
    console.log('updating settings', req.body)
    let account_id = req.body.user_id;
    let native = Number(req.body.native);
    let translated = Number(req.body.translated);
    let sessions = Number(req.body.words_per_week);
    let words = Number(req.body.words);
    let words_mastered = Number(req.body.words_mastered)
    let sqlText = `UPDATE settings SET "native_language" = $1, "translated_language" = $2, "words_per_week" = $3, "cards_per_session" = $4, "words_mastered" = $6 WHERE account_id = $5;`
    pool.query(sqlText,[native, translated, sessions, words, account_id, words_mastered])
    .then(response=> {
        res.sendStatus(201)
    }).catch(err=>{
        console.log(err)
    })
});

//Lock card
router.put('/mastered', (req,res) => {
    console.log('word mastered', req.body)
    let account_id = req.body.user_id;
    let sqlText = `UPDATE settings SET "words_mastered" = words_mastered +1 WHERE account_id = $1`
    pool.query(sqlText,[account_id])
    .then(response => {
        res.sendStatus(201)
    }).catch(err=> {
        console.log(err)
    })
})

//POST new settings to database
router.post('/', (req,res) => {
    console.log(req.body)
    let account_id = req.body.user_id;
    let native = Number(req.body.native);
    let translated = Number(req.body.translated);
    let sessions = Number(req.body.words_per_week);
    let words = Number(req.body.words);
    let words_mastered = Number(req.body.words_mastered)
    let sqlText = `INSERT INTO settings ("native_language", "translated_language", "words_per_week", "cards_per_session", "account_id", "words_mastered") VALUES($1,$2,$3,$4,$5,$6)`;
    pool.query(sqlText,[native, translated, sessions, words, account_id, words_mastered])
    .then(response=> {
        res.sendStatus(201)
    }).catch(err=>{
        console.log(err)
    })
})

module.exports = router;