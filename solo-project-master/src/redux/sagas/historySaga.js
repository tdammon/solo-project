import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "GET_HISTORY" actions
function* getHistory(action) {
  try {
    
    const response = yield call(axios.get, '/history', {params: {id: action.payload}});
    yield put({type: 'DISPLAY_HISTORY', payload: response.data})
    
  } catch (error) {
    console.log('Error getting history:', error);
    
  }
}

//worker Saga: will be fired on"POST_HISTORY" actions
function* setHistory(action) {
  try {
    console.log(action.payload)
    yield call(axios.post, '/history', action.payload)
    yield call(axios.put, '/flashcards/update', action.payload)
    yield put({type: 'UPDATE_FLASHCARD_ARRAY', payload: action.payload.frequencyUpdate.correct})
    
  } catch(error) {
    console.log('Error Updating history:', error)
  }
}

function* historySaga() {
  yield takeLatest('GET_HISTORY', getHistory);
  yield takeLatest('POST_HISTORY', setHistory);
  
}

export default historySaga;