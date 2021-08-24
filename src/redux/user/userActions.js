import { userConstant }from './userConstants'

export const setCurrentUserAction = user => ({
    type: userConstant.SET_CURRENT_USER,
    payload: user
})