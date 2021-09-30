import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import Homepage from './components/Homepage';
import ShopPage from './components/ShopPage';
import Header from './components/Header';
import SignInAndSignUp from './components/SignInAndSignUp';

import { selectCurrentUser }  from './redux/user/userSelector';
import { checkUserSessionAction } from './redux/user/user.actions';

import CheckoutPage from './components/CheckoutPage';

class App extends React.Component {
  unsubscribeFromAuth = null;

  // To know the status of user logged in
  componentDidMount() {
    const { checkUserSessionDispatch } = this.props;
    checkUserSessionDispatch();
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

const mapDispatchToProps = dispatch => ({
  checkUserSessionDispatch: () => dispatch(checkUserSessionAction())
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
