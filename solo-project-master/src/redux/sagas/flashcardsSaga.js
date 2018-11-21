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

//worker Saga: will be fired on "MAKE_FLASHCARD" actions
function* makeFlashcard(action) {
  try{

    yield call(axios.post, '/flashcards', action.payload)

  } catch(error) {
    console('Error creating flashcard:', error)
  }
}

function* flashcardsSaga() {
  yield takeLatest('GET_FLASHCARDS', getFlashcards);
  yield takeLatest('MAKE_FLASHCARD', makeFlashcard);
  
}

export default flashcardsSaga;