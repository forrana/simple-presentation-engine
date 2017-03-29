import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportenceComponent } from './importence.component';

describe('ImportenceComponent', () => {
  let component: ImportenceComponent;
  let fixture: ComponentFixture<ImportenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
