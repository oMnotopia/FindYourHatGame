const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this.field = field;
    }

    //Main function to run the game
    runGame () {
        let map = this.field;
        let userIP = ''
        let xPos = 0;
        let yPos = 0;

        while(userIP !== 'q') {
            this.print();
            userIP = prompt('Which way?');        
            
            if(userIP === 'd') {
                // if (yPos === 2) {
                //     console.log('You can not move any farther down')
                // } else {
                    yPos++;
                //}   
            } else if (userIP === 'u') {
                // if (yPos === 0) {
                //     console.log('You can not move any farther up')
                // } else {
                    yPos--;
                //}   
            } else if (userIP === 'r') {
                // if (xPos === 2) {
                //     console.log('You can not move any farther right')
                // } else {
                    xPos++;
                //}   
            } else if (userIP === 'l') {
                // if (xPos === 0) {
                //     console.log('You can not move any farther left')
                // } else {
                    xPos--;
                //}   
            } else {
                return console.log('Please enter a valid direction')
            }

            //Determines if the game should end if the character fell or won
            //Determines if character fell off the map by looking at positions greater than board size
            if (xPos>map[yPos].length) {
                console.log('You have gone to far in X(right)dir')
                break;
            }
            if (xPos<0) {
                console.log('You have gone to far in X(left)dir')
                break;
            }
            if (yPos>this.field.length) {
                console.log('You have gone to far in Y(down)dir')
                break;
            }
            if (xPos<0) {
                console.log('You have gone to far in Y(up)dir')
                break;
            }
            //compares character position to globally set hole char
            if (map[yPos][xPos]===hole){
                console.log('YOU FELL IN A HOLE!!!!')
                break;
            }
            //compares character position to globally set hat char
            if(map[yPos][xPos]===hat) {
                console.log('YOU WIN!!!!!')
                break;
            }

            //Updates the field property of the class with a '*' at new character position
            map[yPos][xPos] = pathCharacter;

        }
    }

    //Prints the entire field passed into the class
    print() {
        for(let row of this.field) {
            console.log(row.join(''))
        }
    }

    static generateField(width, height, numOfHoles) {
        let map = [];
        let counter = height*width;
        let randomHatXPosition = Math.floor((Math.random()*counter)/height)
        let randomHatYPosition = Math.floor((Math.random()*counter)/width)

        //Generates an entire grid of field characters.
        for(let i =0; i<height; i++) {
            map.push([])
            for(let j =0; j<width; j++) {
                map[i].push(fieldCharacter)
            }  
        }

        //Assigns top left position to path character
        map[0][0] = pathCharacter;
        //Checks if random X and Y position are 0,0. If so put hat at end position
        if((randomHatYPosition===0)&&(randomHatXPosition===0)) {
            map[height-1][width-1] = hat;
        } else {
            map[randomHatYPosition][randomHatXPosition] =  hat;
        }

        //Adds number of holes by checking if random X and Y Positions are already filled, if not then fill.
        while (numOfHoles>0) {
            let randomHoleXPosition = Math.floor((Math.random()*counter)/height)
            let randomHoleYPosition = Math.floor((Math.random()*counter)/width)

            if((randomHoleYPosition===0)&&(randomHoleXPosition===0)) {
                continue;
            } else if (map[randomHoleYPosition][randomHoleXPosition]===hat){
                continue
            } else if (map[randomHoleYPosition][randomHoleXPosition]===hole){
                continue
            } else {
                map[randomHoleYPosition][randomHoleXPosition] = hole;
                numOfHoles--;
            }
        } 
    return map;
    }
}

let height = 4;
let width = 6;
let numOfHoles = 8

let generatedField = Field.generateField(width, height, numOfHoles)

let myField = new Field(generatedField)
myField.runGame();