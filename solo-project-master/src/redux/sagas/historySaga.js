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

// worker Saga: will be fired on"UPDATE_HISTORY" actions
// function* setSettings(action) {
//   try {

//     yield call(axios.put, '/settings', action.payload)
//     yield put({type: 'GET_SETTINGS'})
    
//   } catch(error) {
//     console.log('Error Updating settings:', error)
//   }
// }

function* historySaga() {
  yield takeLatest('GET_HISTORY', getHistory);
  //yield takeLatest('UPDATE_SETTINGS', setSettings);
  
}

export default historySaga;