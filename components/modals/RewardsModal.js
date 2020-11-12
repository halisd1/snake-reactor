import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import useInterval from '../../snake-logic/useInterval';
import { useFonts } from 'expo-font';
import { Audio } from 'expo-av';

import {
    MainContainer,
    ModalBackground,
    ModalContainer,
    ResultsButtonsContainer,
    RewardsImage,
    RewardsText,
    RewardsButton,
    RewardsButtonsContainer,
    ResultsButtonContainerSingle,
    ResultsButton,
    Icon,
    RewardsMessageModal,
    RewardsMessageModalText,
    ModalBackgroundBlur,
} from '../../styles/Modals.styles'

export default function RewardsModal({ 
    handleSubmitScore, handleShowModal, userRewards, setUserRewards, freeBox, obtainedReward, setObtainedReward, setPurchasedReward
}){  
    const [fontsLoaded] = useFonts({
        Cartoon: require('../../assets/cartoon.ttf'),
        CartoonSmall: require('../../assets/cartoon-small.ttf'),
    });
    const [rewardMessage, setRewardMessage] = useState(false);
    const [freeBoxModal, SetRenderFreeBoxModal] = useState(freeBox);
    const [timerInPurchaseBox, setTimerInPurchaseBox] = useState(0);
    const [timerCount, setTimerCount] = useState(99999999999999);
    const [freeReward, setFreeReward] = useState(0);

    useInterval(() => setTimerInPurchaseBox(timerInPurchaseBox + 1), timerCount);

    useEffect(() => {
        if (!freeBox) {
            setTimerCount(100);
        }
    }, [])

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
    /////////////////////////////
    /////////////////////////////

    const handlePurchaseReward = () => {
        loadOkSound();
        setPurchasedReward(1);
        setRewardMessage(2);
        setTimerCount(99999999999999);
        handleSubmitScore(timerInPurchaseBox/10, freeReward, 1);
        setTimeout(() => {
            setRewardMessage(false);
            handleShowModal('results');
        }, 3000);
    }

    const handleFreeReward = () => {
        loadOkSound();
        setRewardMessage(1);
        setFreeReward(1);
        setTimeout(() => {
            setRewardMessage(false);
            SetRenderFreeBoxModal(false);
            setTimerCount(100);
        }, 3000)
    }

    const renderPopUp = (msg) => {
        return (
            <>
                <RewardsMessageModal>
                    <RewardsMessageModalText style={{ fontFamily: 'Cartoon' }}>
                        {msg}
                    </RewardsMessageModalText>
                </RewardsMessageModal>
            </>
        )
    }

    if(!fontsLoaded){
        return null;
    }

    return (
        <MainContainer>
            <ModalBackground onPress={() => {}} />
            {rewardMessage === 1 && renderPopUp("You've obtained a free rewards box!")}
            {rewardMessage === 2 && renderPopUp("You've purchased a rewards box!")}
            <ModalContainer blur={rewardMessage !== false}>
                <RewardsImage source={require('../../assets/gift.png')} resizeMode='contain' />
                {freeBoxModal ? 
                (<>
                    <RewardsText style={{ fontFamily: 'Cartoon' }} >New high score!</RewardsText>
                    <RewardsText style={{ fontFamily: 'CartoonSmall' }} >Here is a free reward box!</RewardsText>
                    <ResultsButtonContainerSingle onPress={handleFreeReward}>
                            <Icon source={require("../../assets/checkmark.png")} /> 
                        </ResultsButtonContainerSingle>
                    </>) :
                (<>
                    <RewardsText style={{ fontFamily: 'CartoonSmall' }}>Would you like to buy a reward box for $0.99?</RewardsText>
                    <RewardsButtonsContainer>
                        <ResultsButtonContainerSingle onPress={handlePurchaseReward}>
                            <Icon source={require("../../assets/checkmark.png")} /> 
                        </ResultsButtonContainerSingle>
                        <ResultsButtonContainerSingle onPress={() => {
                            loadOkSound();
                            handleShowModal('results');
                            handleSubmitScore(timerInPurchaseBox/10);
                            }}>
                            <Icon source={require("../../assets/cross.png")} /> 
                        </ResultsButtonContainerSingle>
                    </RewardsButtonsContainer>
                    </>)                
                }
                </ModalContainer>
        </MainContainer>
    )
}