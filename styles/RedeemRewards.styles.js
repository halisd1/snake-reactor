import styled from 'styled-components/native';

export const MainContainer = styled.View`
height: 100%;
width: 100%;
`;

export const RedeemView = styled.View`
margin: 16px;
display: flex;
align-items: center;
`;

export const RedeemViewHeading = styled.Text`
font-size: 32px;
margin: 24px;
text-align: center;
`;

export const RedeemViewUserPointsBar = styled.View`
width: 100%;
display: flex;
flex-direction: row;
flex-wrap: wrap;
align-items: center;
justify-content: space-evenly;
margin: 5px;
`;

export const RedeemViewUserPointsBarName = styled.Text`
font-size: 24px;
flex-basis: 65%;
text-align: center;
`;

export const RedeemViewUserPointsBarPic = styled.View`
width: 120px;
height: 120px;
margin: 18px;
`;

export const RedeemViewUserPointsBarPicImageContainer = styled.TouchableOpacity`
height: 100%;
width: 100%;
position: relative;
border-radius: 12px;
`;

export const RedeemViewUserPointsBarPicImage = styled.Image`
height: 100%;
width: 100%;
border-radius: 12px;
`;

export const TokenCountDiv = styled.View`
position: absolute;
bottom: 0;
left: 0;
height: 40px;
width: 30px;
background-color: lightgrey;
display: flex;
justify-content: flex-end;
border-top-right-radius: 12px;
`;

export const TokenCountText = styled.Text`
font-size: 24px;
padding: 5px;
color: black;
`;

export const RedeemViewUserPointsBarPicAmount = styled.Text`
opacity: 0;
height: 100%;
width: 100%;
border-radius: 12px;
`;

export const RedeemViewUserPointsBarHeading = styled.Text`
font-size: 24px;
flex-basis: 100%;
text-align: center;
`

export const RedeemViewUserPointsBarPoints = styled.Text`
font-size: 24px;
flex-basis: 40%;
text-align: center;
`;

export const HighScoreViewSingleIDX = styled.Text`
font-size: 18px;
margin: 6px;
flex-basis: 10%;
text-align: center;
`;

export const HighScoreViewSingle = styled.Text`
font-size: 18px;
margin: 6px;
flex-basis: 30%;
text-align: center;
`;


export const HighScoreViewSingleDate = styled.Text`
font-size: 18px;
margin: 6px;
flex-basis: 15%;
`;


export const HighScoreViewSingleScore = styled.Text`
font-size: 18px;
margin: 6px;
padding-right: 35px;
flex-basis: 35%;
text-align: center;
`;

export const ScoreContainerHeading = styled.View`
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-between;
margin: 20px;
`;

export const SnakeBackground = styled.ImageBackground`
opacity: 0.15;
position: absolute;
${({ blur }) => blur && 'z-index: 5; background-color: black; opacity: 0.75;'}
top: 0;
left: 0;
right: 0;
bottom: 0;
`;

export const PaddingDiv = styled.View`
height: 150px;
width: 20px;
`;

export const Icon = styled.Image`
height: 25px;
width: 25px;

`;
