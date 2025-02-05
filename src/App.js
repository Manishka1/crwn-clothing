import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import {connect} from 'react-redux';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component'; 
import HatsPage from './pages/hats/hats.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { onSnapshot } from 'firebase/firestore'; // Import onSnapshot for Firebase v9
import { setCurrentUser } from './redux/user/user.actions';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
  const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        
        // Use onSnapshot as a standalone function
        onSnapshot(userRef, (snapshot) => {
          setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
          },
          () => {
            console.log(this.state);
          });
        });
      } else {
        setCurrentUser({ currentUser: userAuth });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header /*currentUser={this.state.currentUser}*/ />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/shop' element={<ShopPage />} />
          <Route path='/signin' element={<SignInAndSignUpPage />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/hats" element={<HatsPage />} />
        </Routes>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(App);
