import React from 'react';
import { useFonts } from 'expo-font';

import {
    RedeemView,
    RedeemViewHeading,
    RedeemViewUserPointsBarName,
    RedeemViewUserPointsBarPoints,
    RedeemViewUserPointsBar,
    RedeemViewUserPointsBarPic,
    RedeemViewUserPointsBarPicImageContainer,
    RedeemViewUserPointsBarPicImage,
    MainContainer,
    Icon,
    TokenCountDiv,
    TokenCountText,
} from '../styles/RedeemRewards.styles';

import {
    ResultsButtonsContainer,
    ResultsButtonContainerSingle,
    ResultsButton,
} from '../styles/Modals.styles';

const images = {
    reward_one: require('../assets/memes/medal-1.png'),
    reward_two: require('../assets/memes/medal-2.png'),
    reward_three: require('../assets/memes/medal-3.png'),
    reward_four: require('../assets/memes/medal-4.png'),
    reward_five: require('../assets/memes/medal-5.png'),
    reward_six: require('../assets/memes/medal-6.png'),
}

export default function RedeemRewards({ handleRedeemPoints, rewardTokens, toggleMainMenu, toggleRedeemRewards, userRewards }) {
    const [fontsLoaded] = useFonts({
        Cartoon: require('../assets/cartoon.ttf'),
    });

    if(!fontsLoaded){
        return null;
    };

    return (
        <MainContainer>
            {/* <SnakeBackground source={require('../assets/wallpaper.png')} resizeMode='contain' /> */}
            <RedeemView>
            <RedeemViewHeading style={{ fontFamily: 'Cartoon' }}>Redeem Rewards</RedeemViewHeading>
            <RedeemViewUserPointsBar>
                <RedeemViewUserPointsBarName>Available points:</RedeemViewUserPointsBarName>
                <RedeemViewUserPointsBarPoints>{userRewards} ×
                    <Icon source={require("../assets/rewards.png")}/>
                </RedeemViewUserPointsBarPoints>
            </RedeemViewUserPointsBar>   
            {/* <RedeemViewUserPointsBar>
                <RedeemViewUserPointsBarHeading>Press to exchange for points:</RedeemViewUserPointsBarHeading>
            </RedeemViewUserPointsBar>     */}
            <RedeemViewUserPointsBar>
                <RedeemViewUserPointsBarPic>
                    <RedeemViewUserPointsBarPicImageContainer
                        onPress={() => handleRedeemPoints('reward_one', 5)}>
                        <RedeemViewUserPointsBarPicImage 
                        source={images['reward_one']}
                        />
                        {rewardTokens.reward_one > 0 && <TokenCountDiv>
                            <TokenCountText>{rewardTokens.reward_one}</TokenCountText>
                        </TokenCountDiv>
                        }   
                    </RedeemViewUserPointsBarPicImageContainer>
                    <RedeemViewUserPointsBarPoints>5 ×
                    <Icon source={require("../assets/rewards.png")}/>
                    </RedeemViewUserPointsBarPoints>
                </RedeemViewUserPointsBarPic>
                <RedeemViewUserPointsBarPic>
                    <RedeemViewUserPointsBarPicImageContainer>
                        <RedeemViewUserPointsBarPicImage 
                        source={images['reward_two']}
                        onPress={() => handleRedeemPoints('reward_two', 4)}
                        />
                        {rewardTokens.reward_two > 0 && <TokenCountDiv>
                            <TokenCountText>{rewardTokens.reward_two}</TokenCountText>
                        </TokenCountDiv>
                        }   
                    </RedeemViewUserPointsBarPicImageContainer>
                    <RedeemViewUserPointsBarPoints>4 ×
                    <Icon source={require("../assets/rewards.png")}/>
                    </RedeemViewUserPointsBarPoints>
                </RedeemViewUserPointsBarPic>
            </RedeemViewUserPointsBar>  
            <RedeemViewUserPointsBar>
                <RedeemViewUserPointsBarPic>
                    <RedeemViewUserPointsBarPicImageContainer>
                        <RedeemViewUserPointsBarPicImage 
                        source={images['reward_three']}
                        onPress={() => handleRedeemPoints('reward_three', 3)}
                        />
                        {rewardTokens.reward_three > 0 && <TokenCountDiv>
                            <TokenCountText>{rewardTokens.reward_three}</TokenCountText>
                        </TokenCountDiv>
                        }   
                    </RedeemViewUserPointsBarPicImageContainer>
                    <RedeemViewUserPointsBarPoints>3 ×
                    <Icon source={require("../assets/rewards.png")}/>
                    </RedeemViewUserPointsBarPoints>
                </RedeemViewUserPointsBarPic>
                <RedeemViewUserPointsBarPic>
                    <RedeemViewUserPointsBarPicImageContainer>
                        <RedeemViewUserPointsBarPicImage 
                        source={images['reward_four']}
                        onPress={() => handleRedeemPoints('reward_four', 3)}
                        />
                        {rewardTokens.reward_four > 0 && <TokenCountDiv>
                            <TokenCountText>{rewardTokens.reward_four}</TokenCountText>
                        </TokenCountDiv>
                        }   
                    </RedeemViewUserPointsBarPicImageContainer>
                    <RedeemViewUserPointsBarPoints>3 ×
                    <Icon source={require("../assets/rewards.png")}/>
                    </RedeemViewUserPointsBarPoints>
                </RedeemViewUserPointsBarPic>
            </RedeemViewUserPointsBar>  
            <RedeemViewUserPointsBar>
                <RedeemViewUserPointsBarPic>
                    <RedeemViewUserPointsBarPicImageContainer
                    onPress={() => handleRedeemPoints('reward_five', 1)}>
                    <RedeemViewUserPointsBarPicImage 
                    source={images['reward_five']}
                    />
                        {rewardTokens.reward_five > 0 && <TokenCountDiv>
                            <TokenCountText>{rewardTokens.reward_five}</TokenCountText>
                        </TokenCountDiv>
                        }   
                    </RedeemViewUserPointsBarPicImageContainer>
                    <RedeemViewUserPointsBarPoints>1 ×
                    <Icon source={require("../assets/rewards.png")}/>
                    </RedeemViewUserPointsBarPoints>
                </RedeemViewUserPointsBarPic>
                <RedeemViewUserPointsBarPic>
                    <RedeemViewUserPointsBarPicImageContainer
                        onPress={() => handleRedeemPoints('reward_six', 1)}>
                        <RedeemViewUserPointsBarPicImage 
                        source={images['reward_six']}
                        />
                        {rewardTokens.reward_six > 0 && <TokenCountDiv>
                            <TokenCountText>{rewardTokens.reward_six}</TokenCountText>
                        </TokenCountDiv>
                        }   
                    </RedeemViewUserPointsBarPicImageContainer>
                    <RedeemViewUserPointsBarPoints>1 ×
                    <Icon source={require("../assets/rewards.png")}/>
                    </RedeemViewUserPointsBarPoints>
                </RedeemViewUserPointsBarPic>
            </RedeemViewUserPointsBar>  
            </RedeemView>
            <ResultsButtonsContainer>
                <ResultsButtonContainerSingle onPress={() => {}}>
                    <ResultsButton style={{ fontFamily: 'Cartoon' }}  onPress={() => { 
                        toggleRedeemRewards(false);
                        toggleMainMenu(true);
                        }}>Exit</ResultsButton>
                </ResultsButtonContainerSingle>
            </ResultsButtonsContainer>
        </MainContainer>
    )
}