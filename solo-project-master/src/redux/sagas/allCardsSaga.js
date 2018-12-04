import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "GET_ALL_CARDS" actions
// gets all of a users flashcards
function* getAllCards(action) {
  try {

    const response = yield call(axios.get, '/allcards', {params: {id: action.payload}});
    yield put({type: 'SET_All_CARDS', payload: response.data})
    
  } catch (error) {
    console.log('Error getting all cards:', error);
    
  }
}

function* allCardsSaga() {
  yield takeLatest('GET_ALL_CARDS', getAllCards);
  
}

export default allCardsSaga;