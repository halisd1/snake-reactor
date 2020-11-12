import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { useFonts } from 'expo-font';

import {
    ScoreContainer,
    HighScoreView,
    HighScoreViewHeading,
    HighScoreViewRowLegend,
    HighScoreViewRowLegendName,
    HighScoreViewSingle,
    ScoreContainerHeading,
    HighScoreViewSingleScore,
    HighScoreViewSingleIDX,
    HighScoreViewSingleDate,
    SnakeBackground,
    MainContainer,
    PaddingDiv,
} from '../styles/HighScores.styles'

import {
    ResultsButtonsContainer,
    ResultsButtonContainerSingle,
    ResultsButton,
} from '../styles/Modals.styles'

export default function HighScore({ highScores, toggleMainMenu, toggleHighScoresModal}) {
    const [fontsLoaded] = useFonts({
        Cartoon: require('../assets/cartoon.ttf'),
    });

    if(!fontsLoaded){
        return null;
    };

    const highScoresList = highScores.map((score,index) => {
        return (
            <ScoreContainer key={Math.random()}>
                <HighScoreViewSingleIDX>{index+1}</HighScoreViewSingleIDX>
                <HighScoreViewSingle>{score[1]}</HighScoreViewSingle>
                <HighScoreViewSingleScore>{score[2]}</HighScoreViewSingleScore>
                <HighScoreViewSingleDate>{score[3].split("T")[0].slice(5)}</HighScoreViewSingleDate>
            </ScoreContainer>
        )
    });

    return (
        <MainContainer>
            <SnakeBackground source={require('../assets/wallpaper.png')} resizeMode='contain' />
            <HighScoreView>
            <HighScoreViewHeading style={{ fontFamily: 'Cartoon' }}>High Scores</HighScoreViewHeading>
            <ScoreContainerHeading key='score_heading'>
                <HighScoreViewRowLegendName>Name</HighScoreViewRowLegendName>
                <HighScoreViewRowLegend>Score</HighScoreViewRowLegend>
                <HighScoreViewRowLegend>Date</HighScoreViewRowLegend>
            </ScoreContainerHeading>          
            {highScoresList}
            </HighScoreView>
            <ResultsButtonsContainer>
                <ResultsButtonContainerSingle onPress={() => {
                    toggleMainMenu(true);
                    toggleHighScoresModal(false);
                    }}>
                    <ResultsButton style={{ fontFamily: 'Cartoon' }}  onPress={() => {
                    toggleMainMenu(true);
                    toggleHighScoresModal(false);
                    }}>Exit</ResultsButton>
                </ResultsButtonContainerSingle>
            </ResultsButtonsContainer>
        </MainContainer>
    )
}