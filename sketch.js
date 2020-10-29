var PLAY = 1;
var END = 0;
var gameState = PLAY;


var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var obstacle;
var ground;
var FoodGroup, obstacleGroup;
var happyTime,happyFoodTime ;
var score, score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(600, 500)
  
monkey = createSprite(100, 300, 20, 20);
  monkey.addAnimation("monkey_running", monkey_running);
  monkey.scale = 0.15;
  
  ground = createSprite(50, 350, 800, 10);
  ground.velocityX = -3;
  ground.x = ground.width/2
 
  foodGroup = createGroup();
  
  obstaclesGroup = createGroup();
  
  score = 0;
happyFoodTime = 0;
  
}


function draw() {

  background("lightGreen");
  
  
  
   stroke("blue");
  textSize(20);
  fill("blue")
  text("happyTime :" + score, 100, 50);
  text("happyFoodTime :" +happyFoodTime , 400, 50);
  
  if (gameState === PLAY){
    
    score = score + Math.round(getFrameRate()/60);
  
     if(foodGroup.isTouching(monkey)){
      
       foodGroup.destroyEach();
         happyFoodTime = happyFoodTime + 1;
      
    }
  
  if(ground.x < 200){
    
     ground.x = ground.width/2
    
  }
  
  if(keyDown("space")&& monkey.y >= 150) {
        monkey.velocityY = -10;
       
    }
    
   
    
     if(obstaclesGroup.isTouching(monkey)){
    
    gameState = END;
    
   
  }
    
  }else if(gameState === END){
    
     textSize(50);
    text ("gameOver", 200, 300)
    
    monkey.destroy();
    foodGroup.destroyEach();
    obstaclesGroup.destroyEach();
    ground.destroy();
    
    
  }
 
  
  
  monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.collide(ground);
  
  
  
  spawnBanana();
  
  spawnObstacles();
  
 
  
  drawSprites();
  
}

function spawnBanana(){
  
  if (frameCount % 80 === 0){
  banana = createSprite(500, 150, 10, 10 )
    banana.y = Math.round(random(100,200));
    banana.addImage("banana", bananaImage)
  banana.scale = 0.1;
    banana.velocityX = -3;
  banana.lifetime = 167;
    
     banana.depth = monkey.depth;
    
    foodGroup.add(banana);
    
}
}


function spawnObstacles(){
 if (frameCount % 300 === 0){
    obstacle = createSprite(600,330,10,40);
   obstacle.addImage("obstacle", obstacleImage)
   obstacle.velocityX = -6;
   
    
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 100;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}
