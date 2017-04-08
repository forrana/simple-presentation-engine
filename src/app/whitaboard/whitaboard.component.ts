import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';

import { SocketService } from '../services/socket.service';
import { CanvasService } from '../services/canvas.service';
import { FlickrService } from '../services/flickr.service';

@Component({
  selector: 'app-whitaboard',
  templateUrl: './whitaboard.component.html',
  styleUrls: ['./whitaboard.component.css'],
  providers: [CanvasService, FlickrService]
})
export class WhitaboardComponent implements OnInit {
  context: CanvasRenderingContext2D;
  paint: any;
  images: any[];
  errorMessage: any;
  image: any;
  eraseMode: boolean = false;
  currentColor: string;

  @ViewChild("canvasSection") canvasSection;
  @ViewChild("colorButton") colorButton;

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

  onToggleEraseMode() {
      this.eraseMode = !this.eraseMode;
  }

  onMouseDown(e) {
    let mouseX = e.pageX - this.context.canvas.offsetLeft,
        mouseY = e.pageY - this.context.canvas.offsetTop;

    this.paint = true;
    this.canvas.addClick(mouseX, mouseY, false, this.eraseMode);
    this.canvas.redraw();
  };

  onTouchStart(e) {
    e.preventDefault();
    this.paint = true;

    Array.from(e.changedTouches).map(
      (touch: any) => {
        let mouseX = touch.pageX - this.context.canvas.offsetLeft,
            mouseY = touch.pageY - this.context.canvas.offsetTop;

        this.canvas.addClick(mouseX, mouseY, false, this.eraseMode);
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

        this.canvas.addClick(mouseX, mouseY, true, this.eraseMode);
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

        this.canvas.addClick(mouseX, mouseY, true, this.eraseMode);
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
          imageURL => {
              this.canvasSection.nativeElement.style.backgroundImage = `url('${imageURL}')`;
          },
          error => this.errorMessage = <any>error
      );
  }

  onChangeColor(color) {
      this.currentColor = this.canvas.changeColor(color);
      this.colorButton.nativeElement.style.backgroundColor = this.currentColor;
  }

  private emitDrawing() {
    this.paint &&
      this.socket
        .emit('event',
        {
          type: 'canvas',
          points: JSON.stringify(Array.from(this.canvas.points.field))
//          points: [...thpoints: [...this.canvas.points.field]is.canvas.points.field]
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
