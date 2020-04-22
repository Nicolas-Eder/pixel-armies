'use strict';
var bgcolor;
var soldiersize;
let red_army;
let blue_army;

function setup() {
  frameRate(2);
  createCanvas(1000,500);
  background(100);
  
  bgcolor = color(100);
  soldiersize = 10;
  red_army = new Army(color(255,0,0));
  blue_army = new Army(color(0,0,255));
}

function draw() {
  print(red_army.soldiers.length);
  for(let i = 0; i < red_army.soldiers.length; i++){
    red_army.soldiers[i].Hide();
    red_army.soldiers[i].Move(soldiersize, soldiersize);
    red_army.soldiers[i].Show();
  }
}

function mouseClicked(){
    red_army.SpawnSoldier(mouseX-(soldiersize*1.5), mouseY-soldiersize*1.5);
 // else
   // blue_army.SpawnSoldier(mouseX-(soldiersize*1.5), mouseY-soldiersize*1.5);
}

class Army{
  constructor(color){
    this.color = color;
    this.soldiers = [];
  }
  SpawnSoldier(x,y){
    this.soldiers.push(new Soldier(x,y,this.color));
  }
}

class Soldier{
    constructor(x,y,color){
      this.x = x;
      this.y = y;
      this.color = color;
    }
    
    FightOrMove(x,y){
      
    }
    Move(x,y){
      this.x+=x;
      this.y+=y;
    }
    Show(){
      fill(this.color);
      rect(this.x, this.y, soldiersize, soldiersize);
    }
    Hide(){
     fill(bgcolor);
     stroke(bgcolor);
     rect(this.x, this.y, soldiersize, soldiersize);
    }
  }