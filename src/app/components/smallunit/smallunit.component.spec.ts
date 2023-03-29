import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallunitComponent } from './smallunit.component';

describe('SmallunitComponent', () => {
  let component: SmallunitComponent;
  let fixture: ComponentFixture<SmallunitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallunitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallunitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
