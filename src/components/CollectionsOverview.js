import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CollectionPreview from './CollectionPreview';
import { selectCollectionsForPreview } from '../redux/shop/shopSelector'
import '../styles/collectionsOverview..scss';


const CollectionsOverview = ({ collections }) => {
    console.log('collections: ', collections)
    return (
    <div className='collections-overview'>
        {collections.map(({id, ...otherCollectionProps}) =>
            <CollectionPreview key={id} {...otherCollectionProps}/> 
        )}
    </div>
)}

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
})

export default connect(mapStateToProps)(CollectionsOverview);