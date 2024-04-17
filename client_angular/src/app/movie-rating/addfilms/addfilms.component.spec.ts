import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfilmsComponent } from './addfilms.component';

describe('AddfilmsComponent', () => {
  let component: AddfilmsComponent;
  let fixture: ComponentFixture<AddfilmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddfilmsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddfilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
