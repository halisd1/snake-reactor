/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, Text, Image, Button, ImageBackground} from 'react-native';
import {useFonts} from 'expo-font';
import {Audio} from 'expo-av';

import Axios from 'react-native-axios';

import Main from './components/Main';
import HighScores from './components/HighScores';
import Register from './components/Register';
import Login from './components/Login';
import AdvertisementModal from './components/modals/AdvertisementModal';
import NavBar from './components/NavBar';
import RedeemRewards from './components/RedeemRewards';

import {
  AppContainer,
  SplashImageBackground,
  SplashImage,
  MainMenuButtonContainer,
  GameButton,
  ButtonContainer,
  MainLogoContainer,
  NavBarSpacer,
  GameButtonText,
} from './styles/Main.styles';

import {SnakeBackground} from './styles/HighScores.styles';

export default function App() {
  //FONTS
  const [fontsLoaded] = useFonts({
    Cartoon: require('./assets/cartoon.ttf'),
  });

  //USER INFO
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [gender, setGender] = useState(null);
  const [age, setAge] = useState(null);
  const [userHighScore, setUserHighScore] = useState(0);
  const [userRewards, setUserRewards] = useState(0);

  //USER REWARDS
  const [rewardTokens, setRewardTokens] = useState({});

  //USER NAME INPUT FIELD
  const [userNameRegisterField, setUserNameRegisterField] = useState('');
  const [userNameLoginField, setUserNameLoginField] = useState('');
  const [userGenderField, setUserGenderField] = useState(null);
  const [userAgeField, setUserAgeField] = useState(null);
  const [userError, setUserError] = useState(null);

  //MENU STATE
  const [companySplash, toggleCompanySplash] = useState(true);
  const [gameMode, toggleGameMode] = useState(false);
  const [mainMenu, toggleMainMenu] = useState(false);
  const [loginScreen, toggleLoginScreen] = useState(false);
  const [showProfileModal, toggleProfileModal] = useState(false);
  const [highScoresModal, toggleHighScoresModal] = useState(false);
  const [redeemRewards, toggleRedeemRewards] = useState(false);
  const [showAdvertisementModal, toggleAdvertisementModal] = useState(false);

  //HIGH SCORES
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      toggleCompanySplash(false);
      toggleMainMenu(true);
    }, 6000);
  }, []);

  //SPLASH LOGO
  const mainLogo = (
    <SplashImage
      resizeMode="contain"
      source={require('./assets/MainSplash.png')}
    />
  );

  //SPLASH SCREEN SOUND FILES
  let splashSound = new Audio.Sound();

  const loadSplashSound = async () => {
    try {
      await splashSound.loadAsync(require('./assets/logo-sound.wav'));
      await splashSound.playAsync();
      await splashSound.setVolumeAsync(0.3);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (companySplash === true) {
      loadSplashSound();
    }

    return () => {
      splashSound.unloadAsync();
    };
  }, [mainMenu]);

  //MAIN MENU SCREEN SOUND FILES
  let mainMenuSound = new Audio.Sound();

  const loadMainMenuSound = async () => {
    try {
      await mainMenuSound.loadAsync(require('./assets/main-menu.mp3'));
      await mainMenuSound.setIsLoopingAsync(true);
      await mainMenuSound.playAsync();
      await mainMenuSound.setVolumeAsync(0.5);
    } catch (err) {
      console.log(err);
    }
  };

  const stopMainMenuSound = async () => {
    try {
      await mainMenuSound.loadAsync(require('./assets/main-menu.mp3'));
      await mainMenuSound.setVolumeAsync(0);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!companySplash) {
      loadMainMenuSound();
    }
  }, [companySplash]);

  useEffect(() => {
    if (showAdvertisementModal) {
      stopMainMenuSound();
    }
  }, [showAdvertisementModal]);

  //BUTTON INTERACTION  SOUND FILES
  let buttonSound = new Audio.Sound();

  const loadButtonSound = async () => {
    try {
      await buttonSound.loadAsync(require('./assets/interface1.wav'));
      await buttonSound.playAsync();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!companySplash) {
      loadButtonSound();
      return () => {
        buttonSound.unloadAsync();
      };
    }
  }, [loginScreen, showProfileModal, highScoresModal, redeemRewards]);

  //FUNCTIONS
  const handleStartGame = () => {
    toggleMainMenu(false);
    toggleAdvertisementModal(true);
    setTimeout(async () => {
      toggleMainMenu(true);
      toggleAdvertisementModal(false);
      toggleGameMode(true);
    }, 4000);
  };

  const handleLoginUser = () => {
    if (userNameLoginField.length < 3) {
      setUserError(3);
      return;
    }
    Axios.get(`http://localhost:8080/api/score/${userNameLoginField}`)
      .then((response) => {
        setUserName(response.data.username);
        setAge(response.data.age);
        setGender(response.data.gender);
        setUserRewards(response.data.reward);
        setUserHighScore(response.data.score);
        setLoggedIn(true);
        toggleMainMenu(true);
        toggleLoginScreen(false);

        const tokenObject = {
          reward_one: response.data.reward_one,
          reward_two: response.data.reward_two,
          reward_three: response.data.reward_three,
          reward_four: response.data.reward_four,
          reward_five: response.data.reward_five,
          reward_six: response.data.reward_six,
        };

        setRewardTokens(tokenObject);
      })
      .catch((err) => {
        setUserError(1);
        setUserNameLoginField('');
      });
  };

  const handleLogOut = () => {
    //Logic
    setLoggedIn(false);
    setUserName('');
    setGender(null);
    setAge(null);
    setRewardTokens({});
    setUserHighScore(0);
    setUserRewards(0);
    setUserNameLoginField('');
    setUserError(null);
  };

  const handleRedeemPoints = (token, points) => {
    if (points > userRewards) {
      setUserError(4);
      return;
    }
    const rewardsObj = {
      reward: userRewards - points,
      [token]: 1,
    };
    Axios.put(`http://localhost:8080/api/score/${userName}`, rewardsObj)
      .then((response) => {
        setUserRewards(response.data.reward);
        setRewardTokens({
          reward_one: response.data.reward_one,
          reward_two: response.data.reward_two,
          reward_three: response.data.reward_three,
          reward_four: response.data.reward_four,
          reward_five: response.data.reward_five,
          reward_six: response.data.reward_six,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmitPlayer = (playerInfo) => {
    Axios.post('http://localhost:8080/api/score/', playerInfo)
      .then((response) => {
        setUserName(response.data.username);
        setAge(response.data.age);
        setGender(response.data.gender);
        setUserRewards(0);
        setUserHighScore(0);
        setLoggedIn(true);
        toggleProfileModal(false);
        toggleMainMenu(true);
      })
      .catch(() => {
        setUserError(2);
        setUserNameRegisterField('');
      });
  };

  const handleFetchHighScores = () => {
    Axios.get('http://localhost:8080/api/score')
      .then((response) => {
        setHighScores(response.data);
      })
      .then(() => {
        toggleHighScoresModal(true);
        toggleMainMenu(false);
      })
      .catch(() => {
        console.log('Failed to fetch high scores from server.');
      });
  };

  const renderMainMenu = (
    <>
      <Text>Snake Game</Text>
      {!gameMode ? (
        <>
          {loggedIn ? (
            <NavBar
              userName={userName}
              userHighScore={userHighScore}
              userRewards={userRewards}
            />
          ) : (
            <NavBarSpacer />
          )}
          <MainLogoContainer>{mainLogo}</MainLogoContainer>
          <MainMenuButtonContainer>
            {loggedIn ? (
              <>
                <ButtonContainer>
                  <GameButton
                    onPress={() => {
                      handleStartGame();
                    }}>
                    <GameButtonText style={{fontFamily: 'Cartoon'}}>
                      Start game
                    </GameButtonText>
                  </GameButton>
                </ButtonContainer>
                <ButtonContainer>
                  <GameButton
                    onPress={() => {
                      handleLogOut();
                    }}>
                    <GameButtonText style={{fontFamily: 'Cartoon'}}>
                      Log out
                    </GameButtonText>
                  </GameButton>
                </ButtonContainer>
              </>
            ) : (
              <>
                <ButtonContainer>
                  <GameButton
                    onPress={() => {
                      toggleMainMenu(false);
                      toggleProfileModal(true);
                    }}>
                    <GameButtonText style={{fontFamily: 'Cartoon'}}>
                      Register a new user
                    </GameButtonText>
                  </GameButton>
                </ButtonContainer>
                <ButtonContainer>
                  <GameButton
                    onPress={() => {
                      toggleLoginScreen(true);
                    }}>
                    <GameButtonText style={{fontFamily: 'Cartoon'}}>
                      Login
                    </GameButtonText>
                  </GameButton>
                </ButtonContainer>
              </>
            )}
            <ButtonContainer>
              <GameButton onPress={handleFetchHighScores}>
                <GameButtonText style={{fontFamily: 'Cartoon'}}>
                  High scores
                </GameButtonText>
              </GameButton>
            </ButtonContainer>
            {loggedIn && (
              <ButtonContainer>
                <GameButton
                  onPress={() => {
                    toggleMainMenu(false);
                    toggleRedeemRewards(true);
                  }}>
                  <GameButtonText style={{fontFamily: 'Cartoon'}}>
                    Rewards
                  </GameButtonText>
                </GameButton>
              </ButtonContainer>
            )}
          </MainMenuButtonContainer>
        </>
      ) : (
        //GAME BOARD LOGIC ----- //
        <Main
          toggleGameMode={toggleGameMode}
          toggleProfileModal={toggleProfileModal}
          userRewards={userRewards}
          setUserRewards={setUserRewards}
          userHighScore={userHighScore}
          setUserHighScore={setUserHighScore}
          userName={userName}
          age={age}
          gender={gender}
        />
      )}
    </>
  );

  if (!fontsLoaded) {
    return null;
  }

  if (companySplash) {
    return (
      <SplashImageBackground>
        <SplashImage
          resizeMode="contain"
          source={require('./assets/Logo.gif')}
        />
      </SplashImageBackground>
    );
  } else {
    return (
      <AppContainer>
        {loginScreen && (
          <>
            <SnakeBackground blur={loginScreen} resizeMode="contain" />
            <Login
              handleLoginUser={handleLoginUser}
              toggleLoginScreen={toggleLoginScreen}
              userNameLoginField={userNameLoginField}
              setUserNameLoginField={setUserNameLoginField}
              userError={userError}
              setUserError={setUserError}
            />
          </>
        )}
        {mainMenu && renderMainMenu}
        {highScoresModal && (
          <HighScores
            highScores={highScores}
            toggleHighScoresModal={toggleHighScoresModal}
            toggleMainMenu={toggleMainMenu}
          />
        )}
        {redeemRewards && (
          <RedeemRewards
            toggleMainMenu={toggleMainMenu}
            toggleRedeemRewards={toggleRedeemRewards}
            userRewards={userRewards}
            setUserRewards={setUserRewards}
            rewardTokens={rewardTokens}
            handleRedeemPoints={handleRedeemPoints}
          />
        )}
        {showProfileModal && (
          <Register
            handleSubmitPlayer={handleSubmitPlayer}
            userNameRegisterField={userNameRegisterField}
            setUserNameRegisterField={setUserNameRegisterField}
            userGenderField={userGenderField}
            setUserGenderField={setUserGenderField}
            userAgeField={userAgeField}
            setUserAgeField={setUserAgeField}
            userError={userError}
            setUserError={setUserError}
            toggleProfileModal={toggleProfileModal}
            toggleMainMenu={toggleMainMenu}
            showProfileModal={showProfileModal}
          />
        )}
        {showAdvertisementModal && (
          <AdvertisementModal age={age} gender={gender} />
        )}
      </AppContainer>
    );
  }
}
