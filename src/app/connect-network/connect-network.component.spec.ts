import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectNetworkComponent } from './connect-network.component';

describe('ConnectNetworkComponent', () => {
  let component: ConnectNetworkComponent;
  let fixture: ComponentFixture<ConnectNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
