import styled from 'styled-components/native';

export const NavBarContainer = styled.View`
height: 100px;
width: 90%;

display: flex;
flex-direction: row;
flex-wrap: nowrap;
align-items: center;
justify-content: space-between;
`; 

export const LeftContainer = styled.View`
flex-basis: 65%;
display: flex;
flex-direction: row;
flex-wrap: nowrap;
align-items: center;
`;

export const Icon = styled.Image`
height: 30px;
width: 30px;
margin: 5px;
`;


export const RightContainer = styled.View`
flex-basis: 35%;
display: flex;
flex-direction: row;
flex-wrap: nowrap;
align-items: center;
justify-content: space-evenly;
`;

export const ContainerText = styled.Text`
font-size: 16px;
`;