import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "GET_SETTINGS" actions
function* getSettings(action) {
  try {
    
    const response = yield call(axios.get, '/settings', {params: {id: action.payload}});
    yield put({type: 'DISPLAY_SETTINGS', payload: response.data[0]})
    
  } catch (error) {
    console.log('Error getting settings:', error);
    
  }
}

// worker Saga: will be fired on"UPDATE_SETTINGS" actions
function* setSettings(action) {
  try {

    yield call(axios.put, '/settings', action.payload)
    yield put({type: 'GET_SETTINGS'})
    
  } catch(error) {
    console.log('Error Updating settings:', error)
  }
}

function* settingsSaga() {
  yield takeLatest('GET_SETTINGS', getSettings);
  yield takeLatest('UPDATE_SETTINGS', setSettings);
  
}

export default settingsSaga;