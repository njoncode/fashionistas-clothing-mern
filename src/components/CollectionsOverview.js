import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CollectionPreview from './CollectionPreview';
import { selectCollectionsForPreview } from '../redux/shop/shop.selectors'
import '../styles/collectionsOverview..scss';


// const CollectionsOverview = ({ collections }) => {
//     console.log('collections: ', collections)
//     return (
//     <div className='collections-overview'>
//         {collections.map(({id, ...otherCollectionProps}) =>
//             <CollectionPreview key={id} {...otherCollectionProps}/> 
//         )}
//     </div>
// )}

const CollectionsOverview = ({ collections, match}) => {
    console.log('collections: ', collections)
    console.log('CollectionsOverview match: ', match)
    return (
    <div className='collections-overview'>
        {collections.map(({id, ...otherCollectionProps}) =>
            <CollectionPreview key={id} {...otherCollectionProps} match={match}/> 
        )}
    </div>
)}

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
})

export default connect(mapStateToProps)(CollectionsOverview);