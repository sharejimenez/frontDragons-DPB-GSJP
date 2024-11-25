import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruenaComponent } from './pruena.component';

describe('PruenaComponent', () => {
  let component: PruenaComponent;
  let fixture: ComponentFixture<PruenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PruenaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PruenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
