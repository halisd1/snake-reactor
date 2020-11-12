import styled from 'styled-components/native';

export const GameBoardContainer = styled.View`
width: 400px;
height: 500px;
margin: 5px 0 30px 0;
/* ${({source}) => source && `background-image: url(${source});`} */

display: flex;
flex-direction: row;
flex-wrap: wrap;
`;

export const GameTileContainer = styled.View`
height: 20px;
width: 20px;

border: 1px solid lightgrey;
`;

export const TileIcons = styled.Image`
height: 100%;
width: 100%;
`;

export const GrassBackground = styled.ImageBackground`
`;

