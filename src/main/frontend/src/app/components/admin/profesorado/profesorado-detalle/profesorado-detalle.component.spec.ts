import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesoradoDetalleComponent } from './profesorado-detalle.component';

describe('ProfesoradoDetalleComponent', () => {
  let component: ProfesoradoDetalleComponent;
  let fixture: ComponentFixture<ProfesoradoDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfesoradoDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfesoradoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
