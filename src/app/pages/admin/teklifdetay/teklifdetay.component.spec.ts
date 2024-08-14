import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeklifdetayComponent } from './teklifdetay.component';

describe('TeklifdetayComponent', () => {
  let component: TeklifdetayComponent;
  let fixture: ComponentFixture<TeklifdetayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeklifdetayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeklifdetayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
