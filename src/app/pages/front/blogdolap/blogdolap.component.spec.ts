import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogdolapComponent } from './blogdolap.component';

describe('BlogdolapComponent', () => {
  let component: BlogdolapComponent;
  let fixture: ComponentFixture<BlogdolapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogdolapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogdolapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
