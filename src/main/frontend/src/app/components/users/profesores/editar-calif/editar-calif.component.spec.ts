import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCalifComponent } from './editar-calif.component';

describe('EditarCalifComponent', () => {
  let component: EditarCalifComponent;
  let fixture: ComponentFixture<EditarCalifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarCalifComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarCalifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
