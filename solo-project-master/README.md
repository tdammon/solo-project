# Flash Translate
This project is a full stack web application which uses Google Translate API to translate words into a desired language and store the translations as flashcards. Users are able to review flashcards, checkout their success history, or browse all of their existing cards. The flashcards will be stored in a database so the user may revisit the website any time.

Additionally I built a fully functioning Chrome Extension which accesses my Heroku Page to translate and store words. The code for the browser extension can be found here [Chrome Extension](https://github.com/tdammon/chromeExtensions)

A live version of the app can be found here 
- [Heroku App](https://evening-temple-42477.herokuapp.com)

## Build With
This version uses React, Redux, Sagas, Express, Passport, Chartjs, Axios, and PostgreSQL (a full list of dependencies can be found in `package.json`).

### Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

### Create database and table

Create a new database called `solo_project` and create these tables:

```SQL
CREATE TABLE "person" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "settings" (
    "id" SERIAL PRIMARY KEY,
    "account_id" INTEGER NOT NULL,
    "native_language" INTEGER NOT NULL,
    "translated_language" INTEGER NOT NULL,
    "words_per_week" INTEGER NOT NULL,
    "cards_per_session" INTEGER NOT NULL,
    "words_mastered" INTEGER NOT NULL,
)

CREATE TABLE "words" (
    "id" SERIAL PRIMARY KEY,
    "account_id" INTEGER NOT NULL,
    "native_word" VARCHAR (100) NOT NULL,
    "translation" VARCHAR (200) NOT NULL,
    "frequency" DECIMAL NOT NULL,
    "language_id" INTEGER NOT NULL,
    "date_mastered" DATE,
)

CREATE TABLE "languages" (
    "id" SERIAL PRIMARY KEY,
    "language_code" VARCHAR NOT NULL,
    "language" VARCHAR NOT NULL
);

CREATE TABLE "history" (
    "id" SERIAL PRIMARY KEY,
    "account_id" INTEGER NOT NULL,
    "correct" INTEGER NOT NULL,
    "incorrect" INTEGER NOT NULL,
    "word_id" INTEGER NOT NULL,
    "date" DATE DEFAULT now(),
)
```

If you would like to name your database something else, you will need to change `solo_project` to the name of your new database name in `server/modules/pool.js`

## Development Setup Instructions

* Run `npm install`
* Create a `.env` file at the root of the project and paste this line into the file:
    ```
    GOOGLE_API_KEY=`superDuperSecret`
    ```
    In order to run this application you will need to create an account with Google and then regitster to recieve an API key 
    [Google Translate API](https://cloud.google.com/translate/docs/apis)

* Start postgres if not running already by using `brew services start postgresql`
* Run `npm run server`
* Run `npm run client`
* Navigate to `localhost:3000`

## Documentation

A view of the scoping document can be found here:

[Scoping Document](https://docs.google.com/document/d/1tfVoXBBmusDtu8uYvCrqJfEyb6ZVApluVgLeF7Ixy0k/edit?usp=sharing)

### Completed Features

-[x] Sign in with protected routes
-[x] Editable settings page
-[x] Translation using Google API
-[x] Flashcard sessions can be done by newest, difficulty, or random
-[x] Flashcards flip to reveal the reverse side
-[x] The flashcard deck reorders to move a new card to the front
-[x] Charts are made to show weekly progress as well as flashcard statistics
-[x] Flashcard session history is stored and seen on the history page
-[x] All cards can be viewed on the all cards page
-[x] A fully functional browser extension words in conjunction with the site (this is published here: [Browser Extension](https://github.com/tdammon/chromeExtensions))

### Next Steps

-[ ] Develop a mobile version of the translator page
-[ ] Develop a mobile version of the flashcard page

### Navigation

* `src/` contains the React application
* `public/` contains static assets for the client-side
* `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
* `server/` contains the Express App


Components:

* src/components
  * App/App
  * Footer/Footer
  * Nav/Nav
  * AboutPage/AboutPage
  * AllCardsPage/AllCardsPage
  * FlashcardsPage/FlashcardsPage
  * InfoPage/InfoPage
  * UserPage/UserPage
  * LoginPage/LoginPage
  * ProgressChart/ProgressChart
  * RegisterPage/RegisterPage
  * SettingsPage/SettingsPage
  * StatisticsPage/StatisticsPage
  * TranslationPage/TranslationPage
  * LogOutButton/LogOutButton
  * ProtectedRoute/ProtectedRoute



## Authors

* Trevor Dammon
