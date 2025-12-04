import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisenolistComponent } from './disenolist.component';

describe('DisenolistComponent', () => {
  let component: DisenolistComponent;
  let fixture: ComponentFixture<DisenolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisenolistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisenolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
