
var anime;
var ground,boy, background_sprite;
var gameState="serve";
var boy_image,background_image;
var lives=3, score=0 ;
var image_1,image_2,image_3;

function preload(){
  boy_image=loadImage("player.png");
  background_image=loadImage("background.png");
  
  b1=loadImage("download.png");
  
  
  image_4=loadImage("coin.png");
  
  vegie_1=loadImage("obstacle1.png");

  boy1=loadImage("sadPlayer.png");
}

function setup() {
  createCanvas(600, 600);
  background_sprite=createSprite(300,300,600,600);
  background_sprite.addImage(background_image);
  background_sprite.scale=1;
  boy=createSprite(100,520,20,120);
  boy.addImage(boy_image);
  boy.scale=0.4;
  ground=createSprite(300,590,600,20);
  boy.collide(ground)
  ground.shapeColor="maroon";
  ground.visible=true;
  fruitGroup=new Group();
  vegeGroup=new Group();
  boy.setCollider("rectangle",0,0,150,350);
  //boy.debug=true;
  textSize(25);
  fill("black");
  
}

function draw() {

  drawSprites();
     
  if(gameState=="serve"){
    background_sprite.addImage(b1);
    background_sprite.velocityY=0;
    textFont("callibri");
   text ("Hello!Welcome SUGAR RUSH,",30,100);
    text("I am vanellope please help me to escape from evil, ",30,150);
    text("collect as many coins as possible",30,200)
    text("Be aware of obstacles ",30,250);
    text("You only have 3 lives",30,300);
    text("Press Enter to start",30,350);
    
    background_sprite.scale=3;
    ground.visible=false;
    boy.visible=false;
    
    
    
    if(keyDown("enter")){
        gameState="play";
    }
  }
  
  
  if(gameState=="play"){
    boy.visible=true;
    
    ground.visible=true;
     background_sprite.addImage(background_image);
    background_sprite.velocityX=-4;
    if(background_sprite.x===0){
         background_sprite.x=300; 
    
    }
   if(keyDown("space")&& boy.y>501){
       boy.velocityY=-22;
    }
   if(boy.y < 490) {
       boy.velocityY = boy.velocityY + 1;
    }
    boy.collide(ground);
   if(fruitGroup.isTouching(boy)){
      score=score+1;
      fruitGroup.destroyEach();
    }
   if(vegeGroup.isTouching(boy)){
      gameState="serve";
      lives=lives-1;
     background_sprite.addImage(b1)
     background_sprite.x=300
      restart();
    }
    vegetable();
    fruits();
    text("COINS:"+score,450,50);
    text("LIVES:"+lives,450,80);
  
    if(lives==0){
      gameState="end";
    }
  }

  
  if(gameState=="end"){
    
   text("GAME OVER",150,200);
   text("Better Luck Next Time",150,250); 
   text("PRESS R TO RESTART",150,300);
   boy.visible=false;
  ground.visible=false;
   if(keyDown("r")){
      restart();
      score=0;
      lives=3;
      gameState="serve";
    }
  }

}

function fruits(){
    
  rand=Math.round(random(300,480));
  //randNum=Math.round(random(1,4));
  
  if(frameCount%170==0){
    Fruit=createSprite(610,410,20,20);
    Fruit.y=rand;
    Fruit.addImage(image_4);
    Fruit.scale=0.9;
    Fruit.velocityX=-4;
    Fruit.lifetime = 160;
    fruitGroup.add(Fruit);
   
  }   

   
}

function vegetable(){
  
  
  
  if(frameCount%300==0){
    vege=createSprite(610,550,50,20);
    
    vege.velocityX=-5;
    vege.lifetime = 160;
  
     vegeGroup.add(vege);
   vege.debug=true;
    vege.setCollider("rectangle",0,0,90,40  );
    vege.scale=1;
   vege.addImage(vegie_1);
}
}

function restart(){
  
  fruitGroup.destroyEach();
  vegeGroup.destroyEach();
  background_sprite.velocityX=0;
  boy.x=100;
  boy.y=460;
  boy.velocityY=0;

}




















