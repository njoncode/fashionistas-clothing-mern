import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import './App.css';

import Homepage from './components/Homepage';
import ShopPage from './components/ShopPage';
import Header from './components/Header';
import SignInAndSignUp from './components/SignInAndSignUp';
import { auth, createUserProfileDocument } from './firebase/firebaseUtils'
import { setCurrentUserAction} from './redux/user/userActions';
import { selectCurrentUser }  from './redux/user/userSelector';
import { createStructuredSelector } from 'reselect';

import CheckoutPage from './components/CheckoutPage';

class App extends React.Component {

  unsubscribeFromAuth = null

  componentDidMount() {

    console.log('this.props: ', this.props)

    const {setCurrentUser} = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef= await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          }, () => {
            console.log(this.state)
          })
        });
      } else {
        setCurrentUser(userAuth);
        console.log(this.state)
      }
  });
}

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

  const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
  });

  const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUserAction(user))
  }); 

export default connect(mapStateToProps,mapDispatchToProps)(App);
