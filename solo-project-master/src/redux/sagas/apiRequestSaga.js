import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* apiRequest(action) {
    try {

        const response = yield call(axios.get, `/api/search?q=${action.payload}`);
        if(action.payload == response.data.data.translations[0].translatedText){
            console.log('hello')
            const resp = yield call(axios.get, `/api/search/reverse?q=${action.payload}`)
            yield put( { type: 'SET_API', payload: resp.data.data.translations[0].translatedText});
        } else {
            yield put( { type: 'SET_API', payload: response.data.data.translations[0].translatedText});
        } 
    }
    catch (error) {
        console.log('Error making API request:', error);
        
    }
}

function* apiRequestSaga() {
    yield takeLatest('SEND_API_REQUEST', apiRequest);
}

export default apiRequestSaga