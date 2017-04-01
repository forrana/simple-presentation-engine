import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToUseItComponent } from './how-to-use-it.component';

describe('HowToUseItComponent', () => {
  let component: HowToUseItComponent;
  let fixture: ComponentFixture<HowToUseItComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowToUseItComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowToUseItComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
