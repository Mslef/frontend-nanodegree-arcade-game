
// Global variables
var score = 0, //player score
    message = '', // Message diplayed with the score
    difficulty = {'Easy':9, 'Medium': 18, 'Hard': 24}; //determines the number of enemies

// Display score and message
var displayValues = function() {
    $('#score').html(score.toString());
    $('#message').html(message);
};

displayValues();

//Characters Class, with sprite value, position, update, render methods
var Character = function(spriteImg, x, y) {

    // The image/sprite for our characters
    this.sprite = spriteImg;

    // Starting position
    this.x = x;
    this.y = y;
};

// Draw the character on the screen, required method for game
Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Enemy class
var Enemy = function(enemyImage, x, y, speed) {
    Character.call(this, enemyImage, x, y);

    // Speed of the enemy
    this.speed = speed;
};

Enemy.prototype = Object.create(Character.prototype);

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Handle collisions with the player
    if( Math.abs(player.x-this.x)<=40 && Math.abs(player.y-this.y)<=40){
        // Reduce player score and display message
        score -= 20;
        message = 'You got hit!';
        displayValues();
        // Reinitialise the player position
        player.x = 200;
        player.y = 300;
    }

    // Reinitialise the movement of the enemy if it's out of the canvas
    if (this.x >= 500) {
        this.x = -200-Math.ceil(Math.random()*1000);
    }
    // Move the enemy in the x axis
    else {
        this.x += this.speed*dt;
    }
};


// Player class
var Player = function(){
    Character.call(this, 'images/char-boy.png', 202, 300);

};

Player.prototype = Object.create(Character.prototype);

// Update the character's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {

};

//Handle input
Player.prototype.handleInput = function(key) {
    // Basic movement restricted inside the canvas
    switch(key) {
        case "up":
            this.y -= 30;
            break;
        case "down":
            if (this.y <= 370) {
                this.y += 30;
                break;
            }  
            break;
        case "left":
            if (this.x >= 0) {
                this.x -= 30;
                break;
            }  
            break;
        case "right":
            if (this.x <= 400) {
                this.x += 30;
                break;
            }  
            break;
        default:
            console.log("Input error");
    }
    // Player wins if he reaches the water, located at -20
    if (this.y <= -20) {
        this.y = 300;
        this.x = 200;
        score += 100;
        message = "Well done! You got through!";
        displayValues();
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Difficulty level affects enemy Speed and Qty of Enemies

// Adds enemies in 3 rows, with a random x position and a random speed
var createEnemies = function(number) {
    allEnemies = [];
    for (var i = 0; i < number ; i++) {
        // Determine random starting speed and x positions for enemies
        var randomStartPos = -200 - Math.ceil((Math.random()*1000));
        var randomStartSpeed = Math.ceil(Math.random()*200);
        // Spread enemies evenly in y
        var yDistribution = 50+i%3*85;
        allEnemies.push(new Enemy("images/enemy-bug.png", randomStartPos, yDistribution,randomStartSpeed ));
    }
    return allEnemies;
};

// Create all enemies, default difficulty is easy
var allEnemies = createEnemies(difficulty['Easy']);

// Create the player
var player = new Player();


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


// Game settings

// Change focus to the canvas to allow player movement after dropdown selection
$("select").change(function(){
    $(this).blur();
});

// Change character sprite
$('#character').change(function (){
    var imageURL = 'images/char-'+$('#character option:selected').text()+'.png';
    // Change Image in UI
    $('.char-preview img').attr('src', imageURL);
    // Change player sprite
    player.sprite = imageURL;
    
});

// Change difficulty;
$('#difficulty').change(function () {
    allEnemies = createEnemies(difficulty[$('#difficulty option:selected').text()]);
    $('canvas').focus();
});





