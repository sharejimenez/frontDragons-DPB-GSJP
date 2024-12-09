import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalagregaComponent } from './modalagrega.component';

describe('ModalagregaComponent', () => {
  let component: ModalagregaComponent;
  let fixture: ComponentFixture<ModalagregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalagregaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalagregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
