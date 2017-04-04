import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { CanvasService } from '../services/canvas.service';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-whitaboard',
  templateUrl: './whitaboard.component.html',
  styleUrls: ['./whitaboard.component.css'],
  providers: [ SocketService, CanvasService ]
})
export class WhitaboardComponent implements OnInit {
  context: CanvasRenderingContext2D;
  paint: any;

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

    onTouchStart(e) {
        e.preventDefault();
        this.paint = true;

        Array.from(e.changedTouches).map(
            (touch:any) => {
                let mouseX = touch.pageX - this.context.canvas.offsetLeft,
                    mouseY = touch.pageY - this.context.canvas.offsetTop;

                this.canvas.addClick(mouseX - this.context.canvas.offsetLeft, mouseY - this.context.canvas.offsetTop, true);
                this.canvas.redraw();
            }
        )
    }

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
    private socket: SocketService,
    private canvas: CanvasService
  ) {

  }

  ngOnInit() {
  }

}
