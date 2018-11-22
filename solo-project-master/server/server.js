
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const flashcardRouter = require('./routes/flashcard.router')
const settingsRouter = require('./routes/settings.router')
const historyRouter = require('./routes/history.router');
const apiRouter = require('./routes/api.router')
const languagesRouter = require('./routes/languages.router')
const allCardsRouter = require('./routes/allcards.router')
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/flashcards', flashcardRouter);
app.use('/settings', settingsRouter)
app.use('/history', historyRouter)
app.use('/api/search', apiRouter)
app.use('/languages', languagesRouter)
app.use('/allcards', allCardsRouter)

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
