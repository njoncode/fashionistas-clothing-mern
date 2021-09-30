import { all, call } from 'redux-saga/effects';

import { fetchCollectionsStart } from './shop/shop.sagas';
import { userSagas } from './user/user.sagas';
import { cartSagas } from './cart/cart.sagas';

export default function* rootSaga () {
    yield all([call(fetchCollectionsStart), call(userSagas), call(cartSagas)]);
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

/**
 * 
 * The rootSaga generator function. This function uses another helper effect all. This effect tells redux-saga to run the functions in parallel.

    export default function* rootSaga () {
        yield all([call(fetchCollectionsStart), call(userSagas)]);
    };

 * The rootSaga function runs the watcher sagas in parallel, so it can be exported and ran by the saga middleware. Basically, it connects the sagas to the redux-saga middleware.
    sagaMiddleware.run(rootSaga);
	
    Above is a line of code in the store.js file that runs the saga.
 */