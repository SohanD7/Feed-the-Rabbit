class Ground
{
    constructor(w,h,x,y)
    {
        this.groundWidth = w;
        this.groundHeight = h;
        this.x = x;
        this.y = y;
        this.body = Bodies.rectangle(this.x,this.y,this.groundWidth,this.groundHeight,{isStatic: true});
        World.add(world,this.body);
    }

    display()
    {
        push();
        rectMode(CENTER);
        fill("black");
        rect(this.x,this.y,this.groundWidth,this.groundHeight);
        pop();
    }
}