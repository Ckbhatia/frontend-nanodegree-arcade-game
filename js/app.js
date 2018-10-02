// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y; // 55: below the water/finish line
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';// a helper we've provided to easily load images
    }
// Parameter: dt, a time delta between ticks
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.
// Update the enemy's position, required method for game
    update(dt) {
       if (this.x < 505) {//it checks that enemies should not move outside
        this.x += this.speed * dt; // speed muliply by delta time
       }
       else {//this resets enemy's location to -101(initial)
        this.x = -101;
       }
    }
// Draw the enemy on the screen, required method for game
    render() {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

let points = 1;//Player will  be rewarded points when he/she win.
let looseTime = 1;//It will 
let totalChances = 5;//This is total chances provided to user

// Now write your own player class
// Place the player object in a variable called player
class Player extends Enemy {
    constructor(x,y) {
        super(x,y);
        this.sprite = "images/char-boy.png";
    }
// This class requires an update(), render() and
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
//This handles the player position from input given by user
//Moves the player when gets input
// a handleInput() method.
    handleInput(input) {
        switch(input) {
            case 'left':
            if (this.x > 0) {//prevent the player to not move outside from left 
            this.x -= 101;
            }
            break;
            case 'up':
            if (this.y > 0) {//prevent the player to not move outside from uppper
            this.y -= 83;
            }
            break;
            case 'right':
            if (this.x < 404) {//prevent the player to not move outside from right
            this.x += 101;
            }
            break;
            case 'down':
            if (this.y < 387) {//prevent the player to not move outside from below
            this.y += 83;
            console.log(this.y);
            }
            break;
        }
    }
    update() {
        for(let enemy of allEnemies) {//loops through every single enemy to get there indiviual x,y value
             if (this.y === enemy.y && ( enemy.x + (138||55) / 2> this.x && enemy.x < this.x + 101/2)) {
                alert(`You loose ${looseTime} time, Your chances left ${totalChances-1}`);//this will show score and chances of player
                looseTime += 1;//this.loose();// this will count loose time of player
                totalChances -= 1;//this.chances();//this will decrease the chances of player
                this.reset();// it will going to reset the player to initial location
            }
            else if (this.y === -28) {//it checkes that user reached to the water
                this.reset();//invokes reset method to place player back to initial position
                points += 1;//increase points
                alert(`Your total points ${points}`);//shows total points to user
                }
            else if (totalChances === 0) {//if zero/no chances left than it reset whole game
                alert('Game Over');    
                totalChances = 5;//reset chances back to 5 
                looseTime = 1;//reset looseTime to 1, zero for user
                points = 1;//reset points to 1, zero for user
            }
         }    
 }
    reset() {// these value sets player pos to starting point.
        this.x = 202;//initial x pos of player
        this.y = 387;//initial y pos of player
    }
}
// Now instantiate your objects.
const player = new Player(202,387);
// Place all enemy objects in an array called allEnemies
const bug1 = new Enemy(-101, 55, 200);
const bug2 = new Enemy(-101, 83+55, 300);
const bug3 = new Enemy((-101*2.5), 83+55, 280);
const bug4 = new Enemy((-101*1.5), 221, 250);
const bug5 = new Enemy((-101*1.5), 221, 300);
//blank allEnemies created
const allEnemies = [];
//enemies pushed to the allEnemies array;
allEnemies.push(bug1,bug2,bug3,bug4,bug5);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});