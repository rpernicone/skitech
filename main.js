
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var playbtn = document.getElementById('playbtn')
var trees = [];
//var lives = 3;
//var level;
var interval;
var frames = 0;
// var speed;
var gravity = 0.3;
var score = 0;
var snowballs = [];
var treeSpeed = 2;
// var secs;
//var position ;
//var direction;

// SKIER CLASS

class Skier{
    constructor(){
        this.x = 300;
        this.y = 50;
        this.width = 30;
        this.height = 40;
        this.image = new Image();
        this.image.src = './images/Skier1.png'
    }
    draw(){
        if(this.y < canvas.height && this.y > 50) this.y -= gravity;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    moveRight(){
        this.x += 16;
        this.y += 2;
        this.width = 60;
        this.height = 50;
        this.image = new Image();
        this.image.src = './images/Skier1Right.png'
        // tree.forEach(item => {
        //     console.log(item);
        // })
        //if(){}
    }
    moveLeft(){
        this.x -= 16;
        this.y += 2;
        this.width = 60;
        this.height = 50;
        this.image = new Image();
        this.image.src = './images/Skier1Left.png'
    }
    brake(){
        this.y -= 9;
        this.width = 60;
        this.height = 50;
        this.image = new Image();
        this.image.src = './images/Skier1Left.png'
    }
    speed(){
        this.y += 5;
        this.width = 30;
        this.height = 40;
        this.image = new Image();
        this.image.src = './images/Skier1.png';
    }
    collision(item){
        return (this.x < item.x + item.width) &&
            (this.x + this.width > item.x) &&
            (this.y < item.y + item.height) &&
            (this.y + this.height > item.y);
    }
//  SPEED() FUNCTION ATTEMPT TO CALCULATE THE SECONDS THE 
//  PLAYER DIDN'T USE THE MOVE FUNCTIONS AND START INCREASING 
//  GRAVITY PROPORTIONALLY TO SECONDS PASSED
// secs(){
// if(moveRight() == false || moveLeft() == false){
//     speed += 0.2
//     }
// };
 }


//  BACKGROUND CLASS
class Snow{
    constructor(pos){
        this.x = pos;
        this.y = 0;
        this.width = 20;
        this.height = 20;
        this.image = new Image();
        this.image.src = './images/snowball.png';
    }
    draw(){
        this.y++
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

//  TREE CLASS
class Tree{
    constructor(pos){
        this.x = pos+28;
        this.y = 500;
        this.width = 55;
        this.height = 90;
        this.image = new Image();
        this.image.src = './images/tree.png';
    }
    draw(){
        this.y -= 2;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

// INSTANCE DECLARATION
var skiman = new Skier();
var tree = new Tree()
var snowball = new Snow();

// INTERACTION FUNCTIONS ->>

//  GENERATE SNOWBALLS REPEATEADLY 
function generateSnowBalls(){
    if(!(frames % 20 === 0)) return;
    let pos = Math.floor(Math.random()*(canvas.width-50));
    let snowball = new Snow(pos);
    snowballs.push(snowball);
    
};

//  DRAW THE SNOWBALLS GENERATED
function drawSnowBalls(){
    snowballs.forEach((snow, index) =>{
        snow.draw();
        if(snow.y > +canvas.height){
            snowballs.splice(index,1)
        };
    })
}

//  GENERATE TREES REPEATEADLY 
function generateTrees(){
    if(!(frames % 70 === 0)) return;
    let pos = Math.floor(Math.random()*(canvas.width));
    let tree = new Tree(pos);
    trees.push(tree);
    
};

//  DRAW THE TREES GENERATED
function drawTrees(){
    trees.forEach((tree, index) =>{
        tree.draw( treeSpeed);
        if(tree.y < -canvas.height){
            trees.splice(index,1)
        };
        if(skiman.collision(tree)){
            gameover = true;
        }
    })
};


//  COUNTS TIME PASSED SKIING WITHOUT COLLISSION = SCORE
function counter(){
        if(skiman.y >= 50){
            score += 1;
        }
};

//  RUNS ALL FUNCTIONS WHEN CALLED at START()
function update(){
    frames++
    ctx.clearRect(0,0,canvas.width, canvas.height);
    skiman.draw();
    generateSnowBalls();
    drawSnowBalls();
    counter();
    generateTrees();
    drawTrees();
    ctx.fillText(score, 30,30);
    ctx.font = "20px Avenir";
    if(gameover) gameOver()
};

// CALLED WHEN BTN CLICKED ON SCREEN
function start(){
    interval = setInterval(update, 1000/60)
    let audio = new Audio();
    audio.src = './sounds/cant stop.mp3';
    audio.loop = true;
    audio.play();
};

//  CALLED WHEN SPACE PRESSED
function reset(){
    if(interval !== undefined) return;
    gameover = false;
    skiman.x = 300;
    skiman.y = 50;
    skiman.width = 30;
    skiman.height= 40;
    skiman.image = new Image();
    skiman.image.src = './images/Skier1.png';
    score= 0;
    frames = 0;
    interval = undefined;
    trees = [];
    ctx.clearRect(0,0,canvas.width, canvas.height)
}

//  GAMEOVER 
function gameOver(){
    ctx.clearRect(skiman.x,skiman.y,skiman.width, skiman.height);
    ctx.clearRect(30,30,30,30);
    skiman.image = new Image();
    skiman.image.src = './images/skimangameover.png'
    skiman.width = 55;
    skiman.height = 70;
    skiman.image.onload = () => {
    skiman.draw();
    ctx.font = "40px Avenir";
    ctx.fillText('Score '+score, 250,220);
    ctx.font = "40px Avenir"
    ctx.fillText("Game Over", 230, 150);
    ctx.font = "20px Avenir"
    ctx.fillText("Presiona 'esc' para empezar de nuevo", 170, 180);
    clearInterval(interval);
    interval = undefined;
    }  
}

// EVENTLISTENERS

addEventListener('keydown', function(e){
    if(e.keyCode === 39){
        skiman.moveRight();
    }
    if(e.keyCode === 37){
        skiman.moveLeft();
    }
    if(e.keyCode === 40){
        skiman.speed();
    }
    if(e.keyCode === 27){
        reset();
    }
});

// BUTTON LISTENERS

playbtn.addEventListener('click', function(e){
    start();
})
