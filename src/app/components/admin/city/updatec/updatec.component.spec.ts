import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecComponent } from './updatec.component';

describe('UpdatecComponent', () => {
  let component: UpdatecComponent;
  let fixture: ComponentFixture<UpdatecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
