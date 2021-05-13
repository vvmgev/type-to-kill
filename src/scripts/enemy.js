let selectColor = ["#DB291D",'#F85F68','#77B1AD','#F0B99A','#E1CF79','#F5998E','#B16774',"#FAB301",
       "#F85F68","#4FAA6D","orange","green","#58A8C9","#CDD6D5","#ECD2A2","white"];
let y = -10;
let i = 0;
export default class Enamy {
    constructor(text) {
        this.x = Math.round(Math.random()*(window.innerWidth-60)+30);
        this.y = y = y - 50;
        this.radius = 30;
        this.color = selectColor[Math.floor(Math.random()*(selectColor.length-1))];;
        this.yDelta = 1;
        this.text = text;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        context.fillStyle=this.color;
        context.fill();
        context.stroke();
        context.font = "15px Arial";
        context.fillStyle = "white";
        context.fillText(this.text, this.x - 25, this.y + 3);
    }

    update(context) {
        i++
        // this.type();
        if(i % 60 === 0) {
            // console.log(this.yDelta)
        }
        this.y += this.yDelta;

        // this.y = 200;
        // this.x = 700;
    }

    type() {
        context.font = '40px Arial';
        context.strokeStyle = 'lightgrey';
        context.strokeText(this.word, 670, 580);
    }

}
