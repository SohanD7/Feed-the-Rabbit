const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var fruit;
var backgroundPic, cutButtonImg, melonImg, rabbitImg;
var eatAnimation, blinkAnimation, sadAnimation;
var airSound, eatSound, cutSound, sadSound, backSound;
let engine;
let world;

function preload()
{
  backgroundPic = loadImage("background.png");
  cutButtonImg = loadImage("cut_button.png");
  melonImg = loadImage("melon.png");
  rabbitImg = loadImage("Rabbit-01.png");
  blinkAnimation = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eatAnimation = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sadAnimation = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  eatAnimation.looping = false;
  sadAnimation.looping = false;
  airSound = loadSound("air.wav");
  eatSound = loadSound("eating_sound.mp3");
  cutSound = loadSound("rope_cut.mp3");
  sadSound = loadSound("sad.wav");
  backSound = loadSound("sound1.mp3");
}

function setup() 
{
  var deviceInfo = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  console.log(deviceInfo);
  if (deviceInfo)
  {
    canvasWidth = displayWidth;
    canvasHeight = displayHeight;
    createCanvas(canvasWidth+50,canvasHeight)
  } else 
  {
    canvasWidth = windowWidth;
    canvasHeight = windowHeight;
    createCanvas(canvasWidth,canvasHeight);
  }
  frameRate(80);
  engine = Engine.create();
  world = engine.world;


  backSound.play();
  backSound.setVolume(0.1);
 
  rectMode(CENTER);
  imageMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

  ground = new Ground(canvasWidth,20,canvasWidth/2,canvasHeight);

  rope1 = new Rope(5,{x: 350, y: 40});
  rope2 = new Rope(4,{x: 400, y: 150});
  rope3 = new Rope(8,{x: 50, y: 30});

  fruit = Bodies.circle(300,300,20);

  Matter.Composite.add(rope1.body,fruit);

  link1 = new Link(rope1,fruit);
  link2 = new Link(rope2,fruit);
  link3 = new Link(rope3,fruit);
  //adjusting the speed of the animations | higher means slower
  blinkAnimation.frameDelay = 15;
  eatAnimation.frameDelay = 20;
  sadAnimation.frameDelay = 15;

  rabbit = createSprite(250,canvasHeight-100);
  rabbit.addAnimation("blink",blinkAnimation);
  rabbit.addAnimation("eat",eatAnimation);
  rabbit.addAnimation("sad",sadAnimation);
  rabbit.scale = 0.2;

  button1 = createImg("cut_button.png");
  button1.size(35,35);
  button1.position(335,50);
  button1.mouseClicked(drop1);

  button2 = createImg("cut_button.png");
  button2.size(35,35);
  button2.position(370,155);
  button2.mouseClicked(drop2);

  button3 = createImg("cut_button.png");
  button3.size(35,35);
  button3.position(50,30);
  button3.mouseClicked(drop3);

  muteButton = createImg("mute.png");
  muteButton.size(35,35);
  muteButton.position(450,30);
  muteButton.mouseClicked(mute);

  balloonButton = createImg("balloon.png");
  balloonButton.size(100,70);
  balloonButton.position(30,170);
  balloonButton.mouseClicked(blowBalloon);
}

function draw() 
{
  background(51);
  image(backgroundPic,width/2,height/2,canvasWidth,canvasHeight);
  Engine.update(engine);
  push();
  fill("red");
  if (fruit != null)
  {
    image(melonImg,fruit.position.x,fruit.position.y,60,60);
  }
  pop();
  if (checkCollision(fruit,rabbit,70) == true)
  {
    rabbit.changeAnimation("eat");
    eatSound.play();
  }
  //if (checkCollision(fruit,ground.body,70) == true)
  if (fruit != null && fruit.position.y > 650)
  {
    rabbit.changeAnimation("sad");
    World.remove(world,fruit);
    fruit = null;
    backSound.stop();
    sadSound.play();
  }
  ground.display();
  rope1.show();
  rope2.show();
  rope3.show();
  drawSprites();
}

function drop1()
{
  rope1.break();
  link1.detatch();
  link1 = null;
  cutSound.play();
}

function drop2()
{
  rope2.break();
  link2.detatch();
  link2 = null;
  cutSound.play();
}

function drop3()
{
  rope3.break();
  link3.detatch();
  link3 = null;
  cutSound.play();
}

function mute()
{
  if (backSound.isPlaying())
  {
    backSound.stop();
  } else {
    backSound.play();
  }
}

function blowBalloon()
{
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.02,y:0});
  airSound.play();
}

function checkCollision(body,sprite,x)
{
  if (body != null)
  {
    var distance = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if (distance < x)
    {
      World.remove(world,fruit);
      fruit = null;
      return true;
    } else {
      return false;
    }
  }
}






