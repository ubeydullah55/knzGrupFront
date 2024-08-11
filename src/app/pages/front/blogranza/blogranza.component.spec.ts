import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogranzaComponent } from './blogranza.component';

describe('BlogranzaComponent', () => {
  let component: BlogranzaComponent;
  let fixture: ComponentFixture<BlogranzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogranzaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogranzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
