import { takeLatest, put, all, call } from 'redux-saga/effects';

import { auth, googleProvider, createUserProfileDocument } from '../../firebase/firebaseUtils';

import userConstants from './user.constants';
import  { googleSignInSuccessAction, googleSignInFailureAction } from './user.actions';


export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();
        yield put(
            googleSignInSuccessAction({ id: userSnapshot.id, ...userSnapshot.data() })
        );
    } catch (error) {
        yield put(googleSignInFailureAction(error));
    }
};

export function* onGoogleSignInStart() {
    yield takeLatest(userConstants.GOOGLE_SIGN_IN_START, signInWithGoogle);
};

export function* userSagas() {
    yield all([call(onGoogleSignInStart)])
}



/**
 *  put():  puts things back into our regular Redux flow.
 */