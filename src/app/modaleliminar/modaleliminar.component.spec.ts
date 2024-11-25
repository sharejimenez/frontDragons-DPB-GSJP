import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaleliminarComponent } from './modaleliminar.component';

describe('ModaleliminarComponent', () => {
  let component: ModaleliminarComponent;
  let fixture: ComponentFixture<ModaleliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModaleliminarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaleliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
