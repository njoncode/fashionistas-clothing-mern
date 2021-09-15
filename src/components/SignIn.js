import React from 'react';
import '../styles/signIn.scss';
import FormInput from './FormInput';
import CustomButton from './CustomButton';
import {auth, signInWithGoogle} from '../firebase/firebaseUtils';

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
 
        const { email, password } = this.state;
        
        try{
            await auth.signInWithEmailAndPassword(email, password);
            // if succeed clear the current state
            this.setState({ email: '', password: ''})
        } catch (error) {
            console.log(error);
        }
    }

    render() {
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
                    <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn>
                        Sign in with Google
                    </CustomButton>
                </div>
            </form>
        </div>
        )
    }
}

export default SignIn; 

/**
 If we see that our sign in with google button causes the email and password fields to trigger asking the user to fill these in, 
 we simply add the property type="button" to our google sign in button!
 The reason this happens is because any buttons inside of a form element will cause the form to treat the button as type="submit" by default. 
 We don't want that for our google sign in button though, so we just make sure to add type="button" to our google sign in CustomButton.

    <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn>
        Sign in with Google
    </CustomButton>
 */