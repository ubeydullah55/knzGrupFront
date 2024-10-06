import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminproducteditComponent } from './adminproductedit.component';

describe('AdminproducteditComponent', () => {
  let component: AdminproducteditComponent;
  let fixture: ComponentFixture<AdminproducteditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminproducteditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminproducteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
