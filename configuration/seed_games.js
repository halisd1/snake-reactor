const { default: Axios } = require("axios");
var faker = require('faker');
const random = require('random');
const normal = random.normal();

(function seedPlayers(){
    const promiseArray = [];
    const arr = new Array(2000).fill(1);

    arr.forEach(() => {
        const renderGender = () => {
            if(Math.random()<0.94){
                if(Math.random()<0.4){
                    return "male"
                } else {
                    return "female"
                }
            } else {
                return "neutral"
            }
        }

        const renderAge= () => {
            if(Math.random()<0.74){
                if(Math.random()<0.4){
                    return 1;
                } else {
                    return 2;
                }
            } else {
                if(Math.random()<0.7){
                    return 3;
                } else {
                    return 4;
                }
            }
        }

        const gameTime = Math.ceil((normal()+4)*10)+60;

        const gameScore =  Math.ceil((normal()+4)*gameTime*0.15);

        const generateTurnsMade = (gametime,score) => {
            return Math.ceil((normal()+3)*(gametime));
        }

        const generateDemise = (score) => {
            if(Math.ceil((normal()+3)*score)>350){
                return "Ate itself"
            } else {
                return "Walled"
            }
        }

        const generateHighScoreBool = (gametime) => {
            if(Math.ceil((normal()+3)*gametime)>450){
                return true
            } else {
                return false
            }
        }

        const highScoreBoolValue = generateHighScoreBool(gameTime);

        const generateFreeRewardBool = (gametime) => {
            if(Math.ceil(normal()+3)>5.2){
                return true
            } else {
                return false
            }
        }

        const generatePurchasedRewardBool = (highScore) => {
            if(highScore === true){
                if (Math.random()*(normal()+3) > 2.2) {
                    return true;
                } else {
                    return false;
                }
            } else {
                if (Math.random()*(normal()+3) > 4.9) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        const randomizeTime = () => {
            return Math.ceil((normal()+4)* 10.2)/10;
        }

        let userObj = {
            username: faker.name.findName(),
            gender: renderGender(),
            age: renderAge(),
            userRewards: Math.ceil((normal()+4)*5),
            gametime: gameTime,
            score: gameScore,
            turns: generateTurnsMade(gameTime, gameScore),
            demise: generateDemise(gameTime),
            high_score_bool: generateHighScoreBool(gameTime),
            free_reward_bool: generateFreeRewardBool(gameTime),
            purchased_reward_bool: generatePurchasedRewardBool(highScoreBoolValue),
            time_in_purchase_modal: randomizeTime(),
        };
        promiseArray.push(Axios.post('http://localhost:8080/test/insert_games_data', userObj));
    })

    Promise.all(promiseArray).then(() => {
        console.log("done seeding");
    }).catch(err => console.log(err));
})();