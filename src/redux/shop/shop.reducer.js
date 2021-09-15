import shopConstants from './shop.constants';

const INITIAL_STATE = {
    collections: null
}

const shopReducer = (state = INITIAL_STATE, action ) => {
    switch(action.type) {
        case shopConstants.UPDATE_COLLECTIONS: 
            return {
                ...state,
                collections: action.payload
            }
        default:
            return state;
    }
}

export default shopReducer;