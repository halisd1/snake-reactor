import React, { useState, useEffect } from 'react';
import { Image, View, Text, Button, StyleSheet } from 'react-native';

import {
    AdvertisementContainer,
    AdvertisementImage,
    MainContainer,
    ModalBackground,
    LoadingCircle,
} from '../../styles/Modals.styles'

const advertisements = {
    male: require('../../assets/male_millenial.jpg'),
    female: require('../../assets/female_millenial.jpg'),
}

export default function AdvertisementModal({ age, gender }){  
    const url = advertisements[gender];
    return (
        <MainContainer>
            <ModalBackground onPress={() => {}} />
            <AdvertisementContainer>
                <AdvertisementImage source={url} />
                    <LoadingCircle source={require('../../assets/loader.gif')} />
                </AdvertisementContainer>
        </MainContainer>
    )
}