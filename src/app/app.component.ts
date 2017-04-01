import { Component } from '@angular/core';
import { StepperService } from './services/stepper.service';
import { ViewChild } from '@angular/core';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ StepperService, SocketService ]
})
export class AppComponent {
  title:string = 'Present perfect tense presentation!';
  rectW:number = 100;
  rectH:number = 100;
  rectColor:string = "#FF0000";
  context:CanvasRenderingContext2D;

  clickX:any[] = new Array();
  clickY:any[] = new Array();
  clickDrag:any[] = new Array();
  paint:any;

  @ViewChild("canvasSection") canvasSection;

  ngAfterViewInit() {
    let canvas = this.canvasSection.nativeElement;
    this.context = canvas.getContext("2d");
  }

  onMouseDown(e) {
    var mouseX = e.pageX - this.context.canvas.offsetLeft;
    var mouseY = e.pageY - this.context.canvas.offsetTop;

    this.paint = true;
    this.addClick(e.pageX - this.context.canvas.offsetLeft, e.pageY - this.context.canvas.offsetTop, null);
    this.redraw();
  };

  onMouseMove(e) {
    if(this.paint){
      this.addClick(e.pageX - this.context.canvas.offsetLeft, e.pageY - this.context.canvas.offsetTop, true);
      this.redraw();
    }
  }

  onMouseUp(e) {
    this.paint = false;
    this.socket
        .emit('event',
            { type: 'canvas', clickX: this.clickX, clickY: this.clickY, clickDrag: this.clickDrag });
  }

  onMouseLeave(e) {
    this.paint = false;
    this.socket
        .emit('event',
            { type: 'canvas', clickX: this.clickX, clickY: this.clickY, clickDrag: this.clickDrag  });
  }

  addClick(x, y, dragging){
    this.clickX.push(x);
    this.clickY.push(y);
    this.clickDrag.push(dragging);
  }

  redraw() {
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

  constructor(
      private stepper: StepperService,
      private socket: SocketService
  ) {
  }

  prevStep(): void {
    this.stepper.prevStep();
  }

  nextStep(): void {
    this.stepper.nextStep();
  }
}
