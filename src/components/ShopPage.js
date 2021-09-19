import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createSelectorCreator, createStructuredSelector } from 'reselect';

import CollectionsOverview from './CollectionsOverview';
import CollectionPage from './CollectionPage';
import WithSpinner from './WithSpinner';

import { fetchCollectionsStartAsync } from '../redux/shop/shop.actions';
import { selectIsCollectionFetching, selectIsCollectionsLoaded}  from '../redux/shop/shop.selectors';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {

    componentDidMount() {
        const { fetchCollectionsStartAsync } = this.props;
        fetchCollectionsStartAsync();
    };

    render() {
        const { match, isFetchingCollections, isCollectionsLoaded} = this.props;

        return (
            <div className='shope-page'>
                <Route exact path={match.path} render={(props) => <CollectionsOverviewWithSpinner isLoading={isFetchingCollections} {...props} />}/>
                <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} />}/>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    isFetchingCollections: selectIsCollectionFetching,
    isCollectionsLoaded: selectIsCollectionsLoaded
});

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});


export default connect(mapStateToProps, mapDispatchToProps) (ShopPage);




