//Characters Class, with sprite value, position, update, render methods

// canvas.width = 505;
// canvas.height = 606;
// Each row : 101px
// Each column : 101px
var Character = function(spriteImg, x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = spriteImg;
    //this.loc = "Startpos";
    this.x = x;
    this.y = y;
};


// Update the character's position, required method for game
// Parameter: dt, a time delta between ticks
Character.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

//Enemies' x value must change, y stays the same; render at 60FPS with consideration to dt 
    setInterval(function() {
        this.x += x;
        this.y += y;
    }, 1000/60*dt);
};

// Draw the character on the screen, required method for game
Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid


var Enemy = function(enemyImage, x, y) {
    Character.call(this, enemyImage, x, y);

};

Enemy.prototype = Object.create(Character.prototype);

Enemy.movementLoop = function(startPos) {
    if (startPos === 'left') {
        this.x += 1;
    }
    if (startPos === 'right') {
        this.y -= 1;
    }
};

//Player has additional handleInput method
var Player = function(playerImage){
    Character.call(this, playerImage, 202, 400);
};

Player.prototype = Object.create(Character.prototype);


Player.prototype.handleInput = function(key, step) {
    switch(key) {
        case "up":
            this.y -= step;
            break;
        case "down":
            if (this.y <= 420) {
                this.y += step;
                break;
            }  
            break;
        case "left":
            this.x -= step;
            break;
        case "right":
            this.x += step;
            break;
        default:
            console.log("Input error");
    }
    if (this.y === -20) {
        alert("Well done! You won!");
        this.y = 400;
    }
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Difficulty level affects enemy Speed and Qty of Enemies
var allEnemies = [];
var totalEnemies = 5;
var playerStep = 10;

for (var i = 0; i < totalEnemies; i++) {
    allEnemies.push(new Enemy("images/enemy-bug.png", -50, 101));
}

//Allow for selection of player avatar
var player = new Player('images/char-boy.png');

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode], playerStep);
});

//Add store counter, timer
