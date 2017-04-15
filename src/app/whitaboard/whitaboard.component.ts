import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { SocketService } from '../services/socket.service';
import { CanvasService } from '../services/canvas.service';
import { FlickrService } from '../services/flickr.service';

@Component({
  selector: 'app-whitaboard',
  templateUrl: './whitaboard.component.html',
  styleUrls: ['./whitaboard.component.css'],
  providers: [FlickrService]
})
export class WhitaboardComponent implements OnInit {
  context: CanvasRenderingContext2D;
  paint: any;
  images: any[];
  errorMessage: any;
  image: any;
  eraseMode: boolean = false;
  currentColor: string;
  search = new FormControl();
  mode: string = 'Zoom';

  @ViewChild("canvasSection") canvasSection;
  @ViewChild("colorButton") colorButton;

  ngAfterViewInit() {
    this.resizeCanvas();
  }

  resizeCanvas() {
      let canvas = this.canvasSection.nativeElement,
          rect = canvas.getBoundingClientRect();

      canvas.width = rect.width;
      canvas.height = rect.height;
      this.context = canvas.getContext("2d");
      this.canvas.redraw();
  }

  onEraseAll() {
      this.canvas.eraseAll();
  }

  onToggleEraseMode() {
      this.eraseMode = !this.eraseMode;
  }

  onMouseDown(e) {
    if(!this.isPaintMode()) return;

    let mouseX = e.pageX - this.context.canvas.offsetLeft,
        mouseY = e.pageY - this.context.canvas.offsetTop;

    this.paint = true;
    this.canvas.addClick(mouseX, mouseY, false, this.eraseMode);
  };

  onTouchStart(e) {
    if(!this.isPaintMode()) return;

    e.preventDefault();
    this.paint = true;

    [...e.changedTouches].map(
      (touch: any) => {
        let mouseX = touch.pageX - this.context.canvas.offsetLeft,
            mouseY = touch.pageY - this.context.canvas.offsetTop;

        this.canvas.addClick(mouseX, mouseY, false, this.eraseMode);
      }
    )
  }

  onTouchMove(e) {
    if(!this.isPaintMode()) return;

    e.preventDefault();
    this.paint = true;

    [...e.changedTouches].map(
      (touch: any) => {
        let mouseX = touch.pageX - this.context.canvas.offsetLeft,
            mouseY = touch.pageY - this.context.canvas.offsetTop;

        this.canvas.addClick(mouseX, mouseY, true, this.eraseMode);
      }
    )
  }

  onTouchEnd(e) {
    if(!this.isPaintMode()) return;

    e.preventDefault();
    this.emitDrawing();
    this.paint = false;
  }

  onMouseMove(e) {
    if(!this.isPaintMode()) return;

    if (this.paint) {
    let mouseX = e.pageX - this.context.canvas.offsetLeft,
        mouseY = e.pageY - this.context.canvas.offsetTop;

        this.canvas.addClick(mouseX, mouseY, true, this.eraseMode);
    }
  }

  onMouseUp(e) {
    if(!this.isPaintMode()) return;

    this.emitDrawing();
    this.paint = false;
  }

  onMouseLeave(e) {
    if(!this.isPaintMode()) return;

    this.emitDrawing();
    this.paint = false;
  }

  private emitSearch(imageURL) {
      this.socket
        .emit('event',
        {
          type: 'image',
          imageURL
        });
  }

  private isPaintMode() {
      return this.mode === 'Paint' ? false : true;
  }

  onFindImageEvent(tags: string) {
    if(tags.includes('http')) {
        this.canvasSection.nativeElement.style.backgroundImage = `url('${tags}')`;
        this.emitSearch(`url('${tags}')`);
    } else {
        this.flickrService
          .getImagesByTags(tags)
          .subscribe(
              imageURL => {
                  this.emitSearch(`url('${imageURL}')`);
                  this.canvasSection.nativeElement.style.backgroundImage = `url('${imageURL}')`;
              },
              error => this.errorMessage = <any>error
          );
    }
  }

  onChangeColor(color) {
      this.currentColor = this.canvas.changeColor(color);
      this.colorButton._elementRef.nativeElement.style.backgroundColor = this.currentColor;
  }

  togglePaintMode() {
      this.mode = this.mode === 'Zoom' ? 'Paint' : 'Zoom';
  }

  private emitDrawing() {
    this.paint &&
      this.socket
        .emit('event',
        {
          type: 'canvas',
          points: [...this.canvas.points.field]
        });
  }

  constructor(
    private socket: SocketService,
    private canvas: CanvasService,
    private flickrService: FlickrService,
  ) {
      this.search.valueChanges
               .debounceTime(600)
               .distinctUntilChanged()
               .subscribe(
                   imageURL => {
                       this.onFindImageEvent(imageURL);
                   }
               );

     this.socket
        .addEvent(
            'image',
            (data) =>
                this.canvasSection.nativeElement.style.backgroundImage = data.imageURL
        );
  }

  ngOnInit() {

  }

}
