
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var playbtn = document.getElementById('playbtn')
var trees = [];
//var lives = 3;
//var level;
var interval;
var frames = 0;
// var speed;
var gravity = 0.5;
var score = 0;
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
        if(this.y < canvas.height - 50) this.y += gravity;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    moveRight(){
        this.x += 12;
        this.y -= 1;
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
        this.x -= 12;
        this.y += 1;
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
        this.y += 3;
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
class Background{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.image = new Image();
        this.image.src = './images/background.png';
    }
    draw(){
        this.y--
        if(this.y < -canvas.width) this.y = 0
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
    //  slowdown(){
    //      this.y += 5;
    //  }
    draw(){
        this.y -= 3;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

// INSTANCE DECLARATION
var skiman = new Skier();
var fondo = new Background();
var tree = new Tree()

// INTERACTION FUNCTIONS ->>

//  GENERATE TREES REPEATEADLY 
function generateTrees(){
    if(!(frames % 70 === 0)) return;
    let pos = Math.floor(Math.random()*(canvas.width-50));
    let tree = new Tree(pos);
    trees.push(tree);
    
};

//  DRAW THE TREES GENERATED
function drawTrees(){
    trees.forEach((tree, index) =>{
        tree.draw();
        if(tree.y < -canvas.height){
            trees.splice(index,1)
        };
        if(skiman.collision(tree)){
            gameover = true;
        }
    })
};

//  COUNTS TIME SPENT WITHOUT COLLISSION AND SKIING = SCORE
function counter(){
        if(skiman.y >= 50){
            score += 1;
        }
};

//  RUNS ALL FUNCTIONS WHEN CALLED at START()
function update(){
    frames++
    ctx.clearRect(0,0,canvas.width, canvas.height);
    fondo.draw();
    skiman.draw();
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
};

//  CALLED WHEN SPACE PRESSED
// function resume(){
    
// };
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
        // e.preventDefault();
    }
    if(e.keyCode === 37){
        skiman.moveLeft();
        // e.preventDefault();
    }
    // if(e.keyCode === 27){
    //     resume();
    // }
    if(e.keyCode === 38){
        skiman.brake();
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
});
