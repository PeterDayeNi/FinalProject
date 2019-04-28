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
  speed: 5
}


function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  
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
  }

  if (bomb.fire == 1) {
    rect(bomb.x, bomb.y, 10, 5);
    bomb.x = bomb.x + bomb.speed;
  }
  
  //Draw the Bubbles 
  ellipse(bubbles.x, bubbles.y, bubbles.size);
  bubbles.x -= bubbles.speed;
  
  //Draw the bullets and kill the bubbles
  
  // noStroke();
  // rect(bullets.x, bullets.y1, 5, 1);
  // rect(bullets.x, bullets.y2, 5, 1);
  // bullets.x += bullets.speed;
  
  var bullet = {
    x: killer.x - 5,
    y1: killer.y - 7,
    y2: killer.y + 7,
    speed: 8,
  }
  
  if (frameCount % 5 == 0) {
    bullets.unshift(bullet);
    bullets = bullets.slice(0, 100);
  }
  
  for (var i = 0; i < bullets.length; i++) {
    var bullet = bullets[i];
    noStroke();
    rect(bullet.x, bullet.y1, 5, 1);
    rect(bullet.x, bullet.y2, 5, 1);
    bullet.x += bullet.speed;
    
    if (dist(bullet.x, bullet.y1, bubbles.x, bubbles.y) < 10) {
    bubbles.x = random(590, 600);
    bubbles.y = random(60, 340);
    Score ++;
    }
    
    if (dist(bullet.x, bullet.y2, bubbles.x, bubbles.y) < 10) {
    bubbles.x = random(590, 600);
    bubbles.y = random(60, 340);
    Score ++;
    }
  
  }
  
  //Level up
  
  //if(Score % 10 == 0 && Score > 0){
  //  bubbles.speed += 0.1; 
  //}
  
  if (Score == 5){
    bubbles.speed = 0.5
  }
  
  if (Score == 10){
    bubbles.speed = 0.75
  }
  
  if (Score == 15){
    bubbles.speed = 1
  }
  
  if (Score == 20){
    bubbles.speed = 1.25
  }
  
  if (Score == 25){
    bubbles.speed = 1.5
  }
  
  if (Score == 30){
    bubbles.speed = 1.75
  }
  
  if (Score == 35){
    bubbles.speed = 2
  }
  
  if (Score == 40){
    bubbles.spped = 2.25
  }
  
  if (Score == 45){
    bubbles.spped = 2.5
  }
  
  if (Score == 50){
    bubbles.spped = 2.75
  }
  
  if (Score == 55){
    bubbles.spped = 3
  }
  
  if (Score == 60){
    bubbles.spped = 3.25
  }
  
  if (Score == 65){
    bubbles.spped = 3.5
  }
  
    
  //Losing HP
  if (bubbles.x < 0){
    HP -= 1
    bubbles.x = random(590, 600);
    bubbles.y = random(60, 340);
  }
  
  //Game Over
  if (HP <= 0){
    background(0)
  }
  
  
}
