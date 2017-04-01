import { Injectable } from '@angular/core';

@Injectable()
export class CanvasService {
  clickX:any[] = new Array();
  clickY:any[] = new Array();
  clickDrag:any[] = new Array();
  clickCoords:any = new Set();
  context:any;

  addClick(clickX, clickY, clickDrag){
    let hash = clickX +':'+ clickY + ':' + clickDrag;
    if(!this.clickCoords.has(hash)) {
        this.clickCoords.add(hash);
        this.clickX.push(clickX);
        this.clickY.push(clickY);
        this.clickDrag.push(clickDrag);
    }
  }

  redraw() {
    let canvas:any = document.querySelector('#canvasSection');
    this.context = canvas.getContext("2d");

    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height); // Clears the canvas
    this.context.strokeStyle = "#df4b26";
    this.context.lineJoin = "round";
    this.context.lineWidth = 5;

    for(var i=0; i < this.clickX.length; i++) {
      this.context.beginPath();
      if(this.clickDrag[i] && i){
        this.context.moveTo(this.clickX[i-1], this.clickY[i-1]);
       }else{
         this.context.moveTo(this.clickX[i]-1, this.clickY[i]);
       }
       this.context.lineTo(this.clickX[i], this.clickY[i]);
       this.context.closePath();
       this.context.stroke();
    }
  }

  constructor() {

  }
}
