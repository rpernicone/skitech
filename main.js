var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');



var trees = [];
var speed = 2;
var lives = 3;
var level;
var interval;
var frames = 0;

class Skier{
    constructor(){
        this.x = 150;
        this.y = 50;
        this.width = 30;
        this.height = 30;
        this.image = new Image();
        this.image.src = './skier_26f7.png'
    }
    draw(){
        if(this.y < canvas.height - 30) this.y += gravity;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

class Background{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.Background = white;
    }
}

var ski1 = new Skier();
var interval = setInterval(){}