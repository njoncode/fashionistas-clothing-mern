import userConstants from "./user.constants";

const INTITAL_STATE = {
    currentUser: null,
    error: null
};

const userReducer = (state = INTITAL_STATE, action) => {
    switch(action.type) {
        case userConstants.GOOGLE_SIGN_IN_SUCCESS:
        case userConstants.EMAIL_SIGN_IN_SUCCESS:
            return { 
                ...state,
                currentUser: action.payload,
                error: null
            };
        case userConstants.GOOGLE_SIGN_IN_FAILURE:
        case userConstants.EMAIL_SIGN_IN_FAILURE:
            return { 
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default userReducer;