// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.width = 101;
    // Larger speed value corresponds to faster movement
    // Vehicle will travel speed*dt pixel every frame
    // Speed is randomly set in the range from 50 to 350
    this.speed = Math.random()*300+50;
    // Initially, vehicle is at the left edge
    this.x = -this.width;
    // The initial row of vehicle is randomly chosen, but
    // vehicle can only appear in stone rows (row 1 to row 3)
    this.row = Math.floor(Math.random()*3+1);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed*dt;
    // Vehicle exceeds the right edge
    // remove that vehicle from vehicle array
    if(this.x > 505) {
        removeSprite(this, allEnemies);
    }
    // Vehicle is considered in a certain grid
    // if half of the vehicle is in that grid
    this.col = Math.floor((this.x+this.width/2)/101);
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.row*83-24);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    // Initial position for player is the middle bottom
    this.col = 2;
    this.row = 5;
}
// Change play position according to arrow keys pressed
Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'left':
            this.col -= 1;
            break;
        case 'right':
            this.col += 1;
            break;
        case 'up':
            this.row -= 1;
            break;
        case 'down':
            this.row += 1;
            break;
    }
}
Player.prototype.update = function() {
    // Prevent player from moving to invalid area
    // (eg. water block, outside of canvas)
    if(this.col < 0) {
        this.col = 0;
    }
    if(this.col > 4) {
        this.col = 4;
    }
    if(this.row < 1) {
        this.row = 1;
    }
    if(this.row > 5) {
        this.row = 5;
    }
}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.col*101, this.row*83-24);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
allEnemies = [];
// Instantiate an enemy vehicle every 1.5 seconds
// and push it into allEnemies array
setInterval(makeEnemy, 1500);
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
// Instantiate an enemy vehicle and push it into allEnemies array
// will be called by setInerval every 1.5 seconds
function makeEnemy() {
    var enemy = new Enemy();
    allEnemies.push(enemy);
}
// Remove a sprite object from targetArray
function removeSprite(sprite, targetArray) {
    // First find the index of sprite to move
    var idx = targetArray.indexOf(sprite);
    // If found, remove that sprite
    if (idx !== -1) {
        targetArray.splice(idx, 1);
    }
}