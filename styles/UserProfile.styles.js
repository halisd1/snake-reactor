import styled from 'styled-components/native';

export const UserProfileContainer = styled.View`
height: 90%;
width: 90%;
margin-top: 10%;
margin-bottom: 10%;
margin-left: 2.5%;
margin-right: 2.5%;
border-radius: 12px;

position: relative;
z-index: 10;

display: flex;
flex-direction: column;
align-items: center;
`;

export const HeadingContainer = styled.View`
margin: 20px;
width: 80%;
display: flex;
align-items: center;
`;

export const Heading = styled.Text`
font-size: 28px;
text-align: center;
`;

export const SecondaryHeadingContainer = styled.View`
margin: 15px;
width: 80%;
display: flex;
align-items: center;
`;

export const SecondaryHeading = styled.Text`
font-size: 22px;
`;

export const UsernameInput = styled.TextInput`
width: 80%;
height: 50px;
font-size: 16px;
text-align: center;
border-radius: 12px;
border: 1px solid grey;
`;

export const ButtonsContainer = styled.View`
margin: 15px;
display:flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

export const SingleButton = styled.TouchableOpacity`
flex-basis: 30%;
height: 50px;
margin: 5px;
padding: 5px;
border: 1px solid black;
border-radius: 12px;
background-color: #bbbfca;

display:flex;
justify-content: center;
align-items: center;
`;

export const ButtonText = styled.Text`
font-size: 12px;
`;

export const SubmitButton = styled.TouchableOpacity`
height: 50px;
margin: 15px 0 5px 0;
width: 80%;
padding: 5px;
border: 1px solid black;
border-radius: 12px;

display: flex;
align-items: center;
justify-content: center;
`;