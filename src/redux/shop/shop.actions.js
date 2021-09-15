import shopConstants from './shop.constants';

export const updateCollections = (collectionsMap) => ({
    type: shopConstants.UPDATE_COLLECTIONS,
    payload: collectionsMap
})
