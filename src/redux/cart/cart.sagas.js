import { all, call, takeLatest, put } from 'redux-saga/effects';

import userConstants from '../user/user.constants';
import { clearCartAction } from './cart.actions';

export function* clearCartOnSignOut () {
    yield put(clearCartAction());
};

export function* onSignOutSuccess() {
    yield takeLatest(userConstants.SIGN_OUT_SUCCESS, clearCartOnSignOut);
};

export function* cartSagas () {
    yield all([call(onSignOutSuccess)]);
};