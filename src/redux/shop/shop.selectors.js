import { createSelector, createSelectorCreator } from 'reselect';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []  
    // Converting collections object into an array so that we could map through it in CollectionsOverview Component.
);


export const selectCollection = collectionUrlParam => 
    createSelector(
        [selectCollections],
        collections => (collections ? collections[collectionUrlParam] : null)
    );


/**
 * ownProps gives us all of the props that we are getting on our collectionPage component,
   including our match object that we get from the route component that is passing our collection on our shopPage.
 */