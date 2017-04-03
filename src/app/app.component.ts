import { Component } from '@angular/core';
import { StepperService } from './services/stepper.service';
import { ViewChild } from '@angular/core';
import { SocketService } from './services/socket.service';
import { CanvasService } from './services/canvas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ StepperService, SocketService, CanvasService ]
})
export class AppComponent {
  title:string = 'Present perfect tense presentation!';

  context:CanvasRenderingContext2D;
  paint:any;

  @ViewChild("canvasSection") canvasSection;

  ngAfterViewInit() {
    let canvas = this.canvasSection.nativeElement,
        rect = canvas.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;
    this.context = canvas.getContext("2d");
  }

  onMouseDown(e) {
    var mouseX = e.pageX - this.context.canvas.offsetLeft;
    var mouseY = e.pageY - this.context.canvas.offsetTop;

    this.paint = true;
    this.canvas.addClick(e.pageX - this.context.canvas.offsetLeft, e.pageY - this.context.canvas.offsetTop, null);
    this.canvas.redraw();
  };

  onMouseMove(e) {
    if(this.paint){
      this.canvas.addClick(e.pageX - this.context.canvas.offsetLeft, e.pageY - this.context.canvas.offsetTop, true);
      this.canvas.redraw();
    }
  }

  private emitDrawing() {
      this.paint &&
      this.socket
          .emit('event',
              {
                type: 'canvas',
                clickX: this.canvas.clickX,
                clickY: this.canvas.clickY,
                clickDrag: this.canvas.clickDrag,
                color: this.canvas.color
            });
  }

  onMouseUp(e) {
    this.emitDrawing();
    this.paint = false;
  }

  onMouseLeave(e) {
    this.emitDrawing();
    this.paint = false;
  }

  constructor(
      private stepper: StepperService,
      private socket: SocketService,
      private canvas: CanvasService
  ) {

  }

  prevStep(): void {
    this.stepper.prevStep();
  }

  nextStep(): void {
    this.stepper.nextStep();
  }
}
