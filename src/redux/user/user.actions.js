import userConstants from './user.constants'

export const setCurrentUserAction = user => ({
    type: userConstants.SET_CURRENT_USER,
    payload: user
});

export const googleSignInStartAction = () => ({
    type: userConstants.GOOGLE_SIGN_IN_START,
});

export const googleSignInSuccessAction = user => ({
    type: userConstants.GOOGLE_SIGN_IN_SUCCESS,
    payload: user
});

export const googleSignInFailureAction = error => ({
    type: userConstants.GOOGLE_SIGN_IN_FAILURE,
    payload: error
});

export const emailSignInStartAction = emailAndPassowrd => ({
    type: userConstants.EMAIL_SIGN_IN_START,
    payload: emailAndPassowrd
});

export const emailSignInSuccessAction = user => ({
    type: userConstants.EMAIL_SIGN_IN_SUCCESS,
    payload: user
});

export const emailSignInFailureAction = error => ({
    type: userConstants.EMAIL_SIGN_IN_FAILURE,
    payload: error
});

