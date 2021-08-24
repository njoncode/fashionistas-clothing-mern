import React from 'react';
import { Route } from 'react-router-dom';
import CollectionsOverview from './CollectionsOverview';
import CollectionPage from './CollectionPage';

const ShopPage = ({ match }) => {
    console.log('match: ShopPage ', match);
    return (
        <div className='shope-page'>
            <Route exact path={match.path} component={CollectionsOverview}/>
            <Route path={`${match.path}/:collectionId`} component={CollectionPage}/>
        </div>
    )
}

export default ShopPage;




