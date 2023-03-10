import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecComponent } from './createc.component';

describe('CreatecComponent', () => {
  let component: CreatecComponent;
  let fixture: ComponentFixture<CreatecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
