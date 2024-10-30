import React from "react";
import FormInput from "../../components/form-input/form-input.component";
import './sign-in.styles.scss';
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
import CustomButton from "../../components/custom-button/custom-button.component";
import { signOut, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            currentUser: null 
        };
    }

    componentDidMount() {
        // Listen for authentication state changes
        this.unsubscribeFromAuth = onAuthStateChanged(auth, user => {
            this.setState({ currentUser: user });
        });
    }

    componentWillUnmount() {
        // Clean up the subscription on unmount
        this.unsubscribeFromAuth();
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { email, password } = this.state;

        try {
            // Sign in the user with email and password
            await signInWithEmailAndPassword(auth, email, password);
            this.setState({ email: '', password: '' });
        }catch(error){
            console.error('Error signing in:', error);
        }
    }

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }

    handleSignOut = async () => {
        try {
            await signOut(auth); // Sign out the user
        } catch (error) {
            console.error('Error signing out:', error);
        }
    }

    handleSignInWithGoogle = async () => {
        try {
            await signInWithGoogle(); // Call the signInWithGoogle function
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    }
    
    render() {
        const { currentUser } = this.state; // Destructure currentUser from state

        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        name='email' 
                        type='email' 
                        value={this.state.email} 
                        handleChange={this.handleChange}
                        label="email"
                        required 
                    />
                    
                    <FormInput 
                        name='password' 
                        type='password' 
                        value={this.state.password}
                        handleChange={this.handleChange}
                        label="password"
                        required 
                    />
                    <div className='buttons'>
                        {currentUser ? (
                            <CustomButton onClick={this.handleSignOut}>Sign Out</CustomButton>
                        ) : (
                            <CustomButton type='submit'>Sign In</CustomButton>
                        )}
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                            {' '} Sign In with Google {' '}
                        </CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignIn;
