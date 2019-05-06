var border = {
  topline: 50,
  botline: 350,
}

var countdown = 3

var Timer = {
  Num1: 0,
  Num2: 0,
  Num3: 0
}

var Score = 0

var killer = {
  x: 20,
  y: 200,
  movingspeed: 5,
}

// var bullets = {
//   x: killer.x - 5,
//   y1: killer.y - 7,
//   y2: killer.y + 7,
//   speed: 8,
// }

  
var bomb = {
  num:1,
  x: killer.x,
  y: killer.y,
  fire: 0,
  speed: 10
}

var HP = 3

var bullets = [];

var bubbles = {
  x: 600,
  y: 200,
  size: 20,
  speed: 5,
  speedincrease:0.5
}

var bubbles2 = {
  x: 5000,
  y: 100,
  size: 10,
}

var bubbles3 = {
  x: 5000,
  y: 300,
  size: 15,
}

var hugebubbles = {
  x: 1000,
  y: 200,
  size: 200,
  speed: 3
}

function preload() {
  soundFormats('mp3', 'wav', 'ogg');
  Boom = loadSound('Boom.wav');
  Gameover = loadSound('Gameover.wav');
  Fire = loadSound('Fire.wav');
  Opening = loadSound('Opening.mp3');
  Background = loadSound('Background.mp3');
}

function setup() {
  createCanvas(600, 400);
  Background.play();
  
}

