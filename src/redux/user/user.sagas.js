import { takeLatest, put, all, call } from 'redux-saga/effects';

import { auth, googleProvider, createUserProfileDocument } from '../../firebase/firebaseUtils';

import userConstants from './user.constants';
import  { signInSuccessAction, signInFailureAction } from './user.actions';


export function* getSnapshotFromUserAuth(userAuth) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccessAction({ id: userSnapshot.id, ...userSnapshot.data() }));
    } catch (error) {
        yield put(signInFailureAction(error));
    }
};

export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch (error) { 
        yield put(signInFailureAction(error));
    }
};

export function* signInWithEmail({ payload: { email, password }}) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password)
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailureAction(error));
    }
};


export function* onGoogleSignInStart() {
    yield takeLatest(userConstants.GOOGLE_SIGN_IN_START, signInWithGoogle);
};

export function* onEmailSignInStart() {
    yield takeLatest(userConstants.EMAIL_SIGN_IN_START, signInWithEmail);
};

export function* userSagas() {
    yield all([call(onGoogleSignInStart), call(onEmailSignInStart)])
};






/**
 *  put():  puts things back into our regular Redux flow.

 *  yield put(signInFailureAction(error));
    put is another effect provided by redux-saga which can be used to dispatch actions in a saga. 
    So this instructs the middleware to dispatch an action signInFailureAction to the store.
 
 */




/**
 * 
 * Redux saga passes multiple parameters in Redux saga action to watcher saga.
 
 * It all works around your action creator addCartRequest,

    let's say it returns an object like:

    export const emailSignInStartAction = emailAndPassowrd => ({
        type: userConstants.EMAIL_SIGN_IN_START,
        payload: emailAndPassowrd
    });

 *  saga watcher yield takeLatest(userConstants.EMAIL_SIGN_IN_START, signInWithEmail); will pass the whole object to signInWithEmail.
    
    We can access their values assuming the first param as the whole object:

    export function* signInWithEmail(action) {
        console.log("actionType--->", action.type);
        console.log("payload--->", action.payload);
    };

*/




/**
 * Effects are divided into two groups in redux-saga, blocking call and non-blocking call.

    Blocking/Non-blocking call:

    A Blocking call means that the Saga yielded an Effect and will wait for the outcome of its execution before resuming to the next instruction inside the yielding Generator.

    A Non-blocking call means that the Saga will resume immediately after yielding the Effect.

    For example:

    import {call, cancel, join, take, put} from "redux-saga/effects"

    function* saga() {
    yield take(ACTION)              // Blocking: will wait for the action
    yield call(ApiFn, ...args)      // Blocking: will wait for ApiFn (If ApiFn returns a Promise)
    yield call(otherSaga, ...args)  // Blocking: will wait for otherSaga to terminate

    yield put(...)                   // Non-Blocking: will dispatch within internal scheduler

    const task = yield fork(otherSaga, ...args)  // Non-blocking: will not wait for otherSaga
    yield cancel(task)                           // Non-blocking: will resume immediately
    // or
    yield join(task)                              // Blocking: will wait for the task to terminate
    }

 */




/**
 * SUMMARY:

 * saga.js
This is the file where all the async calls/side-effects are being handled. In redux-thunk the async logic is put in the action creators, but in redux-saga, we have a dedicated file for this usually called sagas.

The saga file is usually structured in a way that we have two types of generator functions(sagas):

    Worker Function
    Watcher Function

* The Watcher function waits/watches for a specific action to be dispatched to the redux store, then it calls the respective worker function which handles the side-effects/API calls.

The two watcher functions are:

    onGoogleSignInStart
    onEmailSignInStart

The onGoogleSignInStart yields an effect called takeEvery(), which takes an action and a function as arguments. takeEvery is a redux-saga helper effect that tells redux-saga to continuously and concurrently wait for an action of type GOOGLE_SIGN_IN_START to be dispatched, immediately it is dispatched, it should execute the signInWithGoogle function which handles the side-effects. We have another similar helper effects to takeEvery that can be used to listen for actions dispatched called takeLatest.

takeLatest calls its worker saga every time an action’s dispatched and it automatically cancels any previous execution of the worker saga if it is still running, while takeEvery does not cancel any previous saga.

The onEmailSignInStart is similar to the onGoogleSignInStart. When an action of type EMAIL_SIGN_IN_START is dispatched, it calls the signInWithEmail function.

We now know that the watcher functions call the worker functions, so what happens in them?

In the signInWithGoogle function, it first yields a function call that takes the createUserProfileDocument function we exported from the firebaseUtils.js file.


call is another helper effects provided by redux-saga, it is used to execute/call a function but if that function is a promise it pauses the saga until the promises are resolved. The call effect is like await in async-await syntax.

const userRef = yield call(createUserProfileDocument, user);

So what the line above does is call the createUserProfileDocument async function, wait for it to be resolved, then the response is saved in the userRef variable. If the promise failed then it is caught in the catch block of the try-catch.


* If the promise was successful, execution of the saga resumes to the next line:

    yield put(signInSuccessAction({ id: userSnapshot.id, ...userSnapshot.data() }) );


put is another helper effect which is used to dispatch an action to the redux store. The line above dispatches a signInSuccessAction() action with the ({ id: userSnapshot.id, ...userSnapshot.data() }) as an argument, so the reducer can update the store state.


* If the promise failed then execution continues in the catch block.

    catch (error) {
            yield put(signInFailureAction(error));
    }

This dispatches an action to the store to indicate the request failed.


* The call effect takes a second argument.
   
    const userRef = yield call(createUserProfileDocument, user);
	
This second argument makes it possible to pass an argument to the createUserProfileDocument function, so it looks something like this when it is called.

    call(createUserProfileDocument(user));


* Some benefits of using Redux-saga:

    Easier to test because we don’t have to mock API calls.
    Looks cleaner because we don’t have to deal with callbacks and asynchronous tasks are achieved in a synchronous nature.
 
 */