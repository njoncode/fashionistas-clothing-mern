import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import '../styles/collectionPage.scss';
import { selectCollections } from '../redux/shop/shopSelector';
import CollectionItem from './CollectionItem';


const CollectionPage = ({collections, match}) => {
    // console.log('Collections: ', collections)
    // console.log('match: CategoryPage ', match)
    const collectionCategory = collections.find(collection => (collection.routeName) === match.params.collectionId)
    // console.log('collectionCategory: ', collectionCategory)
    return (
        <div className='collection-page'>
            <h2 className='title'>{collectionCategory.title}</h2>
            <div className='items'>
            {collectionCategory.items.map(collectionCategoryItem => <CollectionItem item={collectionCategoryItem}/>)}
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    collections: selectCollections 
})

export default connect(mapStateToProps)(CollectionPage);