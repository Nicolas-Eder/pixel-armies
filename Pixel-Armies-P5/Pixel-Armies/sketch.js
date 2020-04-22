'use strict';
var bgcolor;
var soldiersize;
var soldiers = [];

function setup() {
  frameRate(2);
  createCanvas(1000,500);
  background(100);
  
  bgcolor = color(100);
  soldiersize = 10;
}

function draw() {
  print(soldiers.length);
  for(let i = 0; i < soldiers.length; i++){
    soldiers[i].Hide();
    soldiers[i].Move();
    soldiers[i].Show();
  }
}

function mouseClicked(){
  var spawnpos = createVector(mouseX-(soldiersize*1.5), mouseY-soldiersize*1.5);
  var movedir = createVector(soldiersize,0);
  var newSoldier = new Soldier(spawnpos, movedir, color(255,0,0));
  soldiers.push(newSoldier);
}

class Soldier{
    constructor(coords, movedir, color){
      this.coords = coords;
      this.movedir = movedir;
      this.color = color;
    }

    FightOrMove(x,y){
      
    }
    Move(){
      this.coords.add(this.movedir);
    }
    Show(){
      fill(this.color);
      rect(this.coords.x, this.coords.y, soldiersize, soldiersize);
    }
    Hide(){
     fill(bgcolor);
     stroke(bgcolor);
     rect(this.coords.x, this.coords.y, soldiersize, soldiersize);
    }
}