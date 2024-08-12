import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferanslarComponent } from './referanslar.component';

describe('ReferanslarComponent', () => {
  let component: ReferanslarComponent;
  let fixture: ComponentFixture<ReferanslarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferanslarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReferanslarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
