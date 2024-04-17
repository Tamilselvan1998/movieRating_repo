import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailablefilmsComponent } from './availablefilms.component';

describe('AvailablefilmsComponent', () => {
  let component: AvailablefilmsComponent;
  let fixture: ComponentFixture<AvailablefilmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailablefilmsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailablefilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
