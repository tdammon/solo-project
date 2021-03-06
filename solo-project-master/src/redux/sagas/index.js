import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import flashcardsSaga from './flashcardsSaga'
import settingsSaga from './settingsSaga'
import historySaga from './historySaga'
import apiRequestSaga from './apiRequestSaga'
import languagesSaga from './languagesSage';
import allCardsSaga from './allCardsSaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    flashcardsSaga(),
    settingsSaga(),
    historySaga(),
    apiRequestSaga(),
    languagesSaga(),
    allCardsSaga(),
  ]);
}
