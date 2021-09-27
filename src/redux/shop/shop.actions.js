import shopConstants from './shop.constants';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebaseUtils';


export const fetchCollectionsStart = () => ({
    type: shopConstants.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = collectionsMap => ({
    type: shopConstants.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});


export const fetchCollectionsFailure = errorMessage => ({
    type: shopConstants.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
})

// export const fetchCollectionsStartAsync = () => {
//     // We are able to dispatch because of redux-think library.
//     return dispatch => {
//         const collectionRef = firestore.collection('collections');
//         dispatch(fetchCollectionsStart());

//         // .get makes an api call to fetch back the data associated to this collectionRef.
//         collectionRef
//             .get()
//             .then(snapshot => {
//                 const collectionsMap = convertCollectionsSnapshotToMap(snapshot); 
//                 dispatch(fetchCollectionsSuccess(collectionsMap));
//         })
//             .catch(error =>  dispatch(fetchCollectionsFailure(error.message)));
//     };
// };


/**
 * 
 * Thunk is a middleware that allows us to do asynchronous actions.
 
 * All Thunks are is an action creator that returns a function that gets the dispatch very similar to the mapDispatchToProps.
   Instead of creating an action that returns an action (action === javascript object), we are gonna write a function that returns a function that gets dispatch in it.

 * Redux-thunk is a middleware that intercepts our action before they go into our reducer.
   In earlier, ever time we dispatched an action it just went straight to the reducer as an object. We had the action type & the action payload.
   
   But Redux-thunk allows us to catch the action & it is only gonna detect actions that aren't object, 
   So anything that is not an object and  instead a function, Redux-thunk is gonna be interested in it.
   It's gonna ignore fetchCollectionsStart, fetchCollectionsSuccess, fetchCollectionsFailure because it returns an object. 
   It's only gonna catch fetchCollectionsStartAsync because it returns a function.

 * Redux thunk doesn't care about action objects.
   As soon as Redux thunk sees a function, it's gonna give the dispatch functionality as the parameter.
 
 * It detects a function & gives it a dispatch so that we can go back to giving synchronous action objects to the root reducer.

*/
