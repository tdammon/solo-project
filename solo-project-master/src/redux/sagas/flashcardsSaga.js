import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "GET_FLASHCARDS" actions
function* getFlashcards(action) {
  try {
    console.log("this is the payload", action.payload)

    const response = yield call(axios.get, '/flashcards', {params: {id: action.payload.id, filter: action.payload.filter}});
    yield put({type: 'MAKE_FLASHCARD', payload: response.data})
    
  } catch (error) {
    console.log('Error getting flashcards:', error);
    
  }
}

function* flashcardsSaga() {
    console.log('hey')
  yield takeLatest('GET_FLASHCARDS', getFlashcards);
  
}

export default flashcardsSaga;