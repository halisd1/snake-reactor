const { default: Axios } = require("axios");
var faker = require('faker');
const random = require('random');
const normal = random.normal();

const names = ['Alissa', 'Shaquon', 'Michael', 'Faker', 'Karl', 'Lim', 'Lopez', 'Riven', 'Shi', 'Josef', 'Akali', 'Elana', 'Diana', 'Katie', 'Carina', 'Thomas', 'Jason', 'Joseph', 'Chris', 'Daniel', 'Jake Berg', 'Arun', 'Johnny', 'James', 'Jordan', 'Matt', 'Jacob', 'Haneen', 'Jessie', 'Morgana', 'Garen'];
gender = ['male', 'female', 'neutral']; //1,2 heavy
age = [1,2,3,4]; //1,2 heavy

(function seedPlayers(){
    const promiseArray = [];
    const arr = new Array(200).fill(1);

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

        const renderAge = () => {
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

        let userObj = {
            username: faker.name.findName(),
            gender: renderGender(),
            age: renderAge(),
            score: Math.ceil(Math.random()*30),
            reward: Math.ceil(Math.random()*15),
            reward_one: Math.ceil(Math.random()*12),
            reward_two: Math.ceil(Math.random()*6),
            reward_three: Math.ceil(Math.random()*3),
            reward_four: Math.ceil(Math.random()*3),
            reward_five: Math.ceil(Math.random()*2),
            reward_six: Math.ceil(Math.random()*2),
        };
        
        promiseArray.push(Axios.post('http://localhost:8080/test/insert_data', userObj));
    })

    Promise.all(promiseArray).then(() => {
        console.log("done seeding");
    })
})();
