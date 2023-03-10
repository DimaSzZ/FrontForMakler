import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletecsComponent } from './deletecs.component';

describe('DeletecsComponent', () => {
  let component: DeletecsComponent;
  let fixture: ComponentFixture<DeletecsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletecsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletecsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
