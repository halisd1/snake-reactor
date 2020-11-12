import React from 'react';

import {
    LoginContainer,
    LoginMessageModal,
    LoginContainerHeading,
    ErrorDiv,
    UserNotFoundError,
  } from "../styles/Main.styles";
  
  import {
    UsernameInput,
  } from "../styles/UserProfile.styles";
  
  import {
    RewardsButtonsContainer,
    ResultsButtonContainerSingle,
    Icon,
  } from "../styles/Modals.styles";

export default function Login({ handleLoginUser, userNameLoginField, setUserNameLoginField, toggleLoginScreen, userError, setUserError }){
    return (
        <LoginMessageModal>
          <LoginContainer>
            <LoginContainerHeading style={{ fontFamily: 'Cartoon' }}>
              Login
            </LoginContainerHeading>
            <UsernameInput 
              value={userNameLoginField}
              placeholder='username' 
              maxLength={20} 
              minLength={3}
              onChangeText={(text) => setUserNameLoginField(text)}
              />
              {userError ? 
                <ErrorDiv>
                  <UserNotFoundError>
                      {userError === 1 && 'User not found, please try again!'}
                      {userError === 3 && 'Invalid length for username'}
                  </UserNotFoundError>
                </ErrorDiv>
                :
                <ErrorDiv />
              }
            <RewardsButtonsContainer>
                <ResultsButtonContainerSingle onPress={() => { 
                    toggleLoginScreen(false);
                    setUserNameLoginField('');
                    setUserError(false);
                    }}>
                    <Icon source={require("../assets/cross.png")} /> 
                </ResultsButtonContainerSingle>
                <ResultsButtonContainerSingle onPress={() => handleLoginUser()} >
                    <Icon source={require("../assets/checkmark.png")} /> 
                </ResultsButtonContainerSingle>
            </RewardsButtonsContainer> 
          </LoginContainer>
        </LoginMessageModal>
    )
}

