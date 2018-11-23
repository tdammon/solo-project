import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "GET_FLASHCARDS" actions
function* getFlashcards(action) {
  try {

    const response = yield call(axios.get, '/flashcards', {params: {id: action.payload.id, filter: action.payload.filter}});
    yield put({type: 'SET_FLASHCARD', payload: response.data})
    
  } catch (error) {
    console.log('Error getting flashcards:', error);
    
  }
}

function* checkForDuplicate(action) {
  try {

    const response = yield call(axios.get, '/flashcards/duplicate', {params: {id: action.payload.id, word: action.payload.word, translation: action.payload.translation}});
    yield put({type: 'SET_FLASHCARD', payload: response.data})
    
  } catch (error) {
    console.log('Error getting flashcards:', error);
    
  }
}

//worker Saga: will be fired on "MAKE_FLASHCARD" actions
function* makeFlashcard(action) {
  try{

    yield call(axios.post, '/flashcards', action.payload)

  } catch(error) {
    console('Error creating flashcard:', error)
  }
}

function* editFlashcard(action) {
  try{
    yield call(axios.put, '/flashcards/edit', action.payload)
    yield put({type: 'GET_ALL_CARDS', payload: action.payload.user_id})
  }
  catch(error) {
    console.log('Error editting flashcard:', error)
  }
}

function* lockCard(action) {
  try{
    yield call(axios.put, '/flashcards/update', action.payload)
    yield call(axios.put, '/settings/mastered', action.payload)
    yield put({type: 'UPDATE_FLASHCARD_ARRAY'})
  }
  catch(error) {
    console.log('Error locking card', error)
  }
}


function* flashcardsSaga() {
  yield takeLatest('GET_FLASHCARDS', getFlashcards);
  yield takeLatest('MAKE_FLASHCARD', makeFlashcard);
  yield takeLatest('EDIT_FLASHCARD', editFlashcard)
  yield takeLatest('CHECK_FOR_DUPLICATE', checkForDuplicate)
  yield takeLatest('LOCK_CARD', lockCard)
  
}

export default flashcardsSaga;