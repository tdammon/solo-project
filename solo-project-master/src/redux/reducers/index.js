import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import userReducerToSettings from './userReducerToSettings'
import flashcards from './flashcardsReducer'
import settingsReducer from './settingsReducer'
import flashcardHistory from './historyReducer'
import api from './apiReducer'
import languages from './languagesReducer'
import allcards from './allCardsReducer'
import masteredCards from './masteredCardsReducer'
// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  userReducerToSettings, 
  flashcards,
  settingsReducer,
  flashcardHistory,
  api,
  languages,
  allcards,
  masteredCards,
});

export default rootReducer;
