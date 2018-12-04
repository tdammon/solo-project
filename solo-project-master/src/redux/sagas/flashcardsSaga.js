import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "GET_FLASHCARDS" actions
//gets flashcards with a particular filter
function* getFlashcards(action) {
  try {

    const response = yield call(axios.get, '/flashcards', {params: {id: action.payload.id, filter: action.payload.filter}});
    yield put({type: 'SET_FLASHCARD', payload: response.data})
    
  } catch (error) {
    console.log('Error getting flashcards:', error);
    
  }
}

// worker Saga: will be fired on "GET_MASTERED" actions
// gets data on mastered flashcards
function* getMastered(action) {
  try {
    console.log('get words mastered', action.payload)
    const response = yield call(axios.get, '/flashcards/mastered', {params: {id: action.payload}});
    yield put({type: 'SET_MASTERED', payload: response.data[0]})
    
  } catch (error) {
    console.log('Error getting mastered flashcards:', error);
    
  }
}

// worker Saga: will be fired on "CHECK_FOR_DUPLICATE" actions
// searches for a duplicate flashcard
// makes a new card if a duplicate is not found
function* checkForDuplicate(action) {
  try {

    const response = yield call(axios.get, '/flashcards/duplicate', {params: {id: action.payload.id, word: action.payload.inputText, translation: action.payload.translation}});
    console.log('this is the server response',response.data)
    if(response.data.length < 1){
      yield put({type: 'SET_FLASHCARD', payload: response.data})
      yield call(axios.post, '/flashcards', action.payload)
    } else {
      alert('duplicate')
    }
    
  } catch (error) {
    console.log('Error getting flashcards:', error);
    
  }
}

//worker Saga: will be fired on "MAKE_FLASHCARD" actions
// adds a new flashcard to the database
function* makeFlashcard(action) {
  try{

    yield call(axios.post, '/flashcards', action.payload)

  } catch(error) {
    console('Error creating flashcard:', error)
  }
}

//worker Saga: will be fired on "EDIT_FLASHCARD" actions
// edits an existing flashcard
function* editFlashcard(action) {
  try{
    yield call(axios.put, '/flashcards/edit', action.payload)
    yield put({type: 'GET_ALL_CARDS', payload: action.payload.user_id})
  }
  catch(error) {
    console.log('Error editting flashcard:', error)
  }
}

//worker Saga: will be fired on "LOCK_CARD" actions
// updates the flashcards frequency and matered date
// updates the total number of mastered cards
function* lockCard(action) {
  try{
    yield call(axios.put, '/flashcards/update', action.payload)
    yield call(axios.put, '/settings/mastered', action.payload)
    yield put({type: 'GET_MASTERED',  payload: action.payload.user_id})
    yield put({type: 'UPDATE_FLASHCARD_ARRAY'})
  }
  catch(error) {
    console.log('Error locking card', error)
  }
}


function* flashcardsSaga() {
  yield takeLatest('GET_FLASHCARDS', getFlashcards);
  yield takeLatest('GET_MASTERED', getMastered)
  yield takeLatest('MAKE_FLASHCARD', makeFlashcard);
  yield takeLatest('EDIT_FLASHCARD', editFlashcard)
  yield takeLatest('CHECK_FOR_DUPLICATE', checkForDuplicate)
  yield takeLatest('LOCK_CARD', lockCard)
  
}

export default flashcardsSaga;