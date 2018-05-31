import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeedComponent } from './deed.component';

describe('DeedComponent', () => {
  let component: DeedComponent;
  let fixture: ComponentFixture<DeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
