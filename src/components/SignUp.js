import React from 'react';
import '../styles/signIn.scss';
import FormInput from './FormInput';
import CustomButton from './CustomButton';
import {auth, createUserProfileDocument} from '../firebase/firebaseUtils';

class SignUp extends React.Component {
    constructor() { 
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }   
    }

    handleOnChange = e => {
       const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = async e => {
        e.preventDefault()
        
        const {displayName, email, password, confirmPassword} = this.state
        
        if(password !== confirmPassword) {
            alert('Passwords do not match')
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            await createUserProfileDocument(user, { displayName });
        
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        } catch(error) {
            console.log(error)
        }
    }

    render() {
        const {displayName, email, password, confirmPassword} = this.state
        return (
            <div className='sign-up'>
                <h2>I do not have an account</h2>
                <span>Sign up with your email and password</span>
            <form className='sign-up-form' onSubmit={this.handleSubmit}>
            <FormInput 
                type='text'
                name='displayName'
                value={displayName}
                onChange={this.handleOnChange}
                label='Display Name'
                required
            />
            <FormInput 
                type='text'
                name='email'
                value={email}
                onChange={this.handleOnChange}
                label='Email'
                required
            />
            <FormInput 
                type='password'
                name='password'
                value={password}
                onChange={this.handleOnChange}
                label='Password'
                required
            />
            <FormInput 
                type='password'
                name='confirmPassword'
                value={confirmPassword}
                onChange={this.handleOnChange}
                label='Confirm Password'
                required
            />
            <CustomButton type='submit'>SIGN UP</CustomButton>
            </form>
            </div>
        )
    }
}

export default SignUp;