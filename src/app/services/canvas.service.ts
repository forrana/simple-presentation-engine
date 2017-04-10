import { Injectable } from '@angular/core';

import { Points } from './points';

@Injectable()
export class CanvasService {
  color: string;
  context:any;
  points: Points;

  changeColor(color) {
      if(color) {
          this.color = color;
      } else {
          this.color = this.generateRandomColor();
      }

      return this.color;
  }

  addClick(clickX, clickY, clickDrag, eraseMode, color = this.color) {
    if(eraseMode) {
        this.points.eraseClick(clickX, clickY, clickDrag, color);
    } else {
        this.points.addClick(clickX, clickY, clickDrag, color);
        this.redraw();
    }
  }

  addPoint(point) {
      this.points.addPoint(point);
  }

  addPoints(points: any) {
    [...points.values()]
        .map(point => this.addPoint(point))
        this.redraw();
  }

  eraseAll() {
      this.points.clearField();
      this.redraw();
  }

  redraw() {
    let canvas:any = document.querySelector('#canvasSection');
    this.context = canvas.getContext("2d");

    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height); // Clears the canvas
    this.context.strokeStyle = this.color;
    this.context.lineJoin = "round";
    this.context.lineWidth = 5;
    let pointsIterator = this.points.getPoints(),
        prevPoint = pointsIterator.next().value,
        nextPoint;

    while(nextPoint = pointsIterator.next().value) {
        this.context.beginPath();
        if(nextPoint.color) this.context.strokeStyle = nextPoint.color;

        if (nextPoint.isDrag){
           this.context.moveTo(prevPoint.X, prevPoint.Y);
         } else {
           this.context.moveTo(nextPoint.X, nextPoint.Y);
         }
         this.context.lineTo(nextPoint.X, nextPoint.Y);
         this.context.closePath();
         this.context.stroke();
         prevPoint = nextPoint;
    }
  }

  generateRandomColor() {
      return '#' + (Math.random()*0xFFFFFF<<0).toString(16);
  }

  constructor() {
      this.points = new Points();
      this.color = this.generateRandomColor();
  }
}