function draw() {
  background(0);
  
  //textAlign(CENTER, CENTER);
  //rotate(PI/4);
  //text("Test", -width/2, height/2, width, height*10);
  
  //Draw the Countdown
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(40);
  
  if (countdown > -1) {
    if (frameCount % 60 == 0) { 
      countdown --;
    }
    
    if (countdown > 0) {
        text(countdown, width/2, height/2);
    }
    else if (countdown == 0){
      text("GO!", width/2, height/2);
    }
    
    return;
  }
  
  //Draw the Border
  stroke(255);
  line(0, border.topline, width, border.topline);
  line(0, border.botline, width, border.botline);
  
  //Draw the Timer
  textAlign(LEFT, CENTER);
  textSize(16);
  text(Timer.Num1 + ":" + Timer.Num2 + Timer.Num3, 100, 375);
  
  if (frameCount % 60 == 0) { 
    Timer.Num3 ++;
  }
  
  if (Timer.Num3 == 10){
    Timer.Num3 = 0
    Timer.Num2 ++
  }
  
  if (Timer.Num2 == 6){
    Timer.Num2 = 0
    Timer.Num1 ++
  }
  
  //Draw the Score
  text("Score: " + Score, 235, 375 );
  
  //Draw the Bomb Number
  text("Bomb: " + bomb.num, 400 ,375);
  
  //Draw the HP
  text("HP: " + HP, 100, 25);
  
  //Draw the Killer  
  rectMode(CENTER);
  stroke(0);
  rect(killer.x, killer.y, 20, 10);
  triangle(killer.x - 10, killer.y - 15, killer.x - 10, killer.y - 5, killer.x + 3, killer.y - 5);
  triangle(killer.x - 10, killer.y + 15, killer.x - 10, killer.y + 5, killer.x + 3, killer.y + 5);
  triangle(killer.x + 10, killer.y - 5, killer.x + 20, killer.y, killer.x + 10, killer.y + 5);

  //Player input
  if (keyIsDown(UP_ARROW)) {
    killer.y -= killer.movingspeed;
  }

  if (keyIsDown(DOWN_ARROW)) {
    killer.y += killer.movingspeed;
  }
  
  if (keyIsDown(LEFT_ARROW)){
    killer.x -= killer.movingspeed;
  }
  
  if (keyIsDown(RIGHT_ARROW)){
    killer.x += killer.movingspeed;
  }

  if (killer.y < border.topline + 18) {
    killer.y = border.topline + 18;
  }
  if (killer.y > border.botline - 18) {
    killer.y = border.botline - 18;
  }
  
  if (killer.x < 20) {
    killer.x = 20
  }
  
  if (killer.x > 450) {
    killer.x = 450
  }
  
  //Draw the bomb  
  if (keyIsDown(32) && bomb.num > 0) {
    bomb.fire = 1;
    bomb.num -= 1;
    bomb.x = killer.x;
    bomb.y = killer.y;
    Fire.play()
  }

  if (bomb.fire == 1) {
    rect(bomb.x, bomb.y, 10, 5);
    bomb.x = bomb.x + bomb.speed;
  }
  
  if (bomb.x > 610) {
    bomb.y = 0;
  }
  
  //Draw the Bubbles 
  ellipse(bubbles.x, bubbles.y, bubbles.size);
  bubbles.x -= bubbles.speed;
  
  if (Score > 150){
  ellipse(bubbles2.x, bubbles2.y, bubbles2.size)
  bubbles2.x -= bubbles.speed; 
  }
  
  if (Score > 75){
  ellipse(bubbles3.x, bubbles3.y, bubbles3.size)
  bubbles3.x -= bubbles.speed; 
  }
  
  //Draw the bullets and kill the bubbles
  
  // noStroke();
  // rect(bullets.x, bullets.y1, 5, 1);
  // rect(bullets.x, bullets.y2, 5, 1);
  // bullets.x += bullets.speed;
  
  //Instructor helped me to write the following bullets part code
  
  var bullet = {
    x: killer.x - 5,
    y1: killer.y - 7,
    y2: killer.y + 7,
    speed: 8,
  }
  
  if (frameCount % 4 == 0) {
    bullets.unshift(bullet);
    bullets = bullets.slice(0, 60);
  }
  
  for (var i = 0; i < bullets.length; i++) {
    var bullet = bullets[i];
    noStroke();
    rect(bullet.x, bullet.y1, 5, 1);
    rect(bullet.x, bullet.y2, 5, 1);
    bullet.x += bullet.speed;
    
    if (dist(bullet.x, bullet.y1, bubbles.x, bubbles.y) < 12) {
    bubbles.x = random(590, 600);
    bubbles.y = random(60, 340);
    Score ++;
    }
    
    if (dist(bullet.x, bullet.y2, bubbles.x, bubbles.y) < 12) {
    bubbles.x = random(590, 600);
    bubbles.y = random(60, 340);
    Score ++;
    }
    
    if (dist(bullet.x, bullet.y1, bubbles2.x, bubbles2.y) < 8) {
    bubbles2.x = random(590, 600);
    bubbles2.y = random(60, 340);
    Score ++;
    }
    
    if (dist(bullet.x, bullet.y2, bubbles2.x, bubbles2.y) < 8) {
    bubbles2.x = random(590, 600);
    bubbles2.y = random(60, 340);
    Score ++;
    }
    
    if (dist(bullet.x, bullet.y1, bubbles3.x, bubbles3.y) < 10) {
    bubbles2.x = random(590, 600);
    bubbles2.y = random(60, 340);
    Score ++;
    }
    
    if (dist(bullet.x, bullet.y2, bubbles3.x, bubbles3.y) < 10) {
    bubbles3.x = random(590, 600);
    bubbles3.y = random(60, 340);
    Score ++;
    }
  
  }
  
  //Level up
  
  //if(Score % 10 == 0 && Score > 0){
  //  bubbles.speed += 0.25; 
  //}
  //
  // Need to improve
  //
  //if(Score % 5 == 0 && Score > 0){
  //  bubbles.speed += bubbles.speedincrease
  //}
    
  if (Score == 10){
    bubbles.speed = 5.5
  }
  
  if (Score == 20){
    bubbles.speed = 6
  }
  
  if (Score == 30){
    bubbles.speed = 6.5
  }
  
  if (Score == 40){
    bubbles.speed = 7
  }
  
  if (Score == 50){
    bubbles.speed = 7.5
  }
  
  if (Score == 60){
    bubbles.speed = 8
  }
  
  if (Score == 70){
    bubbles.speed = 8.5
  }
  
  if (Score == 80){
    bubbles.speed = 9
  }
  
    
  //Losing HP
  if (bubbles.x < 0){
    HP -= 1
    bubbles.x = random(590, 600);
    bubbles.y = random(60, 340);
  }
  
  if (bubbles2.x < 0){
    HP -= 1
    bubbles2.x = random(590, 600);
    bubbles2.y = random(60, 340);
  }
  
  if (bubbles3.x < 0){
    HP -= 1
    bubbles3.x = random(590, 600);
    bubbles3.y = random(60, 340);
  }
  
  //Cheat Mode
  //Win
  if (keyIsDown(49)){
    Score += 50
  }
  
  //Lose
  if (keyIsDown(50)){
    HP -= 1
  }
  
  //Ending
  if (Score > 800 && HP > 0){
    bubbles.x = 5000
    bubbles2.x = 5000    
    bubbles3.x = 5000
    bubbles.speed = 0
    ellipse(hugebubbles.x, hugebubbles.y, hugebubbles.size)
    hugebubbles.x -= hugebubbles.speed
  }
  
  
  //Game Over
  if (hugebubbles.x < 150 || dist(killer.x, killer.y, hugebubbles.x, hugebubbles.y) < 150 || dist(killer.x, killer.y, bubbles.x, bubbles.y) < 20 || dist(killer.x, killer.y, bubbles2.x, bubbles2.y) < 15 || dist(killer.x, killer.y, bubbles3.x, bubbles3.y) < 18) {
    HP -= 3
  }
  
  if (HP <= 0){
    Background.stop();
    Gameover.play()
    background(0);
    textAlign(CENTER, CENTER);
    textSize(80);
    text("Game Over", 300, 100);
    textSize(20);
    text("Thanks for what you did!", 300, 200);
    text("But the you didn't kill all the bubbles.", 300, 240);
    text("Good Luck, Pilot.", 300, 280);
    noLoop()
  }
  
  //Win
  if (dist(bomb.x, bomb.y, hugebubbles.x, hugebubbles.y) < 100){
    Boom.play()
    hugebubbles.speed = 0
    bomb.speed = 0
    background(0);
    textAlign(CENTER, CENTER);
    textSize(80);
    text("Thank You!", 300, 100);
    textSize(20);
    text("You didn't survive the explosion.", 300, 200);
    text("But you cleared all the bubbles", 300, 240)
    text("People will remember you are a hero.", 300, 280);
    noLoop()
  }
  
}
