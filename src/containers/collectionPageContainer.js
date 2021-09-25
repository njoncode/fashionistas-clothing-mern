import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import { selectIsCollectionsLoaded } from '../redux/shop/shop.selectors';

import WithSpinner from "../components/WithSpinner";
import CollectionPage from "../components/CollectionPage";

const mapStateToProps = createStructuredSelector({
    isLoading: (state) => !selectIsCollectionsLoaded(state) 
});

const CollectionPageContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionPage);

export default CollectionPageContainer;



/**
 const mapStateToProps = createStructuredSelector({
    isLoading: (state) => !selectIsCollectionsLoaded(state) 
 });

 We need to inverse the value that we pass into isLoading. 
 So we will pass it a function that will get the state & this will still memoize our selector if we pass it our selectIsCollectionsLoaded passing in the state.

 */

