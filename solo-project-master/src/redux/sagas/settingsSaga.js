import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "GET_SETTINGS" actions
function* getSettings(action) {
  try {
    console.log(action.payload)
    const response = yield call(axios.get, '/settings', {params: {id: action.payload}});
    yield put({type: 'DISPLAY_SETTINGS', payload: response.data[0]})
    
  } catch (error) {
    console.log('Error getting settings:', error);
    
  }
}

function* settingsSaga() {
  yield takeLatest('GET_SETTINGS', getSettings);
  //yield takeLatest('SET_SETTINGS', setSettings);
  
}

export default settingsSaga;