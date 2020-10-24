import React, { useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase, { auth } from '../firebase';
import styled from 'styled-components';

const LoginContainer = styled.div`
    h2 {
        font-size: 20px;
        margin-top: 20px;
        text-align: center;
    }
` 

export default function Login() {
    const [isNewUser, setIsNewUser] = useState(false);

    const uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: (authResult, url) => {
                if (authResult.additionalUserInfo.isNewUser) {
                    // auth.signOut();
                    setIsNewUser(true);
                }
                console.log(authResult);
                console.log(url);
            }
        },
        signInFlow: 'popup',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ]
    };

    return (
        <LoginContainer>
            {
                isNewUser
                ? <h2>You have been logged out. You can sign in once your account has been verified.</h2>
                : <>
                    <h2>Sign in</h2>
                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                </>
            }
        </LoginContainer>

    );
}