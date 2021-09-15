import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createSelectorCreator } from 'reselect';

import { firestore, convertCollectionsSnapshotToMap } from '../firebase/firebaseUtils';

import CollectionsOverview from './CollectionsOverview';
import CollectionPage from './CollectionPage';

import { updateCollections } from '../redux/shop/shop.actions';

import WithSpinner from './WithSpinner';
import CollectionPreview from './CollectionPreview';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {

   state = {
       loading: true
   }

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections} = this.props;
        const collectionRef = firestore.collection('collections');

        // Promise style
        // .get makes an api call to fetch back the data associated to this collectionRef.
        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot); 
            updateCollections(collectionsMap);
            this.setState({ loading: false });
        })

        // Observable style
         
        // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot); 
        //     updateCollections(collectionsMap);
        //     this.setState({ loading: false });
        // });
    };

     

    render() {
        const { match } = this.props;
        const { loading } = this.state;

        return (
            <div className='shope-page'>
                <Route exact path={match.path} render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props} />}/>
                <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} />}/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps) (ShopPage);




