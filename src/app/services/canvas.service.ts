import { Injectable } from '@angular/core';

@Injectable()
export class CanvasService {
  clickX:any[] = new Array();
  clickY:any[] = new Array();
  clickDrag:any[] = new Array();
  colorsArray:any[] = new Array();
  clickCoords:any = new Set();
  color: string;
  context:any;

  addClick(clickX, clickY, clickDrag, color = this.color) {
    let hash = clickX +':'+ clickY + ':' + clickDrag + ':' + this.color;
    if(!this.clickCoords.has(hash)) {
        this.clickCoords.add(hash);
        this.clickX.push(clickX);
        this.clickY.push(clickY);
        this.clickDrag.push(clickDrag);
        this.colorsArray.push(color);
    }
  }

  eraseAll() {
      this.clickX = [];
      this.clickY = [];
      this.clickDrag = [];
      this.colorsArray = [];
      this.clickCoords = new Set();

      this.redraw();
  }

  redraw() {
    let canvas:any = document.querySelector('#canvasSection');
    this.context = canvas.getContext("2d");

    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height); // Clears the canvas
    this.context.strokeStyle = this.color;
    this.context.lineJoin = "round";
    this.context.lineWidth = 5;

    for(var i = 0; i < this.clickX.length; i++) {
      this.context.beginPath();
      if(this.colorsArray[i]) this.context.strokeStyle = this.colorsArray[i];

      if (this.clickDrag[i] && i){
        this.context.moveTo(this.clickX[i-1], this.clickY[i-1]);
       } else {
         this.context.moveTo(this.clickX[i], this.clickY[i]);
       }
       this.context.lineTo(this.clickX[i], this.clickY[i]);
       this.context.closePath();
       this.context.stroke();
    }
  }

  constructor() {
      this.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
  }
}
