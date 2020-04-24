'use strict';
var bgcolor;
var soldiersize = 10;
var soldiers = [];

function setup() {
  //frameRate(2);
  createCanvas(1000,500);
  bgcolor = color(100);
}

function draw() {
  //Background image
  background(100);
  stroke('blue');
  line(499,0,499,500);
  stroke('red');
  line(502,0,502,500);
  
  //Soldiers
  for(let i = 0; i < soldiers.length; i++){
    //soldiers[i].Hide();
    soldiers[i].Move();
    soldiers[i].Show();
  }
  
  //mouse indicator
  stroke('black');
  noFill();
  var rastercoords = rasterPositionFromMouse();
  rect(rastercoords.x, rastercoords.y, soldiersize, soldiersize);
}

function mouseClicked(){
  var spawnpos = rasterPositionFromMouse();
  
  //Decide side, default red
  var movedir = createVector(-1,0);
  var newSoldier = new Soldier(spawnpos, movedir, color(255,0,0));
  if(spawnpos.x <= 500){//blue
    newSoldier.movedir.x = newSoldier.movedir.x*-1;
    newSoldier.color = color(0,0,255);
  }
  
  soldiers.push(newSoldier);
  newSoldier.Show();
}

class Soldier{
    constructor(coords, movedir, color){
      this.coords = coords;
      this.movedir = movedir;
      this.color = color;
      this.speed = .01;
    }
    FightOrMove(x,y){
      
    }
    Move(){
      this.coords.x += this.movedir.x*this.speed*deltaTime;
      this.coords.y += this.movedir.y*this.speed*deltaTime;
    }
    Show(){
      fill(this.color);
      stroke(bgcolor);
      var pos = this.RoundedPos(this.coords.x, this.coords.y);
      rect(pos.x, pos.y, soldiersize, soldiersize);
    }
    Hide(){
      fill(bgcolor);
      stroke(bgcolor);
      var pos = this.RoundedPos(this.coords.x, this.coords.y);
      rect(pos.x, pox.y, soldiersize, soldiersize);
    }
    RoundedPos(){
      return createVector(roundpixel(this.coords.x), roundpixel(this.coords.y));
    }
}

//Returns the coordinates of a field on the raster. Dependent on mouse position.
function rasterPositionFromMouse(){
  return createVector(roundpixel(mouseX-soldiersize*1.5), roundpixel(mouseY-soldiersize*1.5));
}

//Rundet auf die nächste 10. Also von 32 auf 30 z.B.
function roundpixel(pixel){
  var decimal = pixel/10;
  var rounded = round(decimal);
  return rounded*10;
}