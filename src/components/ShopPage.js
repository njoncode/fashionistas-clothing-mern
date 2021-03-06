import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../redux/shop/shop.actions';

import CollectionsOverviewContainer from '../containers/collectionsOverviewContainer';
import CollectionPageContainer from '../containers/collectionPageContainer';


const ShopPage = ({ fetchCollectionsStart, match }) => {

    useEffect(() => {
        fetchCollectionsStart();
    }, [fetchCollectionsStart]);
        
    return (
        <div className='shope-page'>
            <Route 
                exact 
                path={match.path} 
                component={CollectionsOverviewContainer}
            />
            <Route 
                path={`${match.path}/:collectionId`} 
                component={CollectionPageContainer}
            />
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(
    null, 
    mapDispatchToProps
    )(ShopPage);




