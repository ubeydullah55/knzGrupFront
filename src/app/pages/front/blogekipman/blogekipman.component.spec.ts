import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogekipmanComponent } from './blogekipman.component';

describe('BlogekipmanComponent', () => {
  let component: BlogekipmanComponent;
  let fixture: ComponentFixture<BlogekipmanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogekipmanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogekipmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
