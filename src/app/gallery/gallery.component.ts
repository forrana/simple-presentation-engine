import { Component, Input, Output, EventEmitter,  OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  @Input() photos: Array<any>;
  @Output() chosen: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  scaleImage($event){
      $event.currentTarget.classList.contains('scaled') ?
        $event.currentTarget.classList.remove('scaled'):
        $event.currentTarget.classList.add('scaled');
  }

  choseImage($event){
      this.photos = [];
      this.chosen.emit($event.currentTarget.src);
  }

}
