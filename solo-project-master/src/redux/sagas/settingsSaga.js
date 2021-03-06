import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "GET_SETTINGS" actions
// gets settings for a particular user
function* getSettings(action) {
  try {
    console.log('get', action)
    const response = yield call(axios.get, '/settings', {params: {id: action.payload}});
    yield put({type: 'DISPLAY_SETTINGS', payload: response.data[0]})
    
  } catch (error) {
    console.log('Error getting settings:', error);
    
  }
}

// worker Saga: will be fired on"UPDATE_SETTINGS" actions
// changes settings for a particular user
function* setSettings(action) {
  try {

    yield call(axios.put, '/settings/update', action.payload)
    yield put({type: 'GET_SETTINGS', payload: action.payload.user_id})
    
  } catch(error) {
    console.log('Error Updating settings:', error)
  }
}

//worker Saga: will be fired on "NEW_SETTINGS" actions
// adds new settings for a new user
function* newSettings(action) {
  try{
    yield call(axios.post, '/settings', action.payload)
    yield put({type: 'GET_SETTINGS', payload: action.payload.user_id})
    yield put({type: 'FETCH_USER'})
  } catch(error) {
    console.log('Error Getting settings:', error)
  }
}

function* settingsSaga() {
  yield takeLatest('GET_SETTINGS', getSettings);
  yield takeLatest('UPDATE_SETTINGS', setSettings);
  yield takeLatest('NEW_SETTINGS', newSettings);
  
}

export default settingsSaga;