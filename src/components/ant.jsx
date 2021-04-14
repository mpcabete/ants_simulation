export class Ant {
    static baseSpeed = 50/1000 //px/ms
    constructor(position = [0,0]){
        this.direction = Math.random()*2*Math.PI
        this.position = position
        this.antDirectionFreedom = Math.random()*0.1 // 0.1 -> 0.2
        this.antSpeedModfier = Math.random()*0.2
    }
}

Ant.prototype.walk = function(point,deltaT,setLog){
    // modifiers for this step

    const randomAngle =(Math.random()-0.5)* 2 * 2 *Math.PI //-2pi -> 2pi
    const randomWeigthedNumber =    (Math.random()-0.5)*0.10 //
    
    // movement amplitude
    const deltaS =  Ant.baseSpeed * deltaT
    
    
    // this.direction = this.getPointDirection(point) // seguir mouse
    this.direction = this.direction + this.antDirectionFreedom * randomAngle
    
    // setLog(JSON.stringify(tan))
    // [parseInt(deltaX),parseInt(deltaY)]

    const step = [
        Math.cos(this.direction)*(deltaS+randomWeigthedNumber+this.antSpeedModfier),
        Math.sin(this.direction)*(deltaS)
    ]
    // console.log(foodDirection)
    this.position = [
        this.position[0] + step[0],
        this.position[1] + step[1]
    ]
    return this

}

Ant.prototype.getPointDirection = function(point){
// calculate x and y distance
const deltaX =point[0] - this.position[0]
const deltaY =point[1] - this.position[1] 

// calculate direction(radians)
const pointDirection = Math.atan2(deltaY,deltaX)


return pointDirection
}