'use strict';
//Timing
var simulationInterval = 700;
var simulationtimer = 0;
//Color
var bgcolor;
var goalcolor;
var leftArmyColor;
var rightArmyColor;
//Soldiers
var soldiersize = 10;
var soldiers = [];
//Points
var leftArmyPoints = 0;
var rightArmyPoints = 0;
//html-elements
var enemyName, enemyPoints, enemyReserves;
var playerName, playerPoints, playerReserves;

function setup() {
  var canvas = createCanvas(1000,500);
  canvas.parent("sketch");
  bgcolor = color(100);
  leftArmyColor = color(0,0,255);
  rightArmyColor = color(255,0,0);
  goalcolor = color(50);

  enemyPoints = select('#enemyPoints');
  playerPoints = select('#playerPoints');
}
function draw() {  
  loadPixels();
  if(mouseIsPressed){
    SpawnSoldier();
  }
  
  DrawBG();
  DrawSoldiers()

  simulationtimer += deltaTime;
  if(simulationtimer >= simulationInterval){
    MoveSoldiers();
    simulationtimer = 0;
  }
  
  DrawGUI();
}

function DrawBG(){
  background(100);
  stroke('black');
  line(500,0,500,500);
  line(501,0,501,500);
  noStroke();
  fill(goalcolor);
  rect(990,0,10,500);
  rect(0,0,10,500);
}

function DrawGUI(){
  //mouse indicator
  stroke('black');
  noFill();
  var rastercoords = rasterPositionFromMouse();
  rect(rastercoords.x, rastercoords.y, soldiersize, soldiersize);

  //score
  enemyPoints.html("Points " + leftArmyPoints);
  playerPoints.html(rightArmyPoints + " Points");
  //troups
}

function DrawSoldiers(){
  for(let i = 0; i < soldiers.length; i++){
    soldiers[i].Show();
  }
}
function MoveSoldiers(){
  for(let i = 0; i < soldiers.length; i++){
    soldiers[i].Act();
  }
}

function SpawnSoldier(){
  var spawnpos = rasterPositionFromMouse();

  //does not spawn anything if unit exists in this place
  if(!SameColor(get(spawnpos.x+1,spawnpos.y+1),bgcolor)){
    return;
  }
  
  //Decide side, default right
  var movedir = new vec2(-1,0);
  var newSoldier = new Soldier(spawnpos, movedir, rightArmyColor, leftArmyColor);
  if(spawnpos.x <= 500){//left
    newSoldier.movedir.x = newSoldier.movedir.x*-1;
    newSoldier.color = leftArmyColor;
    newSoldier.enemyColor = rightArmyColor;
  }
  
  soldiers.push(newSoldier);
  newSoldier.Show();
}

function KillSoldier(coords){
  for(var i = 0; i < soldiers.length; i++){
    if(soldiers[i].coords.equals(coords)){
      soldiers.splice(i,1);
      return;
    }
  }
}

function AddPoint(color){
  if(color == leftArmyColor){
    leftArmyPoints++;
  }
  else{
    rightArmyPoints++;
  }
}


class Soldier{
    constructor(coords, movedir, color, enemyColor){
      this.coords = coords;
      this.movedir = movedir;
      this.color = color;
      this.enemyColor = enemyColor;
    }
    Act(){
      var scanVec = this.movedir.multN(soldiersize);
      var displayedPos = this.RoundedPos();
      var soldierCenter = displayedPos.addN(soldiersize/2);
      var samplePixelPos = soldierCenter.addV(scanVec);
      loadPixels();
      var samplePixelColor = get(samplePixelPos.x,samplePixelPos.y);

      if(SameColor(samplePixelColor, this.enemyColor)){
        this.Fight();
      }
      else if(SameColor(samplePixelColor, goalcolor)){
        AddPoint(this.color);
        KillSoldier(this.coords);
      }
      else if(SameColor(samplePixelColor, bgcolor)){
        this.Move();
      }
    }
    Fight(){
      var r = random(1,10);
      //die
      if(r <= 5){
        KillSoldier(this.coords);
      }
      //kill
      else{
        var enemyPos = this.coords.addV(this.movedir.multN(soldiersize));
        KillSoldier(enemyPos);
      }
    }
    Move(){
      this.coords.x += this.movedir.x*soldiersize;
      this.coords.y += this.movedir.y*soldiersize;
      this.Show();
    }
    Show(){
      fill(this.color);
      noStroke();
      var pos = this.RoundedPos(this.coords.x, this.coords.y);
      rect(pos.x, pos.y, soldiersize, soldiersize);
    }
    Hide(){
      noStroke();
      noFill();
      var pos = this.RoundedPos(this.coords.x, this.coords.y);
      rect(pos.x, pos.y, soldiersize, soldiersize);
    }
    RoundedPos(){
      return new vec2(roundpixel(this.coords.x), roundpixel(this.coords.y));
    }
}

//Returns the coordinates of a field on the raster. Dependent on mouse position.
function rasterPositionFromMouse(){
  return new vec2(roundpixel(mouseX-soldiersize*1.5), roundpixel(mouseY-soldiersize*1.5));
}

//Rundet auf die nächste 10. Also von 32 auf 30 z.B.
function roundpixel(pixel){
  var decimal = pixel/10;
  var rounded = round(decimal);
  return rounded*10;
}

//compares r,g,b values
//returns true, if all 3 values of col1 match all 3 of col2
function SameColor(col1,col2){
  return red(col1) == red(col2) && green(col1) == green(col2) && blue(col1) == blue(col2);
}