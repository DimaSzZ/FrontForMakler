import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletecComponent } from './deletec.component';

describe('DeletecComponent', () => {
  let component: DeletecComponent;
  let fixture: ComponentFixture<DeletecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
