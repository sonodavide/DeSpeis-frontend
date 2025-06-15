import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAttoreComponent } from './admin-attore.component';

describe('AdminAttoreComponent', () => {
  let component: AdminAttoreComponent;
  let fixture: ComponentFixture<AdminAttoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminAttoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAttoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
