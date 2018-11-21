import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* getLanguages(action) {
    try {
        
        const response = yield call(axios.get, `/languages`);
        yield put( { type: 'SET_LANGUAGES', payload: response.data}); 
    }
    catch (error) {
        console.log('Error making GET language:', error);
        
    }
}

function* languagesSaga() {
    yield takeLatest('GET_LANGUAGES', getLanguages);
}

export default languagesSaga