
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var trees = [];
var lives = 3;
var level;
var interval;
var frames = 0;
var gravity = 0.1;
var position ;
var speed = gravity + position;
//var direction = if(ski1.x + ski1.y == 2) {direction = 2};

class Skier{
    constructor(){
        this.x = 450;
        this.y = 50;
        this.width = 30;
        this.height = 40;
        this.image = new Image();
        this.image.src = './images/Skier1.png'
    }
    draw(){
        if(this.y < canvas.height - 30) this.y += gravity;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    moveRight(){
        this.x += 20;
        this.y -= 1;
        //if(){}
    }
    moveLeft(){
        this.x -= 3;
    }
}

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
class Tree{
    constructor(pos){
        this.x = pos;
        this.y = 500;
        this.width = 55;
        this.height = 90;
        this.image = new Image();
        this.image.src = './images/tree.png';
    }
    draw(){
        this.y -= 4;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
var skiman = new Skier();
var fondo = new Background();

function generateTrees(){
    if(!(frames % 85 === 0)) return;
    let pos = Math.floor(Math.random()*canvas.width - 55);
    let tree1 = new Tree(pos);
    let tree2 = new Tree()
    trees.push(tree1);
    trees.push(tree2);
};
function drawTrees(){
    trees.forEach((tree, index) =>{
        tree.draw();
        if(tree.y < -canvas.height){
            trees.splice(index,1)
        };
    })
};
function speed(){

};
function levelUp(){

};
function update(){
    frames++
    ctx.clearRect(0,0,canvas.width, canvas.height);
    fondo.draw();
    skiman.draw();
    generateTrees();
    drawTrees();
};
function start(){
    interval = setInterval(update, 1000/60)
};
function resume(){

};

addEventListener('keyright', function(e){
    if(e.keyCode === 39){
        skiman.moveRight();
    }
});

start();