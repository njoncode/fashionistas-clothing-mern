import { takeEvery } from 'redux-saga/effects';

import shopConstants from './shop.constants';

export function* fetchCollectionsAsync() {
    yield console.log('I am fired!');
}

export function* fetchCollectionsStart() {
    yield takeEvery(
        shopConstants.FETCH_COLLECTIONS_START, 
        fetchCollectionsAsync
    );
}