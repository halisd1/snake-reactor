/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Text, TextInput, View, TouchableOpacity} from 'react-native';
import {useFonts} from 'expo-font';
import {Audio} from 'expo-av';

import {
  UserProfileContainer,
  HeadingContainer,
  Heading,
  UsernameInput,
  ButtonsContainer,
  SingleButton,
  ButtonText,
  SecondaryHeadingContainer,
  SecondaryHeading,
  SubmitButton,
} from '../styles/UserProfile.styles';

import {ErrorDiv, UserNotFoundError} from '../styles/Main.styles';

import {SnakeBackground} from '../styles/HighScores.styles';

export default function Register({
  handleSubmitPlayer,
  userAgeField,
  setUserAgeField,
  userGenderField,
  setUserGenderField,
  userError,
  userNameRegisterField,
  setUserNameRegisterField,
  showProfileModal,
  toggleProfileModal,
  toggleMainMenu,
}) {
  const [error, setError] = useState(false);

  let buttonSound = new Audio.Sound();

  //BUTTON INTERACTION  SOUND FILES
  const loadButtonSound = async () => {
    try {
      await buttonSound.loadAsync(require('../assets/interface1.wav'));
      await buttonSound.playAsync();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setUserAgeField(null);
    setUserGenderField(null);
    setUserNameRegisterField('');
  }, []);

  //FONTS
  const [fontsLoaded] = useFonts({
    Cartoon: require('../assets/cartoon.ttf'),
  });

  const handleSubmit = async () => {
    if (
      userAgeField === null ||
      userGenderField === null ||
      !userNameRegisterField.length ||
      userNameRegisterField.length < 3 ||
      userNameRegisterField.length > 20
    ) {
      //Play Button Sound
      loadButtonSound();
      await setError(true);
    } else {
      await setError(false);
      const playerInfo = {
        username: userNameRegisterField,
        age: userAgeField,
        gender: userGenderField,
      };
      handleSubmitPlayer(playerInfo);
    }
  };

  return (
    <>
      {showProfileModal && (
        <SnakeBackground
          source={require('../assets/wallpaper.png')}
          resizeMode="contain"
        />
      )}
      <UserProfileContainer>
        <HeadingContainer>
          <Heading style={{fontFamily: 'Cartoon'}}>Create a new player</Heading>
        </HeadingContainer>
        <SecondaryHeadingContainer>
          <SecondaryHeading style={{fontFamily: 'Cartoon'}}>
            Username
          </SecondaryHeading>
        </SecondaryHeadingContainer>
        <UsernameInput
          value={userNameRegisterField}
          placeholder="username"
          maxLength={20}
          minLength={3}
          onChangeText={(text) => setUserNameRegisterField(text)}
        />
        <SecondaryHeadingContainer>
          <SecondaryHeading style={{fontFamily: 'Cartoon'}}>
            Gender
          </SecondaryHeading>
        </SecondaryHeadingContainer>
        <ButtonsContainer>
          <SingleButton
            onPress={() => {
              setUserGenderField('male');
              loadButtonSound();
            }}
            style={
              userGenderField === 'male' ? {backgroundColor: '#838D8D'} : null
            }>
            <ButtonText>Male ♀</ButtonText>
          </SingleButton>
          <SingleButton
            onPress={() => {
              setUserGenderField('female');
              loadButtonSound();
            }}
            style={
              userGenderField === 'female' ? {backgroundColor: '#838D8D'} : null
            }>
            <ButtonText>Female ♂</ButtonText>
          </SingleButton>
          <SingleButton
            onPress={() => {
              setUserGenderField('neutral');
              loadButtonSound();
            }}
            style={
              userGenderField === 'neutral'
                ? {backgroundColor: '#838D8D'}
                : null
            }>
            <ButtonText>Neutral ⚧</ButtonText>
          </SingleButton>
        </ButtonsContainer>
        <SecondaryHeadingContainer>
          <SecondaryHeading style={{fontFamily: 'Cartoon'}}>
            Age
          </SecondaryHeading>
        </SecondaryHeadingContainer>
        <ButtonsContainer>
          <SingleButton
            onPress={() => {
              setUserAgeField(1);
              loadButtonSound();
            }}
            style={userAgeField === 1 ? {backgroundColor: '#838D8D'} : null}>
            <ButtonText>Gen Z (7-22)</ButtonText>
          </SingleButton>
          <SingleButton
            onPress={() => {
              setUserAgeField(2);
              loadButtonSound();
            }}
            style={userAgeField === 2 ? {backgroundColor: '#838D8D'} : null}>
            <ButtonText>Millennial (23-38)</ButtonText>
          </SingleButton>
        </ButtonsContainer>
        <ButtonsContainer>
          <SingleButton
            onPress={() => {
              setUserAgeField(3);
              loadButtonSound();
            }}
            style={userAgeField === 3 ? {backgroundColor: '#838D8D'} : null}>
            <ButtonText>Gen X (39-54)</ButtonText>
          </SingleButton>
          <SingleButton
            onPress={() => {
              setUserAgeField(4);
              loadButtonSound();
            }}
            style={userAgeField === 4 ? {backgroundColor: '#838D8D'} : null}>
            <ButtonText>Boomer (55-73)</ButtonText>
          </SingleButton>
        </ButtonsContainer>
        {userError ? (
          <ErrorDiv>
            <UserNotFoundError>
              {userError === 2 && 'User exists, please try again!'}
            </UserNotFoundError>
          </ErrorDiv>
        ) : (
          <ErrorDiv />
        )}
        <SubmitButton
          onPress={() => handleSubmit()}
          style={error === true ? {backgroundColor: 'red'} : null}>
          <SecondaryHeading style={{fontFamily: 'Cartoon'}}>
            Submit
          </SecondaryHeading>
        </SubmitButton>
        <SubmitButton
          onPress={() => {
            toggleProfileModal(false);
            toggleMainMenu(true);
          }}>
          <SecondaryHeading style={{fontFamily: 'Cartoon'}}>
            Return
          </SecondaryHeading>
        </SubmitButton>
      </UserProfileContainer>
    </>
  );
}
