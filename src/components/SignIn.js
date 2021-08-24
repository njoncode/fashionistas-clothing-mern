import React from 'react';
import '../styles/signIn.scss';
import FormInput from './FormInput';
import CustomButton from './CustomButton';
import {auth, signInWithGoogle} from '../firebase/firebaseUtils';

class SignIn extends React.Component {
    constructor() { 
        super();

        this.state = {
            email: '',
            password: ''
        }   
    }

    handleOnChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = async e => {
        e.preventDefault();
 
        const { email, password } = this.state;
        
        try{
            await auth.signInWithEmailAndPassword(email, password);
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
                    <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                        Sign in with Google
                    </CustomButton>
                </div>
            </form>
        </div>
        )
    }
}

export default SignIn;