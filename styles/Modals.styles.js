import styled from 'styled-components/native';

export const MainContainer = styled.View`
height: 100%;
width: 100%;
position: absolute;
z-index: 10;
`;

export const AdvertisementContainer = styled.View`
height: 90%;
width: 90%;
margin-top: 32px;
border-radius: 24px;
background-color: white;

position: absolute;
left: 5%;
top: 35px;

display: flex;
flex-direction: column;
align-items: center;
`;

export const AdvertisementImage = styled.Image`
margin: 15px;
height: 85%;
width: 90%;
`;

export const RewardsImage = styled.Image`
margin: 20px;
height: 40%;
width: 60%;
`;

export const RewardsText = styled.Text`
margin: 10px;
font-size: 22px;
width: 70%;
text-align: center;
`;

export const RewardsMessage = styled.Text`
margin: 10px;
font-size: 20px;
width: 70%;
text-align: center;
position: absolute;
`;

export const RewardsMessageModal = styled.View`
margin: 10px;
height: 10%;
width: 70%;
text-align: center;
position: absolute;
background-color: #f6f5f1;
border-radius: 24px;
z-index: 15;
left: 55px;
top: 355px;
display: flex;
align-items: center;
justify-content: center;
`;

export const RewardsMessageModalText = styled.Text`
width: 80%;
font-size: 20px;
text-align: center;
`;

export const RewardsButtonContainer = styled.View`
width: 60%;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

export const RewardsButton = styled.View`
font-size: 22px;
border-radius: 12px;
`;

export const ModalContainer = styled.View`
height: 50%;
width: 90%;
border-radius: 24px;
background-color: #f6f5f1;

${({blur}) => blur && 'opacity: 0.2;'}

position: absolute;
left: 5%;
top: 215px;

display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

export const ModalBackground = styled.View`
height: 200%;
width: 100%;
background-color: black;
opacity: 0.5;
`;

export const ModalBackgroundBlur = styled.View`
height: 200%;
width: 100%;
`;

export const LoadingCircle = styled.Image`
margin: 10px;
height: 50px;
width: 50px;
`;

export const ResultsContainer = styled.View`
height: 90%;
width: 80%;
display: flex;
align-items: center;
`;

export const ResultsTitle = styled.Text`
font-size: 28px;
text-align: center;
margin: 10px;
`;

export const ResultsLine = styled.View`
margin: 8px;
display: flex;
flex-direction: row;
flex-wrap: nowrap;
position: relative;
`;

export const ResultsSecondaryTitle = styled.Text`
font-size: 18px;
flex-basis: 60%;
`;

export const ResultsSecondaryNumber = styled.Text`
font-size: 18px;
flex-basis: 40%;
text-align: center;
`;

export const ResultsButtonsContainer = styled.View`
margin-top: 24px;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
`;

export const RewardsButtonsContainer = styled.View`
margin-top: 24px;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
`;

export const ResultsButtonContainerSingle = styled.TouchableHighlight`
width: 120px;
height: 50px;
margin: 5px;
border: 1px solid black;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
border-radius: 12px;
`;

export const ResultsButton = styled.Text`
font-size: 18px;
border-radius: 12px;
`;

export const Icon = styled.Image`
height: 50px;
width: 50px;
margin: 5px;
`;


export const NewScoreIcon = styled.Image`
height: 30px;
width: 30px;
position: absolute;
right: 8px;
top: -5px;

`;
