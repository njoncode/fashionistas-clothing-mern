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

export const emailSignInStartAction = emailAndPassword => ({
    type: userConstants.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
});

export const checkUserSessionAction = () => ({
    type: userConstants.CHECK_USER_SESSION
});

export const signOutStartAction = () => ({
    type: userConstants.SIGN_OUT_START,
});

export const signOutSuccessAction = () => ({
    type: userConstants.SIGN_OUT_SUCCESS,
});

export const signOutFailureAction = error => ({
    type: userConstants.SIGN_OUT_FAILURE,
    payload: error
});

export const signUpStartAction = (userCredentials) => ({
    type: userConstants.SIGN_UP_START,
    payload: userCredentials
});

export const signUpSuccessAction = ({ user, additionalData }) => ({
    type: userConstants.SIGN_UP_SUCCESS,
    payload: { user, additionalData }
});
 
export const signUpFailureAction = error => ({
    type: userConstants.SIGN_UP_FAILURE,
    payload: error
});




