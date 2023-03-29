import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigunitComponent } from './bigunit.component';

describe('BigunitComponent', () => {
  let component: BigunitComponent;
  let fixture: ComponentFixture<BigunitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BigunitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BigunitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
