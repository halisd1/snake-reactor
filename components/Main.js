import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Button} from 'react-native';
import AxisPad from 'react-native-axis-pad';
import useInterval from '../snake-logic/useInterval';
import {Audio} from 'expo-av';

import RewardsModal from './modals/RewardsModal';
import ResultsModal from './modals/ResultsModal';
import Gameboard from './Gameboard';
import NavBar from './NavBar';

import {
  snakeHead,
  snakeMap,
  snakeTail,
  LinkedListNode,
} from '../snake-logic/snake';

import {MainContainer, GamePadContainer} from '../styles/Main.styles';

import Axios from 'axios';

export default function Main({
  age,
  gender,
  toggleGameMode,
  userRewards,
  setUserRewards,
  userHighScore,
  setUserHighScore,
  userName,
}) {
  //GAME BOARD INFO
  const [displayGameBoard, setDisplayGameBoard] = useState(false);
  const [gameOn, setGameOn] = useState(false);
  const [direction, updateDirection] = useState('right');
  const [fruitLocation, updateFruitLocation] = useState([]);

  //REWARDS
  const [obtainedReward, setObtainedReward] = useState(0);
  const [purchasedReward, setPurchasedReward] = useState(0);
  const [newHighScoreBool, toggleSetNewHighScore] = useState(false);

  //MENU
  const [rewardsModal, toggleRewardsModal] = useState(false);
  const [resultsModal, toggleResultsModal] = useState(false);

  //GAME STATS
  const [gameTime, setGameTime] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(99999999999999);
  const [timerSpeed, setTimerSpeed] = useState(99999999999999);
  const [score, setScore] = useState(0);
  const [turnsMade, setTurnsMade] = useState(0);
  const [demise, setDemise] = useState(0);

  //SNAKE BODY
  const [currentSnakeInfo, setSnakeInfo] = useState({
    currentSnakeMap: snakeMap,
    currentSnakeHead: snakeHead,
    currentSnakeTail: snakeTail,
  });

  const {
    currentSnakeMap,
    currentSnakeHead,
    currentSnakeTail,
  } = currentSnakeInfo;

  ///////////////
  //SOUND FILES//
  ///////////////

  //BUTTON INTERACTION  SOUND FILES
  let fruitSound = new Audio.Sound();

  const loadFruitSound = async () => {
    try {
      await fruitSound.loadAsync(require('../assets/fruit.wav'));
      await fruitSound.playAsync();
    } catch (err) {
      console.log(err);
    }
  };

  let movementSound = new Audio.Sound();

  const loadMovementSound = async () => {
    try {
      await movementSound.loadAsync(require('../assets/grass.mp3'));
      await movementSound.playAsync();
    } catch (err) {
      console.log(err);
    }
  };

  let deathSound = new Audio.Sound();

  const loadDeathSound = async () => {
    try {
      await deathSound.loadAsync(require('../assets/death.wav'));
      await deathSound.playAsync();
    } catch (err) {
      console.log(err);
    }
  };

  //   useEffect(() => {
  //     if(!companySplash){
  //       loadButtonSound();
  //       return () => {
  //         buttonSound.unloadAsync();
  //       }
  //     }
  //   }, [loginScreen, showProfileModal, highScoresModal, redeemRewards])

  ////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const previousDirection = usePrevious(direction);

  useEffect(() => {
    triggerStart();
  }, []);

  useInterval(() => {
    loadMovementSound();
    handleUpdateBoard();
  }, gameSpeed);

  useInterval(() => {
    setGameTime(gameTime + 1);
  }, timerSpeed);

  const triggerStart = () => {
    const snakeInfo = {
      currentSnakeMap: snakeMap,
      currentSnakeHead: snakeHead,
      currentSnakeTail: snakeTail,
    };
    setGameOn(true);
    setSnakeInfo(snakeInfo);
    updateDirection('right');
    setDisplayGameBoard(true);
    handleUpdateFruit(true);
    toggleSetNewHighScore(false);
    setScore(0);
    setDemise(0);
    setTurnsMade(0);
    setGameTime(0);
    setGameSpeed(400);
    setTimerSpeed(1000);
  };

  const handleUpdateDirection = async (x, y) => {
    if (x < -0.4 && y < 0.4 && y > -0.4 && direction !== 'right') {
      updateDirection('left');
    } else if (x > 0.4 && y < 0.4 && y > -0.4 && direction !== 'left') {
      updateDirection('right');
    } else if (y < -0.4 && x < 0.4 && x > -0.4 && direction !== 'down') {
      updateDirection('up');
    } else if (y > 0.4 && x < 0.4 && x > -0.4 && direction !== 'up') {
      updateDirection('down');
    }
  };

  const handleUpdateFruit = async (start = false) => {
    if (start) {
      updateFruitLocation([12, 15]);
      return;
    }
    let x = Math.floor(Math.random() * 25);
    let y = Math.floor(Math.random() * 20);

    while (currentSnakeMap[[x, y]]) {
      x = Math.floor(Math.random() * 25);
      y = Math.floor(Math.random() * 20);
    }

    updateFruitLocation([x, y]);
  };

  const calculateSnakeBodyPosition = (prev, current) => {
    if (
      (prev === 'right' && current === 'down') ||
      (prev === 'up' && current === 'left')
    ) {
      setTurnsMade(turnsMade + 1);
      return 'bottomleft';
    } else if (
      (prev === 'left' && current === 'down') ||
      (prev === 'up' && current === 'right')
    ) {
      setTurnsMade(turnsMade + 1);
      return 'bottomright';
    } else if (
      (prev === 'right' && current === 'up') ||
      (prev === 'down' && current === 'left')
    ) {
      setTurnsMade(turnsMade + 1);
      return 'topleft';
    } else if (
      (prev === 'left' && current === 'up') ||
      (prev === 'down' && current === 'right')
    ) {
      setTurnsMade(turnsMade + 1);
      return 'topright';
    } else if (
      prev === current &&
      (current === 'left' || current === 'right')
    ) {
      return 'horizontal';
    } else if (prev === current && (current === 'up' || current === 'down')) {
      return 'vertical';
    }
  };

  const handleShowModal = (condition, freeRewards = false) => {
    if (condition === 'rewards') {
      toggleRewardsModal(true);
    } else if (condition === 'results') {
      toggleRewardsModal(false);
      toggleResultsModal(true);
    } else if (condition === 'replay') {
      toggleResultsModal(false);
      triggerStart();
    } else if (condition === 'exit') {
      toggleResultsModal(false);
      toggleGameMode(false);
    }
  };

  const handleUpdateBoard = () => {
    let newAxis;
    if (direction === 'up') {
      newAxis = [currentSnakeHead.i - 1, currentSnakeHead.j];
    } else if (direction === 'down') {
      newAxis = [currentSnakeHead.i + 1, currentSnakeHead.j];
    } else if (direction === 'left') {
      newAxis = [currentSnakeHead.i, currentSnakeHead.j - 1];
    } else if (direction === 'right') {
      newAxis = [currentSnakeHead.i, currentSnakeHead.j + 1];
    }

    if (previousDirection === 'left'){;}

    const newSnakeMap = Object.assign({}, currentSnakeMap);
    let newSnakeTail;

    if (newAxis[0] === fruitLocation[0] && newAxis[1] === fruitLocation[1]) {
      //PLAY FRUIT SOUND
      loadFruitSound();

      //ASSIGN NEW SNAKE MAP AND UPDATE
      newSnakeMap[newAxis] = [
        calculateSnakeBodyPosition(previousDirection, direction),
        direction,
      ];
      newSnakeMap[[currentSnakeHead.i, currentSnakeHead.j]] = [
        calculateSnakeBodyPosition(previousDirection, direction),
        direction,
      ];
      newSnakeTail = currentSnakeTail;
      handleUpdateFruit();
      if (score % 3 === 0 && score !== 0) {
        if (gameSpeed >= 500) {
          setGameSpeed(gameSpeed - 100);
        } else {
          setGameSpeed(gameSpeed - 50);
        }
      }
      setScore(score + 1);
    } else {
      //ASSIGN NEW SNAKE MAP AND UPDATE
      newSnakeMap[newAxis] = [
        calculateSnakeBodyPosition(previousDirection, direction),
        direction,
      ];
      newSnakeMap[[currentSnakeHead.i, currentSnakeHead.j]] = [
        calculateSnakeBodyPosition(previousDirection, direction),
        direction,
      ];
      delete newSnakeMap[[currentSnakeTail.i, currentSnakeTail.j]];

      //ASSIGN NEW SNAKE TAIL AND UPDATE
      newSnakeTail = currentSnakeTail.prev;
      newSnakeTail.next = null;
    }

    //ASSIGN NEW SNAKE HEAD AND UPDATE
    const newSnakeHead = new LinkedListNode(newAxis[0], newAxis[1]);
    newSnakeHead.next = currentSnakeHead;
    currentSnakeHead.prev = newSnakeHead;

    if (handleCheckLosingCondition(newAxis)) {
      //PLAY DEATH SOUND
      loadDeathSound();
      // CHECK IF HIGH SCORE SHOW REWARDS IF NOT RANDOMIZE AND OFFER REWARDS 20%
      setGameSpeed(99999999999999);
      setTimerSpeed(99999999999999);
      if (score > userHighScore) {
        handleShowModal('rewards', true);
      } else {
        if (Math.random() < 0.25) {
          handleShowModal('rewards', true);
        } else {
          handleShowModal('rewards');
        }
      }
    }

    setSnakeInfo({
      currentSnakeMap: newSnakeMap,
      currentSnakeHead: newSnakeHead,
      currentSnakeTail: newSnakeTail,
    });
  };

  const handleCheckLosingCondition = (newAxis) => {
    const {currentSnakeMap} = currentSnakeInfo;
    if (
      newAxis[0] > 24 ||
      newAxis[1] > 19 ||
      newAxis[0] < 0 ||
      newAxis[1] < 0
    ) {
      setDemise('Walled');
      return true;
    }
    if (currentSnakeMap[newAxis]) {
      setDemise('Ate itself');
      return true;
    }
  };

  const handleSubmitScore = (timeInMenu, freeReward = 0, paidReward = 0) => {
    if (freeReward === 1) {
      setObtainedReward(1);
    }
    if (paidReward === 1) {
      setPurchasedReward(1);
    }
    const gameData = {
      username: userName,
      gametime: gameTime,
      age: age,
      gender: gender,
      user_rewards: userRewards + freeReward + paidReward,
      score: score,
      turns_made: turnsMade,
      demise: demise,
      high_score_bool: score > userHighScore,
      free_reward_bool: freeReward,
      purchased_reward_bool: paidReward,
      time_in_purchase_modal: timeInMenu,
    };

    //CHECK IF THE HIGH SCORE IS ACHIEVED OR OBTAINED A NEW REWARDS, IF SO, SAVE TO USER DATABASE
    if (score > userHighScore || freeReward || paidReward) {
      const playerUpdate = {
        username: userName,
        score: score,
        reward: freeReward + paidReward,
      };
      Axios.put('http://localhost:8080/api/score/', playerUpdate)
        .then((response) => {
          setUserHighScore(response.data.score);
          toggleSetNewHighScore(true);
          setUserRewards(response.data.reward);
        })
        .catch((err) => console.log('Server Error:' + err));
    }
    Axios.post('http://localhost:8080/api/gamelog/', gameData)
      .then(() => {}).catch(err => console.log('Server Error:' + err));
  };

  const renderGamePad = (
    <GamePadContainer>
      <AxisPad
        size={100}
        handlerSize={50}
        resetOnRelease={true}
        autoCenter={true}
        onValue={({x, y}) => {
          handleUpdateDirection(x, y);
        }}
      />
    </GamePadContainer>
  );

  const renderButtons = (
    <>
      <Button onPress={() => updateDirection('up')} title="Up" />
      <Button onPress={() => updateDirection('left')} title="Left" />
      <Button onPress={() => updateDirection('right')} title="Right" />
      <Button onPress={() => updateDirection('down')} title="Down" />
    </>
  );

  const renderBoard = (
    <MainContainer>
      <NavBar
        inGame={true}
        score={score}
        gameTime={gameTime}
        userName={userName}
      />
      {displayGameBoard && (
        <Gameboard
          currentSnakeInfo={currentSnakeInfo}
          fruitLocation={fruitLocation}
          direction={direction}
        />
      )}
      {renderGamePad}
      <Button
        onPress={() => {
          triggerStart();
        }}
        title="Reset Game"
      />
    </MainContainer>
  );

  return (
    <>
      {rewardsModal && (
        <RewardsModal
          handleShowModal={handleShowModal}
          userRewards={userRewards}
          setUserRewards={setUserRewards}
          obtainedReward={obtainedReward}
          setObtainedReward={setObtainedReward}
          purchasedReward={purchasedReward}
          setPurchasedReward={setPurchasedReward}
          freeBox={userHighScore < score}
          handleSubmitScore={handleSubmitScore}
        />
      )}
      {resultsModal && (
        <ResultsModal
          handleShowModal={handleShowModal}
          gameTime={gameTime}
          score={score}
          turnsMade={turnsMade}
          demise={demise}
          newHighScoreBool={newHighScoreBool}
          rewardsCollected={obtainedReward + purchasedReward}
          setUserRewards={setUserRewards}
          userHighScore={userHighScore}
          setUserHighScore={setUserHighScore}
        />
      )}
      {renderBoard}
    </>
  );
}
