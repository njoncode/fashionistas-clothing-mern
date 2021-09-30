import userConstants from './user.constants'

export const googleSignInStartAction = () => ({
    type: userConstants.GOOGLE_SIGN_IN_START,
});

export const signInSuccessAction = user => ({
    type: userConstants.SIGN_IN_SUCCESS,
    payload: user
});

export const signInFailureAction = error => ({
    type: userConstants.SIGN_IN_FAILURE,
    payload: error
});

export const emailSignInStartAction = emailAndPassowrd => ({
    type: userConstants.EMAIL_SIGN_IN_START,
    payload: emailAndPassowrd
});

export const checkUserSessionAction = () => ({
    type: userConstants.CHECK_USER_SESSION
});


