import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhitaboardComponent } from './whitaboard.component';

describe('WhitaboardComponent', () => {
  let component: WhitaboardComponent;
  let fixture: ComponentFixture<WhitaboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhitaboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhitaboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
