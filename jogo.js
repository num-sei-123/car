//início do código do jogo
var car, car_andando, car_colide;
var ground, invisibleGround, groundImage;
var cloudsGroup, cloudImage;
var obstaclesGroup, obst1, obst2, obst3, obst4, obst5, obst6;

var gameOverImg, gameOver;
var restartImg, restart;

var count;

var jumpSom, dieSom, checkPointSom;

var PLAY=1;
var END=0;
var gameStart = PLAY;

var canvas;


function preload(){
   car_andando = loadAnimation("sprite_00.png","sprite_01.png");
   car_colide= loadImage("sprite_02.png");

    groundImage = loadImage("fundo.png");

    obst1 = loadImage("sprite_06.png");
    obst2 = loadImage("sprite_07.png");
    obst3 = loadImage("sprite_08.png");
    obst4 = loadImage("sprite_09.png");

    restartImg=loadImage("restart.png");
    gameOverImg=loadImage("gameOver.png");
    jumpSom=loadSound("jump.mp3");
    dieSom=loadSound("die.mp3");
    checkPointSom=loadSound("checkPoint.mp3");
   
}

function setup(){
    canvas = createCanvas(1000, 300);
    canvas.position(150,130);

 
    ground = createSprite(100,150,1500,20);
    car = createSprite(50,220,30,60);
    invisibleGround = createSprite(200, 260, 400, 10);
    gameOver = createSprite(520, 80);
    restart = createSprite(520, 120);

    cloudsGroup = new Group();
    obstaclesGroup = new Group();

    car.addAnimation("car_andando", car_andando);
    ground.addImage("ground", groundImage);
    gameOver.addImage("gameOver", gameOverImg);
    restart.addImage("restart", restartImg);
    ground.scale=1;
    car.scale=0.1;
    gameOver.scale = 0.5;
    restart.scale = 0.5;

    ground.velocityX = -100;

    invisibleGround.visible = false;
    gameOver.visible = false;
    restart.visible = false;

    count = 0;
}

function draw(){
    background("#ffff00");
    drawSprites();
fill(rgb(255,255,255));
textStyle(BOLD);
textSize(20);
text("SCORE: "+ count, 450, 50);
if(gameStart === PLAY){

    ground.velocityX =-(6 + 3*count/100);
    count=count+Math.round(World.frameRate/60);
    if(count>0 && count%100===0){
    checkPointSom.play();
    }

if(ground.x < 0){
    ground.x = ground.width/2;
}
if(keyDown("space") && car.y >= 180){
    car.velocityY = -17;
    jumpSom.play();
}
car.velocityY = car.velocityY + 0.8;
createObstacles();
 if(obstaclesGroup.isTouching(car)){
    gameStart = END;
    dieSom.play();
 }
}
 else if(gameStart === END){
    gameOver.visible = true;
    restart.visible = true;
 
 if(mousePressedOver(restart)){
    reset();
 }
 ground.velocityX=0
 car.velocityY=0
 obstaclesGroup.setVelocityXEach(0);
 car.addImage("car_colide", car_colide);
 obstaclesGroup.setLifetimeEach(-1);
 }
 car.collide(invisibleGround);
}
function createObstacles() {
if(frameCount % 99 === 0){
var obstacle = createSprite(1500,200,10,40);
obstacle.velocityX=-(6+3*count/100);
var rand = Math.round(random(1,4))
switch(rand){
    case 1: obstacle.addImage(obst1);
    break;
    case 2: obstacle.addImage(obst2);
    break;
    case 3: obstacle.addImage(obst3);
    break;
    case 4: obstacle.addImage(obst4);
    break;
    default: break;
}
obstacle.scale=0.2;
obstacle.lifetime=300;
obstaclesGroup.add(obstacle);
}
}

function reset(){
    gameStart=PLAY;
    gameOver.visible=false;
    restart.visible=false;
    obstaclesGroup.destroyEach();
    car.addAnimation("car", car_andando);
    count=0;
}

