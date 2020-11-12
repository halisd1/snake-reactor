import styled from 'styled-components/native';

export const AppContainer = styled.View`
padding: 50px 0 0 0;
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
flex: 1;
align-items: center;
position: relative;
background-color: #f6f5f1;
`;

export const BlurDiv = styled.View`
position: absolute;
z-index: 10;
top: 0;
bottom: 0;
left: 0;
right: 0;
display: none;
${({blur}) => blur && 'opacity: 0.1; display: flex;'}
`;

export const LoginMessageModal = styled.View`
margin: 10px;
height: 30%;
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
`;

export const LoginContainer = styled.View`
margin: 15px 0;
width: 90%;
display: flex;
align-items: center;
`;

export const LoginContainerHeading = styled.Text`
margin: 15px;
font-size: 24px;
text-align: center;
`;

export const NavBarSpacer = styled.View`
height: 100px;
width: 90%;
`; 

export const MainContainer = styled.View`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
flex: 1;
align-items: center;
`;

export const MainLogoContainer = styled.View`
width: 400px;
height: 400px;
margin: 10px 0 50px 0;
/* ${({source}) => source && `background-image: url(${source});`} */

display: flex;
flex-direction: row;
flex-wrap: wrap;
`;

export const GamePadContainer = styled.View`
width: 100px;
height: 100px;
margin: 10px 0 20px 0;
display: flex;
align-items: center;
justify-content: center;
`;

export const BlueButton = styled.View`
background-image: url("../assets/Button1.png");
width: 100px;
height: 50px;
`;

export const SplashImageBackground = styled.View`
background-color: black;
width: 100%;
height: 100%;
`;

export const SplashImage = styled.Image`
width: 100%;
height: 100%;
`;

export const GameButton = styled.TouchableOpacity`
`;

export const GameButtonText = styled.Text`
font-size: 20px;
text-align: center;
`;

export const ButtonContainer = styled.View`
border-radius: 12px;
margin: 3px;
width: 300px;
height: 40px;
`;

export const MainMenuButtonContainer = styled.View`
margin-top: 40px;
`;

export const ErrorDiv = styled.View`
height: 30px;
display: flex;
align-items: center;
justify-content: center;
`;

export const UserNotFoundError = styled.Text`
margin: 5px;
font-size: 14px;
color: red;
`;

