import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import Homepage from './components/Homepage';
import ShopPage from './components/ShopPage';
import Header from './components/Header';
import SignInAndSignUp from './components/SignInAndSignUp';

import { selectCurrentUser }  from './redux/user/userSelector';
import { createStructuredSelector } from 'reselect';


import CheckoutPage from './components/CheckoutPage';

class App extends React.Component {
  unsubscribeFromAuth = null;

  // To know the status of user logged in
  componentDidMount() {
   
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   // check if the user is signed in
    //   if (userAuth) {
    //     // if there is a document
    //     const userRef = await createUserProfileDocument(userAuth);

    //     userRef.onSnapshot(snapShot => {
    //       setCurrentUser({
    //         id: snapShot.id,
    //         ...snapShot.data()
    //       });
    //     });
    //   }
    //   // if the user logs out, set currentUser to null
    //   setCurrentUser(userAuth);
    // });

  }

  // To close the OAuth connection when we unmount our component
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  
  render() {
    
    return (
      <div> 
        <Header/>
        <Switch>
          <Route exact path='/' component= {Homepage}/>
          <Route path='/shop' component= {ShopPage}/>
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/'/>) : (<SignInAndSignUp />)} />
          <Route exact path='/checkout' component= {CheckoutPage}/>
          <Route render={() => <h2>404</h2>}/>
        </Switch>
      </div>
    );
  }
  }

const mapStateToProps = createStructuredSelector ({
    currentUser: selectCurrentUser,
});


export default connect(mapStateToProps)(App);
