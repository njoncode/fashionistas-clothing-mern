import { takeEvery, call, put } from 'redux-saga/effects';

import shopConstants from './shop.constants';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebaseUtils';
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';


export function* fetchCollectionsAsync() {
    yield console.log('I am fired!');

    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }
};

export function* fetchCollectionsStart() {
    yield takeEvery(
        shopConstants.FETCH_COLLECTIONS_START, 
        fetchCollectionsAsync
    );
}


/**
 * yield allows us to defer control at this point of the execution back to the saga middleware.
 * call is a method that takes as its first argument some function or method & then the subsequent arguments will be the parameters that we pass into this function call.
 * put is the saga effect for creating actions.
 * put is exactly like dispatch. The only difference is that we have to yield it.
 * put just puts out or dispatches out an object that it's expecting to have a type and a payload.
    */