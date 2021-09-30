import { takeLatest, call, put } from 'redux-saga/effects';

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
    yield takeLatest(
        shopConstants.FETCH_COLLECTIONS_START, 
        fetchCollectionsAsync
    );
};



/**
 * Redux Saga is a middleware library used to allow a Redux store to interact with resources outside of itself asynchronously. This includes making HTTP requests to external services, accessing browser storage, and executing I/O operations.
 
 * A saga is a generator function. When a promise is run and yielded, the middleware suspends the saga until the promise is resolved.
   Once the promise is resolved the middleware resumes the saga, until the next yield statement is found, and there it is suspended again until its promise resolves.

   Inside the saga code, we will generate effects using a few special helper functions provided by the redux-saga package. To start with, we can list:

    takeEvery()
    takeLatest()
    take()
    call()
    put()

When an effect is executed, the saga is paused until the effect is fulfilled.

 * When Do I Need Redux-Saga?
   Any time we are calling an API or doing anything else asynchronously and the flow is more complex than having one call depend on the next, use Redux-Saga. 
   If async flow is that simple, we should probably use redux-thunk instead. 

*/

/**
 * Watcher Sagas
    A watcher saga listens for an action type, much like a reducer.

    export function* fetchCollectionsStart() {
        yield takeLatest(
            shopConstants.FETCH_COLLECTIONS_START, 
            fetchCollectionsAsync
        );
    }

    When the action type specified in the first argument of takeLatest is dispatched, the worker saga in the second argument begins execution. So in the example above, when FETCH_COLLECTIONS_START is dispatched, workerSaga (fetchCollectionsAsync) begins to do its thing.
 
 *  Redux Saga provides more methods than just takeLatest() for listening. 
    TakeLatest() does what it sounds like; if we dispatch the action before the previous API call finishes, it will stop that call and return only the latest one. 
    TakeEvery() allows multiple instances of these sagas to run at the same time. Both takeLatest() and takeEvery() are built on take(), which behaves synchronously.
 */


/**
 * yield allows us to defer control at this point of the execution back to the saga middleware.
 
 * call(), executes a given method with given arguments.
 * call is a method that takes as its first argument some function or method & then the subsequent arguments will be the parameters that we pass into this function call.
 

 * put is the saga effect for creating actions.
 * put is exactly like dispatch. The only difference is that we have to yield it.
 * put just puts out or dispatches out an object that it's expecting to have a type and a payload.
    */


/**
 * takeEvery allows concurrent actions to be handled. In the example above, when a FETCH_COLLECTIONS_START action is dispatched, a new fetchCollections task is started even if a previous fetchColections is still pending 
 * (for example, the user clicks on a Fetch Collections button 2 consecutive times at a rapid rate, the 2nd click will dispatch a FETCH_COLLECTIONS_START action while the fetchCollections fired on the first one hasn't yet terminated)

 * takeEvery doesn't handle out of order responses from tasks. There is no guarantee that the tasks will terminate in the same order they were started. To handle out of order responses, we may consider takeLatest.
 */


/**
 * takeLatest(pattern, saga, ...args)#
   Forks a saga on each action dispatched to the Store that matches pattern. And automatically cancels any previous saga task started previously if it's still running.
   Each time an action is dispatched to the store. And if this action matches pattern, takeLatest starts a new saga task in the background. If a saga task was started previously (on the last action dispatched before the actual action), and if this task is still running, the task will be cancelled.

 * In the above example, we create a basic task fetchCollections. We use takeLatest to start a new fetchCollections task on each dispatched FETCH_COLLECTIONS_START action. Since takeLatest cancels any pending task started previously, we ensure that if a user triggers multiple consecutive FETCH_COLLECTIONS_START actions rapidly, we'll only conclude with the latest action.

 * takeLatest: Cancel previous call
 * If multiple FETCH_COLLECTIONS_START actions will be fired, only the last one will be processed (all previous calls of fetchCollections will be cancelled).
 
/**
 * To sum up, if we use the "takeEvery", it allows multiple fetchData instances to be started concurrently. At a given moment, we can start a new fetchData task while there are still one or more previous fetchData tasks which have not yet terminated.
 * But if we use the "takeLatest", it allows only one fetchData task to run at any moment. And it will be the latest started task. If a previous task is still running when another fetchData task is started, the previous task will be automatically cancelled.
 */




/**
    
Basic Helpers

* Helpers are abstractions on top of the low-level saga APIs.

  Most basic helpers we can use to run our effects:

    takeEvery()
    takeLatest()
    take()
    put()
    call()


* takeEvery()

    In the code:

    import { takeEvery } from 'redux-saga/effects'

    function* watchMessages() {
    yield takeEvery('ADD_MESSAGE', postMessageToServer)
    }

    The watchMessages generator pauses until an ADD_MESSAGE action fires, and every time it fires, it’s going to call the postMessageToServer function, infinitely, and concurrently (there is no need for postMessageToServer to terminate its execution before a new once can run)
    takeLatest()


    * Another popular helper is takeLatest(), which is very similar to takeEvery() but only allows one function handler to run at a time, avoiding concurrency. If another action is fired when the handler is still running, it will cancel it, and run again with the latest data available.

    As with takeEvery(), the generator never stops and continues to run the effect when the specified action occurs.
    take()


* take() is different in that it only waits a single time. When the action it’s waiting for occurs, the promise resolves and the iterator is resumed, so it can go on to the next instruction set.


* put()

    Dispatches an action to the Redux store. Instead of passing in the Redux store or the dispatch action to the saga, we can just use put():

    yield put({ type: 'INCREMENT' })
    yield put({ type: "USER_FETCH_SUCCEEDED", data: data })

    which returns a plain object that we can easily inspect in out tests (more on testing later).


* call()

    When we want to call some function in a saga, we can do so by using a yielded plain function call that returns a promise:

    delay(1000)

    but this does not play nice with tests. Instead, call() allows us to wrap that function call and returns an object that can be easily inspected:

    call(delay, 1000)

    returns

    { CALL: {fn: delay, args: [1000]}}



* Running effects in parallel

    Running effects in parallel is possible using all() and race(), which are very different in what they do.


    *  all()

    If we write:

    import { call } from 'redux-saga/effects'

    const todos = yield call(fetch, '/api/todos')
    const user = yield call(fetch, '/api/user')

    the second fetch() call won’t be executed until the first one succeeds.

    To execute them in parallel, wrap them into all():

    import { all, call } from 'redux-saga/effects'

    const [todos, user]  = yield all([
    call(fetch, '/api/todos'),
    call(fetch, '/api/user')
    ])

    all() won’t be resolved until both call() return.
    

    *  race()

    race() differs from all() by not waiting for all of the helpers calls to return. It just waits for one to return, and it’s done.

    It’s a race to see which one finishes first, and then we forget about the other participants.

    It’s typically used to cancel a background task that runs forever until something occurs:

    import { race, call, take } from 'redux-saga/effects'

    function* someBackgroundTask() {
    while(1) {
        //...
    }
    }

    yield race([
    bgTask: call(someBackgroundTask),
    cancel: take('CANCEL_TASK')
    ])

    when the CANCEL_TASK action is emitted, we stop the other task that would otherwise run forever.

    * Effect combinators:

    race: a race between multiple sagas. When one of the sagas finishes, all the other sagas are canceled. similar to Promise.race([...])
    fork and race are used for managing concurrency between Sagas.
    all: run multiple Effects in parallel and wait for all of them to complete. similar to Promise.all.

 */