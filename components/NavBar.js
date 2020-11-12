import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, ImageBackground } from 'react-native';
import { useFonts } from 'expo-font';

import {
    NavBarContainer,
    LeftContainer,
    RightContainer,
    ContainerText,
    Icon,
} from '../styles/NavBar.styles';

export default function NavBar({ inGame, userName, userHighScore, userRewards, score, gameTime }) {
    const mainMenu = (
        <NavBarContainer>
            <LeftContainer>
                <Icon source={require("../assets/score.png")}/>
                <ContainerText>{userHighScore}</ContainerText>
                <Icon source={require("../assets/rewards.png")}/>
                <ContainerText>{userRewards}</ContainerText>
            </LeftContainer>
            <RightContainer>
                <Icon source={require("../assets/id-card.png")}/>
                <ContainerText>{userName}</ContainerText>
            </RightContainer>
        </NavBarContainer>
    )

    const gameMenu = (
        <NavBarContainer>
            <LeftContainer>
                <Icon source={require("../assets/time.png")}/>
                <ContainerText>{gameTime}</ContainerText>
                <Icon source={require("../assets/level.png")}/>
                <ContainerText>{score}</ContainerText>
            </LeftContainer>
            <RightContainer>
                <Icon source={require("../assets/id-card.png")}/>
                <ContainerText>{userName}</ContainerText>
            </RightContainer>
        </NavBarContainer>
    )

    return (
        <>
            {inGame ? gameMenu : mainMenu}
        </>
    )
}
