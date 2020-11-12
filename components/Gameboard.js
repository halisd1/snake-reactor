import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Image, ImageBackground, Text, View } from 'react-native';

import {
    Container,
    GameBoardContainer,
    GameTileContainer,
    GrassBackground,
    TileIcons,
} from '../styles/Gameboard.styles.js';

const ImageObj = {
    horizontal: require('../assets/horizontal.png'),
    vertical: require('../assets/vertical.png'),
    bottomright: require('../assets/bottomright.png'),
    bottomleft: require('../assets/bottomleft.png'),
    topleft: require('../assets/topleft.png'),
    topright: require('../assets/topright.png'),
}

export default function Gameboard({ currentSnakeInfo, fruitLocation, direction }){
    let gameTiles = (new Array(25).fill(1)).map(() => new Array(20).fill(1));
    const { currentSnakeMap, currentSnakeHead, currentSnakeTail } = currentSnakeInfo;
    // const grassImg = require("../assets/grass.png");

    for(let i=0; i<gameTiles.length; i++){
        for(let j=0; j<gameTiles[i].length; j++){
            const fruitBoolean = (i === fruitLocation[0] && j === fruitLocation[1]);
            const headBoolean = (i === currentSnakeHead.i && j === currentSnakeHead.j);
            const tailBoolean = (i === currentSnakeTail.i && j === currentSnakeTail.j);
            const grassImg = require("../assets/grass.png");
            let img, renderIcon;

            if (currentSnakeMap[[i,j]] &&
                (currentSnakeHead.i !== i || currentSnakeHead.j !== j) &&
                (currentSnakeTail.i !== i || currentSnakeTail.j !== j)) {
                img = ImageObj[currentSnakeMap[[i,j]][0]];
                renderIcon = (
                    <TileIcons 
                    resizeMode='contain'
                    source={img} />
                )
            } else if (fruitBoolean || headBoolean || tailBoolean) {
                if (fruitBoolean) img=require("../assets/apple.png");
                if (headBoolean && direction === 'left') img=require("../assets/head_left.png");
                if (headBoolean && direction === 'down') img=require("../assets/head_down.png");
                if (headBoolean && direction === 'up') img=require("../assets/head_up.png");
                if (headBoolean && direction === 'right') img=require("../assets/head_right.png");
                if (tailBoolean && currentSnakeMap[[i,j]][1] === 'left') img=require("../assets/tail_right.png");
                if (tailBoolean && currentSnakeMap[[i,j]][1] === 'down') img=require("../assets/tail_up.png");
                if (tailBoolean && currentSnakeMap[[i,j]][1] === 'up') img=require("../assets/tail_down.png");
                if (tailBoolean && currentSnakeMap[[i,j]][1] === 'right') img=require("../assets/tail_left.png");
                renderIcon = (
                    <TileIcons 
                    resizeMode='contain'
                    source={img} />
                )
            } else {
                // renderIcon = (
                //     <TileIcons 
                //     resizeMode='contain'
                //     source={grassImg} />
                // )
            }
            gameTiles[i][j] = (
            <GrassBackground source={grassImg} key={[i,j]}>
                <GameTileContainer>{renderIcon}</GameTileContainer>
            </GrassBackground>)
        }
    }

    return (
        <GameBoardContainer>
            {gameTiles}
        </GameBoardContainer>
    );
}