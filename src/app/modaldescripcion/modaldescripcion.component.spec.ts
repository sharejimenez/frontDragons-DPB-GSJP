import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldescripcionComponent } from './modaldescripcion.component';

describe('ModaldescripcionComponent', () => {
  let component: ModaldescripcionComponent;
  let fixture: ComponentFixture<ModaldescripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModaldescripcionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaldescripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
