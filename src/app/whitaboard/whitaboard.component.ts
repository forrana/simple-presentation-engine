import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';

import { SocketService } from '../services/socket.service';
import { CanvasService } from '../services/canvas.service';
import { FlickrService } from '../services/flickr.service';

@Component({
  selector: 'app-whitaboard',
  templateUrl: './whitaboard.component.html',
  styleUrls: ['./whitaboard.component.css'],
  providers: [SocketService, CanvasService, FlickrService]
})
export class WhitaboardComponent implements OnInit {
  context: CanvasRenderingContext2D;
  paint: any;
  images: any[];
  errorMessage: any;
  image: any;

  @ViewChild("canvasSection") canvasSection;

  ngAfterViewInit() {
    let canvas = this.canvasSection.nativeElement,
        rect = canvas.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;
    this.context = canvas.getContext("2d");
  }

  onEraseAll() {
      this.canvas.eraseAll();
  }

  onMouseDown(e) {
    let mouseX = e.pageX - this.context.canvas.offsetLeft,
        mouseY = e.pageY - this.context.canvas.offsetTop;

    this.paint = true;
    this.canvas.addClick(mouseX, mouseY, false);
    this.canvas.redraw();
  };

  onTouchStart(e) {
    e.preventDefault();
    this.paint = true;

    Array.from(e.changedTouches).map(
      (touch: any) => {
        let mouseX = touch.pageX - this.context.canvas.offsetLeft,
            mouseY = touch.pageY - this.context.canvas.offsetTop;

        this.canvas.addClick(mouseX, mouseY, false);
        this.canvas.redraw();
      }
    )
  }

  onTouchMove(e) {
    e.preventDefault();
    this.paint = true;

    Array.from(e.changedTouches).map(
      (touch: any) => {
        let mouseX = touch.pageX - this.context.canvas.offsetLeft,
            mouseY = touch.pageY - this.context.canvas.offsetTop;

        this.canvas.addClick(mouseX, mouseY, true);
        this.canvas.redraw();
      }
    )
  }

  onTouchEnd(e) {
    e.preventDefault();
    this.emitDrawing();
    this.paint = false;
  }

  onMouseMove(e) {
    if (this.paint) {
    let mouseX = e.pageX - this.context.canvas.offsetLeft,
        mouseY = e.pageY - this.context.canvas.offsetTop;

        this.canvas.addClick(mouseX, mouseY, true);
        this.canvas.redraw();
    }
  }

  onMouseUp(e) {
    this.emitDrawing();
    this.paint = false;
  }

  onMouseLeave(e) {
    this.emitDrawing();
    this.paint = false;
  }

  onFindButtonClick(tags) {
    this.flickrService
      .getImagesByTags(tags)
      .subscribe(
          images => this.images = images,
          error => this.errorMessage = <any>error
      );
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

  constructor(
    private socket: SocketService,
    private canvas: CanvasService,
    private flickrService: FlickrService,
  ) {

  }

  ngOnInit() {
  }

}
