export class Ant {
    static step = 1
    constructor(position = [0,0]){
        this.direction = Math.random()*2*Math.PI
        this.position = position
        this.antDirectionFreedom = Math.random()*0.2
        this.antSpeedModfier = Math.random()*0.2
    }
}

Ant.prototype.walk = function(pos,setLog){
    const stepDirectionModifier =(Math.random()-0.5)*2*Math.PI
    const stepSpeedModifier =    (Math.random()-0.5)*0.10
    const deltaX = pos[0]-this.position[0]
    const deltaY = this.position[1]-pos[1]
    const tan = deltaY/deltaX
    const ang = Math.atan(tan)
    this.direction=ang
    // setLog(JSON.stringify([deltaX,deltaY]))



    // this.direction = this.direction + this.antDirectionFreedom * stepDirectionModifier

    const step = [
        Math.cos(this.direction)*(Ant.step+stepSpeedModifier+this.antSpeedModfier),
        Math.sin(this.direction)*(Ant.step)
    ]

    this.position = [
        this.position[0] + step[0],
        this.position[1] + step[1]
    ]
    return this

}