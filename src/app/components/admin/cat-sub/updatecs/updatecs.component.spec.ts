import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecsComponent } from './updatecs.component';

describe('UpdatecsComponent', () => {
  let component: UpdatecsComponent;
  let fixture: ComponentFixture<UpdatecsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatecsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatecsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
