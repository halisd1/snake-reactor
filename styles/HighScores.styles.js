import styled from 'styled-components/native';

export const MainContainer = styled.View`
height: 100%;
width: 100%;
`;

export const HighScoreView = styled.View`
height: 700px;
display: flex;
align-items: center;
`;

export const ScoreContainer = styled.View`
display: flex;
justify-content: space-around;
flex-direction: row;
`;


export const HighScoreViewHeading = styled.Text`
font-size: 32px;
margin: 12px;
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

export const HighScoreViewRowLegendName = styled.Text`
font-size: 24px;
flex-basis: 37%;
text-align: right;
`;

export const HighScoreViewRowLegend = styled.Text`
font-size: 24px;
flex-basis: 20%;
text-align: center;
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
