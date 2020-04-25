'use strict';
//A class for Vectors with x and y coordinates
class vec2{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    addV(vec){
        return new vec2(this.x+vec.x,this.y+vec.y);
    }
    subV(vec){
        return new vec2(this.x-vec.x,this.y-vec.y);
    }
    multV(vec){
        return new vec2(this.x*vec.x,this.y*vec.y);
    }
    divV(vec){
        return new vec2(this.x/vec.x,this.y/vec.y);
    }

    addN(number){
        return new vec2(this.x+number,this.y+number);
    }
    subN(number){
        return new vec2(this.x-number,this.y-number);
    }
    multN(number){
        return new vec2(this.x*number,this.y*number);
    }
    divN(number){
        return new vec2(this.x/number,this.y/number);
    }

    magnitude(){
        return sqrt(this.x*this.x + this.y*this.y);
    }
    normalized(){
        var m = this.magnitude();
        if (m > 0) {
            return this.divN(m);
        }
    }

    equals(vec){
        return this.x == vec.x && this.y == vec.y;
    }
}

function dotProduct(vec_l, vec_r){

}