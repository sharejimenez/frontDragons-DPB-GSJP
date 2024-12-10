import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragonsComponent } from './dragon.component';

describe('DragonComponent', () => {
  let component: DragonsComponent;
  let fixture: ComponentFixture<DragonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
