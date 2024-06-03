import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCalifComponent } from './ver-calif.component';

describe('VerCalifComponent', () => {
  let component: VerCalifComponent;
  let fixture: ComponentFixture<VerCalifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerCalifComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerCalifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
