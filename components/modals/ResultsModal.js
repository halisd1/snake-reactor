import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useFonts } from 'expo-font';
import { Audio } from 'expo-av';

import {
    MainContainer,
    ModalBackground,
    ModalContainer,
    ResultsContainer,
    ResultsTitle,
    ResultsLine,
    ResultsSecondaryTitle,
    ResultsSecondaryNumber,
    ResultsButtonsContainer,
    ResultsButtonContainerSingle,
    ResultsButton,
    NewScoreIcon,
} from '../../styles/Modals.styles'

export default function ResultsModal({ 
    handleShowModal, gameTime, score, turnsMade, demise, rewardsCollected, setUserRewards, userHighScore, newHighScoreBool, setUserHighScore
}){  
    const [fontsLoaded] = useFonts({
        Cartoon: require('../../assets/cartoon.ttf'),
    });

    /////////////////////////////
    //SPLASH SCREEN SOUND FILES//
    /////////////////////////////
    let okButtonSound = new Audio.Sound();

    const loadOkSound = async () => {
        try {
        await okButtonSound.loadAsync(require('../../assets/ok-button.wav'));
        await okButtonSound.playAsync();
        } catch (err) {
        console.log(err);
        }
    }

    if(!fontsLoaded){
        return null;
    };

    return (
        <MainContainer>
            <ModalBackground onPress={() => {}} />
            <ModalContainer>
                <ResultsContainer>
                    <ResultsTitle style={{ fontFamily: 'Cartoon' }}>Game results</ResultsTitle>
                    <ResultsLine>
                        <ResultsSecondaryTitle style={{ fontFamily: 'Cartoon' }}>
                            Time elapsed: 
                        </ResultsSecondaryTitle>
                        <ResultsSecondaryNumber style={{ fontFamily: 'Cartoon' }}>
                            {gameTime}
                        </ResultsSecondaryNumber>
                        </ResultsLine>
                        <ResultsLine>
                        <ResultsSecondaryTitle style={{ fontFamily: 'Cartoon' }}>
                            Score:
                        </ResultsSecondaryTitle>
                        <ResultsSecondaryNumber style={{ fontFamily: 'Cartoon' }}>
                            {score} 
                        </ResultsSecondaryNumber>
                        {newHighScoreBool && <NewScoreIcon source={require('../../assets/medal2.png')}/>}
                        </ResultsLine>
                        <ResultsLine>
                        <ResultsSecondaryTitle style={{ fontFamily: 'Cartoon' }}>
                            Rewards collected:
                        </ResultsSecondaryTitle>
                        <ResultsSecondaryNumber style={{ fontFamily: 'Cartoon' }}>
                            {rewardsCollected}
                        </ResultsSecondaryNumber>
                        </ResultsLine>
                        <ResultsLine>
                        <ResultsSecondaryTitle style={{ fontFamily: 'Cartoon' }}>
                            Turns: 
                        </ResultsSecondaryTitle>
                        <ResultsSecondaryNumber style={{ fontFamily: 'Cartoon' }}>
                            {turnsMade}
                        </ResultsSecondaryNumber>
                        </ResultsLine>
                        <ResultsLine>
                        <ResultsSecondaryTitle style={{ fontFamily: 'Cartoon' }}>
                            Demise: 
                        </ResultsSecondaryTitle>
                        <ResultsSecondaryNumber style={{ fontFamily: 'Cartoon' }}>
                            {demise}
                        </ResultsSecondaryNumber>
                        </ResultsLine>
                        <ResultsButtonsContainer>
                            <ResultsButtonContainerSingle onPress={() => handleShowModal('replay')} >
                                <ResultsButton style={{ fontFamily: 'Cartoon' }} onPress={() => {
                                    loadOkSound();
                                    handleShowModal('replay');
                                    }} >Replay</ResultsButton>
                            </ResultsButtonContainerSingle>
                            <ResultsButtonContainerSingle onPress={() => handleShowModal('exit')} >
                                <ResultsButton style={{ fontFamily: 'Cartoon' }} onPress={() => {
                                    loadOkSound();
                                    handleShowModal('exit');
                                    }} >Main Menu</ResultsButton>
                            </ResultsButtonContainerSingle>
                        </ResultsButtonsContainer>
                </ResultsContainer>
                </ModalContainer>
        </MainContainer>
    )
}