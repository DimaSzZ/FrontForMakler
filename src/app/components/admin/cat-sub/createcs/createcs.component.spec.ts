import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecsComponent } from './createcs.component';

describe('CreatecsComponent', () => {
  let component: CreatecsComponent;
  let fixture: ComponentFixture<CreatecsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatecsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatecsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
