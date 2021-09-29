import { all, call } from 'redux-saga/effects';

import { fetchCollectionsStart } from './shop/shop.sagas';
import { userSagas } from './user/user.sagas';

export default function* rootSaga () {
    yield all([call(fetchCollectionsStart), call(userSagas)]);
};


/**
 * all takes an array of sagas.
 * By using the yield all call, we are able to call any number of sagas inside of the array & initialize them all on separate task screens.
 * We want to be able to have individual tasks that only care about the saga that they are looking for & we want to initialize them all at once whenever possible.
 
 *  export default function* rootSaga() {
        yield all([
        WatcherSaga(),
        WatcherSaga2(),
        ])
    };
    
    Without all, our app will still work, but WatcherSaga2 would wait for WatcherSaga to finish before it started. With all(), they will both start at the same time. 

*/ 