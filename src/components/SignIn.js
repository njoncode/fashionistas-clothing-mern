import React from 'react';
import { connect } from 'react-redux';

import '../styles/signIn.scss';

import FormInput from './FormInput';
import CustomButton from './CustomButton';

import { googleSignInStartAction, emailSignInStartAction } from '../redux/user/user.actions';

class SignIn extends React.Component {
    constructor(props) { 
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleOnChange = event => {

        const {value, name} = event.target;

        this.setState({ [name]: value })
    }

    handleSubmit = async event => {
        event.preventDefault();
 
        const { emailSignInStartDispatch } = this.props
        const { email, password } = this.state;
        
        emailSignInStartDispatch(email, password);   
    };

    render() {
        const { googleSignInStartDispatch } = this.props;

        return (
            <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
        
            <form onSubmit={this.handleSubmit}>
                <FormInput
                    name='email' 
                    type='email' 
                    handleChange={this.handleOnChange}
                    value={this.state.email} 
                    label='Email'
                    required 
                />
                <FormInput
                    name='password' 
                    type='password' 
                    value={this.state.password} 
                    handleChange={this.handleOnChange}
                    label='Password'
                    required 
                />
                <div className='buttons'>
                    <CustomButton type='submit'>Sign in</CustomButton >
                    <CustomButton 
                        type='button' 
                        onClick={googleSignInStartDispatch} 
                        isGoogleSignIn
                    >
                        Sign in with Google
                    </CustomButton>
                </div>¯
            </form>
        </div>
        )
    }
};

const mapDispatchToProps = dispatch => ({
    googleSignInStartDispatch: () => dispatch(googleSignInStartAction()),
    emailSignInStartDispatch: (email, password) => dispatch(emailSignInStartAction({ email, password }))
})

export default connect(null, mapDispatchToProps)(SignIn); 

/**
 If we see that our sign in with google button causes the email and password fields to trigger asking the user to fill these in, 
 we simply add the property type="button" to our google sign in button!
 The reason this happens is because any buttons inside of a form element will cause the form to treat the button as type="submit" by default. 
 We don't want that for our google sign in button though, so we just make sure to add type="button" to our google sign in CustomButton.

    <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn>
        Sign in with Google
    </CustomButton>
 */


/**

 *  <CustomButton type='button' onClick={signInWithGoogle} isGoogleSignIn>
        Sign in with Google
    </CustomButton>
 
    If we don't put type='button' on CustomButton, then when we click on "Sign in with Google" button, this form will just trigger an onSubmit just because this button is also part of the form element.
    It's just the nature of what we have to do with buttons. Even if we have the type submit in the first button and the second button doesn't have the type='submit', this will unfortunately still trigger a signin.

    By doing type='button', our button now no longer will trigger the submit form.

    */